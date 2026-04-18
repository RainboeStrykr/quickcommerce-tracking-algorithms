import { useRef, useEffect } from 'react';

const H = 300;
const FOV = 500;

interface Node { id: string; pos: [number, number, number]; }
interface Edge { from: string; to: string; weight: number; }

const nodes: Node[] = [
  { id: 'A', pos: [-200,  30, -40] },
  { id: 'B', pos: [ -90,  80,  80] },
  { id: 'C', pos: [   0,   0,   0] },
  { id: 'D', pos: [ 100, -55,  70] },
  { id: 'E', pos: [ 200,  30, -30] },
  { id: 'F', pos: [  40, 110, -80] },
];

const edges: Edge[] = [
  { from: 'A', to: 'B', weight: 5 },
  { from: 'A', to: 'C', weight: 8 },
  { from: 'B', to: 'C', weight: 3 },
  { from: 'B', to: 'D', weight: 6 },
  { from: 'C', to: 'D', weight: 4 },
  { from: 'C', to: 'F', weight: 7 },
  { from: 'D', to: 'E', weight: 3 },
  { from: 'F', to: 'E', weight: 5 },
];

function project(x: number, y: number, z: number, rotX: number, rotY: number, cx: number, cy: number) {
  const x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
  const z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
  const y1 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
  const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
  const scale = FOV / (FOV + z2 + 200);
  return { sx: cx + x1 * scale, sy: cy + y1 * scale, scale, z: z2 };
}

export default function Graph3D() {
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

    let rotX = 0.25, rotY = 0, animId: number, lastTime = performance.now();

    const draw = () => {
      const W = canvas.width / dpr;
      const cx = W / 2, cy = H / 2;

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      rotY += dt * 0.4;

      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#0f172a');
      bg.addColorStop(1, '#1e293b');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      type Elem = { z: number; draw: () => void };
      const elems: Elem[] = [];

      for (const e of edges) {
        const nf = nodes.find(n => n.id === e.from)!;
        const nt = nodes.find(n => n.id === e.to)!;
        const p1 = project(...nf.pos, rotX, rotY, cx, cy);
        const p2 = project(...nt.pos, rotX, rotY, cx, cy);
        elems.push({
          z: (p1.z + p2.z) / 2,
          draw: () => {
            ctx.beginPath(); ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p2.sx, p2.sy);
            ctx.strokeStyle = 'rgba(16,185,129,0.2)'; ctx.lineWidth = 11 * p1.scale; ctx.stroke();
            ctx.beginPath(); ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p2.sx, p2.sy);
            ctx.strokeStyle = '#10b981'; ctx.lineWidth = 2.5 * p1.scale; ctx.stroke();
            const mx = (p1.sx + p2.sx) / 2, my = (p1.sy + p2.sy) / 2 - 11 * p1.scale;
            ctx.fillStyle = 'rgba(255,255,255,0.75)';
            ctx.font = `${Math.round(10 * Math.max(p1.scale, 0.6))}px monospace`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(e.weight.toString(), mx, my);
          }
        });
      }

      for (const n of nodes) {
        const p = project(...n.pos, rotX, rotY, cx, cy);
        elems.push({
          z: p.z,
          draw: () => {
            const r = 20 * p.scale;
            ctx.save();
            ctx.shadowColor = '#22c55e'; ctx.shadowBlur = 14 * p.scale;
            ctx.beginPath(); ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
            ctx.fillStyle = '#22c55e'; ctx.fill();
            ctx.restore();
            ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 1.5; ctx.stroke();
            ctx.fillStyle = '#fff';
            ctx.font = `bold ${Math.round(13 * Math.max(p.scale, 0.6))}px sans-serif`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(n.id, p.sx, p.sy);
          }
        });
      }

      elems.sort((a, b) => b.z - a.z);
      elems.forEach(e => e.draw());

      ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      [['#22c55e', 'Green = Intersections (V)'], ['#10b981', 'Lines = Roads (E)'], ['rgba(255,255,255,0.6)', 'Numbers = Traffic Weights (W)']]
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
