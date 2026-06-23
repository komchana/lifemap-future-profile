import { state, getGrowthMissionStatus, switchView, isDayUnlocked } from './app.js';

let metroCanvas;
let ctx;
let overlay;

const categoryColors = {
  creator: "#8b5cf6",
  builder: "#10b981",
  analyst: "#f59e0b",
  helper: "#f43f5e",
  entrepreneur: "#06b6d4",
};

export function initCanvas() {
  metroCanvas = document.getElementById('metro-canvas');
  overlay = document.getElementById('metro-nodes-overlay');
  
  if (!metroCanvas) return;
  ctx = metroCanvas.getContext('2d');
  
  // Fit canvas width to parent container
  resizeCanvas();
  window.addEventListener('resize', () => {
    resizeCanvas();
    renderCanvas();
  });
}

function resizeCanvas() {
  const parent = metroCanvas.parentElement;
  if (!parent) return;
  
  let width = parent.getBoundingClientRect().width;
  if (width < 600) {
    width = 600; // Enforce minimum width of 600px for proper node spacing on mobile
  }
  metroCanvas.width = width;
  metroCanvas.style.width = `${width}px`;
  if (overlay) {
    overlay.style.width = `${width}px`;
  }
}

export function renderCanvas() {
  if (!metroCanvas || !ctx) return;
  
  // Clear overlay and canvas
  overlay.innerHTML = '';
  ctx.clearRect(0, 0, metroCanvas.width, metroCanvas.height);

  const mStatus = getGrowthMissionStatus();
  const currentMissions = mStatus.missions;
  if (!currentMissions || currentMissions.length === 0) return;

  const totalDays = 7;
  const padding = 50;
  const cy = metroCanvas.height / 2;
  const width = metroCanvas.width;
  const xSpacing = (width - padding * 2) / (totalDays - 1);

  // Get current active cluster color
  const currentCluster = currentMissions[0]?.cluster || "creator";
  const lineColor = categoryColors[currentCluster] || categoryColors.creator;

  // 1. Draw Background Dashed Track Line
  ctx.beginPath();
  ctx.moveTo(padding, cy);
  ctx.lineTo(width - padding, cy);
  ctx.strokeStyle = "var(--border-color)";
  ctx.lineWidth = 4;
  ctx.setLineDash([5, 8]);
  ctx.stroke();

  // 2. Draw Active/Completed Solid Line Portion
  const completedCount = mStatus.completedCount;
  if (completedCount > 0) {
    const endIdx = Math.min(totalDays - 1, completedCount - 1);
    const endX = padding + endIdx * xSpacing;
    
    ctx.beginPath();
    ctx.moveTo(padding, cy);
    ctx.lineTo(endX, cy);
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 5;
    ctx.setLineDash([]);
    ctx.stroke();
    
    // Draw glowing neon highlight border under it
    ctx.shadowBlur = 12;
    ctx.shadowColor = lineColor;
    ctx.stroke();
    ctx.shadowBlur = 0; // reset
  }

  // 3. Draw Nodes and Populate overlay divs
  for (let i = 0; i < totalDays; i++) {
    const dayNum = i + 1;
    const mission = currentMissions[i];
    const x = padding + i * xSpacing;
    const y = cy;
    
    const isCompleted = state.checkIns.some(c => c.missionId === mission.id);
    const isActive = mStatus.currentMission && mStatus.currentMission.id === mission.id;
    const unlocked = isDayUnlocked(dayNum);
    
    // Draw canvas nodes
    ctx.beginPath();
    ctx.arc(x, y, isActive ? 10 : 8, 0, Math.PI * 2);
    
    if (isCompleted) {
      ctx.fillStyle = lineColor;
      ctx.strokeStyle = "var(--text-primary)";
      ctx.lineWidth = 2;
    } else if (isActive) {
      ctx.fillStyle = "var(--bg-primary)";
      ctx.strokeStyle = "var(--color-accent)";
      ctx.lineWidth = 3;
    } else if (unlocked) {
      ctx.fillStyle = "var(--bg-secondary)";
      ctx.strokeStyle = "var(--border-color)";
      ctx.lineWidth = 2;
    } else {
      // Locked Day
      ctx.fillStyle = "rgba(30, 43, 20, 0.4)";
      ctx.strokeStyle = "rgba(247, 250, 239, 0.15)";
      ctx.lineWidth = 1.5;
    }
    
    ctx.fill();
    ctx.stroke();

    // Node Day text label
    ctx.font = "bold 9px 'Plus Jakarta Sans'";
    ctx.fillStyle = isActive ? "var(--color-accent)" : isCompleted ? lineColor : "var(--text-muted)";
    ctx.textAlign = "center";
    ctx.fillText(`D${dayNum}`, x, y - 18);

    // Create interactive Overlay element
    const clickNode = document.createElement('div');
    clickNode.className = 'metro-click-node';
    clickNode.style.left = `${(x / width) * 100}%`;
    clickNode.style.top = `${(y / metroCanvas.height) * 100}%`;
    clickNode.setAttribute('title', unlocked ? `ดูภารกิจ Day ${dayNum}` : `Day ${dayNum} (ยังไม่เปิดล็อก)`);
    
    // Day button selection trigger
    clickNode.addEventListener('click', () => {
      // Find the day selection button and trigger click
      const dayBtns = document.querySelectorAll('.day-btn');
      if (dayBtns[i]) {
        dayBtns[i].click();
      }
    });
    
    overlay.appendChild(clickNode);
  }
}
