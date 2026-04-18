import { useRef, useEffect } from 'react';

const H = 300;
const FOV = 500;

const roadNodes = [
  { id: 'A', pos: [-200,  10, -10] as [number, number, number] },
  { id: 'B', pos: [ -90,  50,  60] as [number, number, number] },
  { id: 'C', pos: [   0,  85,  25] as [number, number, number] },
  { id: 'D', pos: [  90,  50, -35] as [number, number, number] },
  { id: 'E', pos: [ 200,  10,  10] as [number, number, number] },
];

const roadEdges = [
  { from: 'A', to: 'B' }, { from: 'B', to: 'C' },
  { from: 'C', to: 'D' }, { from: 'D', to: 'E' },
];

const gpsPoints = [
  { pos: [-195, 22,  -5] as [number, number, number], matched: true  },
  { pos: [-155, 65,  35] as [number, number, number], matched: false },
  { pos: [ -80, 58,  65] as [number, number, number], matched: true  },
  { pos: [ -45, 95,  20] as [number, number, number], matched: false },
  { pos: [   5, 90,  28] as [number, number, number], matched: true  },
  { pos: [  40, 68, -18] as [number, number, number], matched: false },
  { pos: [  95, 55, -32] as [number, number, number], matched: true  },
  { pos: [ 155, 22,  20] as [number, number, number], matched: false },
];

function project(x: number, y: number, z: number, rotX: number, rotY: number, cx: number, cy: number) {
  const x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
  const z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
  const y1 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
  const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
  const scale = FOV / (FOV + z2 + 200);
  return { sx: cx + x1 * scale, sy: cy + y1 * scale, scale, z: z2 };
}

export default function LiveTracking3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      const w = container.clientWidth || 800;
      canvas.width = w * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let rotX = 0.3, rotY = 0, animId: number, lastTime = performance.now(), time = 0;

    const draw = () => {
      const W = canvas.width / dpr;
      const cx = W / 2, cy = H / 2;

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now; rotY += dt * 0.35; time += dt;

      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#0f172a'); bg.addColorStop(1, '#1e293b');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

      type Elem = { z: number; draw: () => void };
      const elems: Elem[] = [];

      for (const e of roadEdges) {
        const nf = roadNodes.find(n => n.id === e.from)!;
        const nt = roadNodes.find(n => n.id === e.to)!;
        const p1 = project(...nf.pos, rotX, rotY, cx, cy);
        const p2 = project(...nt.pos, rotX, rotY, cx, cy);
        elems.push({
          z: (p1.z + p2.z) / 2,
          draw: () => {
            ctx.beginPath(); ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p2.sx, p2.sy);
            ctx.strokeStyle = 'rgba(59,130,246,0.15)'; ctx.lineWidth = 15 * p1.scale; ctx.stroke();
            ctx.beginPath(); ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p2.sx, p2.sy);
            ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 4 * p1.scale; ctx.stroke();
          }
        });
      }

      for (const n of roadNodes) {
        const p = project(...n.pos, rotX, rotY, cx, cy);
        elems.push({
          z: p.z,
          draw: () => {
            const r = 15 * p.scale;
            ctx.save(); ctx.shadowColor = '#3b82f6'; ctx.shadowBlur = 10 * p.scale;
            ctx.beginPath(); ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
            ctx.fillStyle = '#2563eb'; ctx.fill(); ctx.restore();
            ctx.strokeStyle = '#93c5fd'; ctx.lineWidth = 1.5; ctx.stroke();
            ctx.fillStyle = '#fff';
            ctx.font = `bold ${Math.round(10 * Math.max(p.scale, 0.6))}px sans-serif`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(n.id, p.sx, p.sy);
          }
        });
      }

      const matched = gpsPoints.filter(g => g.matched);
      if (matched.length > 1) {
        const pts = matched.map(g => project(...g.pos, rotX, rotY, cx, cy));
        elems.push({
          z: pts.reduce((s, p) => s + p.z, 0) / pts.length,
          draw: () => {
            ctx.beginPath(); ctx.moveTo(pts[0].sx, pts[0].sy);
            for (const p of pts) ctx.lineTo(p.sx, p.sy);
            ctx.strokeStyle = '#22c55e'; ctx.lineWidth = 2.5 * pts[0].scale; ctx.stroke();
          }
        });
      }

      for (const g of gpsPoints) {
        const p = project(...g.pos, rotX, rotY, cx, cy);
        const pulse = 0.7 + 0.3 * Math.sin(time * 4);
        elems.push({
          z: p.z,
          draw: () => {
            const r = 11 * p.scale;
            const color = g.matched ? '#22c55e' : '#f43f5e';
            if (g.matched) {
              ctx.save(); ctx.shadowColor = '#22c55e'; ctx.shadowBlur = 14 * p.scale * pulse;
              ctx.beginPath(); ctx.arc(p.sx, p.sy, r * 2.5 * pulse, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(34,197,94,0.18)'; ctx.fill(); ctx.restore();
            }
            ctx.beginPath(); ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
            ctx.fillStyle = color; ctx.fill();
            ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.stroke();
          }
        });
      }

      elems.sort((a, b) => b.z - a.z);
      elems.forEach(e => e.draw());

      ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      [['#3b82f6', 'Blue = Road network'], ['#22c55e', 'Green = Matched GPS ping'], ['#f43f5e', 'Red = Noisy / unmatched GPS']]
        .forEach(([color, label], i) => { ctx.fillStyle = color; ctx.font = '11px sans-serif'; ctx.fillText(label, 12, 12 + i * 16); });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <div ref={containerRef} className="w-full rounded-lg overflow-hidden bg-slate-900/50 border border-slate-700">
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: H }} />
    </div>
  );
}
