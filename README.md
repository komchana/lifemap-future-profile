# LifeMap v2

An interactive, visually stunning single-page web application designed to help users map their life journey, set milestones, track goals, and visualize their life balance. Built with high-end dark-mode-first glassmorphism styling, custom HSL gradients for different life tracks, and interactive SVG/Canvas-based node connections.

## Core Features

1. **Interactive Roadmap (Map View)**:
   - A scrollable, zoomable (via scrollwheel or controls), and pannable (via drag) SVG/DOM canvas.
   - Node elements representing life milestones. Drag milestones around the grid to arrange them.
   - Double-click on the canvas background to create a new milestone at that exact coordinate!
   - Automatic Bezier S-curve connectors linking dependent milestones. Completed dependencies glow in the color of their respective category.

2. **Chronological Timeline (Timeline View)**:
   - Alternating, beautiful list layout of milestones ordered by date.
   - Details description, tags, priority badges, and personal reflection journals.

3. **Kanban Progress Board (Board View)**:
   - Drag milestones between status columns ("Planned", "In Progress", "Achieved") to update their status.
   - Column milestone counts auto-calculate in real time.

4. **Wheel of Life Assessment (Wheel View)**:
   - Standard 8-dimension coaching radar chart (Career, Learning, Physical Health, Mental Health, Finance, Family, Social, Personal Growth).
   - Fully interactive: drag the control handles on the SVG chart itself to change scores, or use the range sliders!
   - Dynamic reflection and life balance analysis reports generated instantly based on score variance.

5. **Theme Switching**:
   - Seamless toggling between **Space Dark Mode** (default) and **Glass Light Mode**.

6. **Local Backup & Restoration**:
   - Automated LocalStorage auto-saving.
   - Export your entire lifemap configuration to a portable JSON backup file.
   - Import JSON back to restore all milestones and scores.

## How to Run Locally

Since the app uses modern ES6 modules, it needs to be served via a local web server (to avoid CORS block on module scripts).

1. Open your terminal and navigate to this folder:
   ```bash
   cd "/Users/nui/.gemini/antigravity/scratch/lifemap"
   ```
2. Start a simple static web server:
   - Using Python:
     ```bash
     python3 -m http.server 8088
     ```
   - Or using Node.js:
     ```bash
     npx serve -l 8088
     ```
3. Open your web browser and go to [http://localhost:8088](http://localhost:8088).
