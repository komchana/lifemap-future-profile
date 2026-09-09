let radarSvg;
let appState = null;
let computeProfileFn = null;

const riasecKeys = ['R', 'I', 'A', 'S', 'E', 'C'];

export function initWheel(deps) {
  if (deps) {
    if (deps.state) appState = deps.state;
    if (deps.computeProfile) computeProfileFn = deps.computeProfile;
  }
  radarSvg = document.getElementById('riasec-radar-svg');
}

export function renderWheel(deps) {
  if (deps) {
    if (deps.state) appState = deps.state;
    if (deps.computeProfile) computeProfileFn = deps.computeProfile;
  }
  if (!radarSvg) {
    radarSvg = document.getElementById('riasec-radar-svg');
  }
  if (!radarSvg || !appState || !computeProfileFn) return;

  const profile = computeProfileFn(appState.answers);
  if (!profile) return;

  radarSvg.innerHTML = '';
  
  const cx = 200;
  const cy = 200;
  const rMax = 130;
  const angles = riasecKeys.map((_, i) => (i * Math.PI) / 3 - Math.PI / 2);

  // 1. Concentric hexagon grids (levels 4, 8, 12, 16, 20, 24)
  const levels = [4, 8, 12, 16, 20, 24];
  levels.forEach(l => {
    const radius = (l / 24) * rMax;
    const pts = angles.map(a => {
      const x = cx + radius * Math.cos(a);
      const y = cy + radius * Math.sin(a);
      return `${x},${y}`;
    }).join(' ');

    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poly.setAttribute('points', pts);
    poly.setAttribute('fill', 'none');
    poly.setAttribute('stroke', 'var(--border-color)');
    poly.setAttribute('stroke-width', '1');
    radarSvg.appendChild(poly);

    // Subtle level value labels
    if (l === 24) return; // skip outer ring label to avoid overlap
    const firstAngle = angles[0];
    const textY = cy + radius * Math.sin(firstAngle) + 4;
    
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', cx - 8);
    text.setAttribute('y', textY);
    text.setAttribute('fill', 'var(--text-muted)');
    text.setAttribute('font-size', '8px');
    text.setAttribute('font-family', 'var(--font-secondary)');
    text.setAttribute('text-anchor', 'end');
    text.textContent = l;
    radarSvg.appendChild(text);
  });

  // 2. Axis Lines & outer labels
  riasecKeys.forEach((key, i) => {
    const angle = angles[i];
    const outerX = cx + rMax * Math.cos(angle);
    const outerY = cy + rMax * Math.sin(angle);
    
    // Axis line
    const axis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    axis.setAttribute('x1', cx);
    axis.setAttribute('y1', cy);
    axis.setAttribute('x2', outerX);
    axis.setAttribute('y2', outerY);
    axis.setAttribute('stroke', 'var(--border-color)');
    axis.setAttribute('stroke-dasharray', '3 3');
    radarSvg.appendChild(axis);

    // Push label slightly outward
    const txtDist = rMax + 20;
    const tx = cx + txtDist * Math.cos(angle);
    const ty = cy + txtDist * Math.sin(angle) + 4;
    
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', tx);
    text.setAttribute('y', ty);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', 'var(--text-secondary)');
    text.setAttribute('font-size', '11px');
    text.setAttribute('font-family', 'var(--font-primary)');
    text.setAttribute('font-weight', '700');
    text.textContent = key;
    radarSvg.appendChild(text);
  });

  // 3. Score Polygon filled path
  const scoreMap = Object.fromEntries(profile.riasecScores.map(s => [s.id, s.score]));
  const scorePts = riasecKeys.map((key, i) => {
    const scoreVal = scoreMap[key] || 0;
    const radius = (scoreVal / 24) * rMax;
    const x = cx + radius * Math.cos(angles[i]);
    const y = cy + radius * Math.sin(angles[i]);
    return `${x},${y}`;
  }).join(' ');

  const fillArea = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  fillArea.setAttribute('points', scorePts);
  fillArea.setAttribute('fill', 'rgba(214, 255, 92, 0.14)');
  fillArea.setAttribute('stroke', 'var(--color-accent)');
  fillArea.setAttribute('stroke-width', '2.5');
  
  // Add glowing shadow filter
  fillArea.style.filter = "drop-shadow(0px 0px 4px rgba(214, 255, 92, 0.3))";
  radarSvg.appendChild(fillArea);

  // 4. Dot nodes at vertices
  riasecKeys.forEach((key, i) => {
    const scoreVal = scoreMap[key] || 0;
    const radius = (scoreVal / 24) * rMax;
    const x = cx + radius * Math.cos(angles[i]);
    const y = cy + radius * Math.sin(angles[i]);

    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', x);
    dot.setAttribute('cy', y);
    dot.setAttribute('r', '4');
    dot.setAttribute('fill', 'var(--bg-primary)');
    dot.setAttribute('stroke', 'var(--color-accent)');
    dot.setAttribute('stroke-width', '1.5');
    radarSvg.appendChild(dot);
  });
}
