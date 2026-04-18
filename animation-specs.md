
**Prompt:**

Convert the following 3D visualization code to use the HTML5 Canvas 2D API with custom 3D projection, following this pattern:

**Requirements:**
1. Use `useRef<HTMLCanvasElement>` and `canvas.getContext('2d')` instead of any 3D library
2. Implement a [project(x, y, z, rotX, rotY, cx, cy, fov)](cci:1://file:///c:/Users/abhir/Desktop/abhiraj/Abhiraj%20Web/Presentations/AI-SEMINAR/ml-paradigms-seminar/client/src/components/ML3DVisualizations.tsx:4:0-28:1) function that:
   - Rotates points around Y-axis using: `x1 = x*cosY - z*sinY`, `z1 = x*sinY + z*cosY`
   - Rotates points around X-axis using: `y1 = y*cosX - z1*sinX`, `z2 = y*sinX + z1*cosX`
   - Projects to 2D using perspective: `scale = fov / (fov + z2 + 200)`
   - Returns: `{ sx: cx + x1*scale, sy: cy + y1*scale, scale, z: z2 }`
3. Sort all elements by depth (z value) before rendering for proper occlusion
4. Use `requestAnimationFrame` for smooth animation loop with time-based rotation
5. Draw all elements using Canvas 2D methods (arc, moveTo, lineTo, fill, stroke)
6. Add visual polish: gradients for glow effects, semi-transparent fills, proper colors
7. Include a legend and labels using ctx.fillText
8. Set canvas width/height explicitly and use a gradient background

**Key patterns to follow:**
- Generate random points with a seeded RNG function
- Use rotation variables (rotX, rotY) that increment each frame
- Clear canvas with ctx.clearRect at start of each frame
- Project 3D coordinates to 2D before drawing
- Handle depth sorting with `projected.sort((a, b) => b.z - a.z)`

**Original code to convert:**
[Paste your existing 3D visualization code here - e.g., Three.js, Plotly, matplotlib, etc.]

---

## **Common Values (All Visualizations)**
- **Canvas width**: 560
- **Canvas height**: 240
- **Center X (cx)**: W / 2 = 280
- **Center Y (cy)**: H / 2 = 120
- **Field of view (fov)**: 400
- **Projection offset**: 200 (in scale formula: `fov / (fov + z2 + 200)`)

---

## **SupervisedViz**
- **Point count**: 40 (20 per class)
- **Point scatter range**: 120 (per axis)
- **Class offset**: ±40 (from center)
- **Point radius (r)**: 5 * scale
- **Point glow radius**: r * 3 = 15 * scale
- **Axis length**: 110
- **Axis line width**: 1
- **Decision plane size**: 130 (half-extent from center, total 260)
- **Plane grid steps**: 6 (7×7 grid)
- **Plane fill opacity**: 0.06
- **Plane stroke opacity**: 0.2
- **Plane line width**: 0.5
- **Point stroke width**: 0.8
- **Label font**: 7-9px monospace (scales with depth)
- **Legend box size**: 10×10
- **Legend font**: 11px sans-serif
- **Legend positions**: x=12, y=H-44 (first), y=H-28 (second)
- **Label text offset**: r + 2 pixels above point
- **Bottom-right label font**: 10px sans-serif

---

## **UnsupervisedViz**
- **Cluster count**: 3
- **Points per cluster**: 18 (total 54)
- **Point scatter range**: 80 (per axis)
- **Cluster centers**:
  - Cluster 1: x=-70, y=-50, z=-40
  - Cluster 2: x=60, y=40, z=-60
  - Cluster 3: x=0, y=-60, z=80
- **Point radius (r)**: 4.5 * scale
- **Point glow radius**: r * 3 = 13.5 * scale
- **Center marker radius (r)**: 9 * scale
- **Center ring radius**: r * (2 + 0.5 * sin(...)) = 18 * scale to 22.5 * scale
- **Center ring line width**: 2
- **Center cross line width**: 2
- **Connection line width**: 0.8
- **Point stroke width**: 0.7
- **Legend box size**: 10×10
- **Legend font**: 11px sans-serif
- **Legend vertical spacing**: 16px
- **Legend positions**: x=12, y=H-44 + i*16

---

## **DiscoveryViz**
- **Node count**: 22
- **Node radius (r)**: 5 * scale
- **Node glow radius**: r * 2.5 = 12.5 * scale
- **Undiscovered node radius**: r * 0.7 = 3.5 * scale
- **Node sphere radius range**: 60-120 (60 + rand() * 60)
- **Edge connection threshold**: 90 (distance)
- **Edge line width (both discovered)**: 1
- **Edge line width (partial)**: 0.5
- **Discovery burst max radius**: r * (1 + (0.5 - age) * 8) = up to 5 * scale
- **Node stroke width**: 0.8
- **Discovery interval**: 0.6 seconds
- **Discovery interval variance**: 0.5-0.9x (0.5 + rand() * 0.8)
- **Stats font**: 11px sans-serif
- **Stats position**: x=12, y=H-14
- **Bottom-right label font**: 10px sans-serif

---

## **Animation Speeds**
- **SupervisedViz rotation**: dt * 0.4 (Y-axis)
- **UnsupervisedViz rotation**: dt * 0.35 (Y-axis)
- **DiscoveryViz rotation**: dt * 0.3 (Y-axis)
- **Pulse frequency**: time / 1000
- **Max delta time**: 0.05 (for DiscoveryViz)