import { useRef, useEffect } from 'react';

const H = 300;
const FOV = 500;

interface DNode { id: string; pos: [number, number, number]; dist: number; visited: boolean; isSource: boolean; }
interface DEdge { from: string; to: string; weight: number; inPath: boolean; }

const dnodes: DNode[] = [
  { id: 'S', pos: [-200,   0, -20], dist: 0, visited: true,  isSource: true  },
  { id: 'A', pos: [ -80,  90,  60], dist: 5, visited: true,  isSource: false },
  { id: 'B', pos: [  10, -25,   0], dist: 3, visited: true,  isSource: false },
  { id: 'C', pos: [ 110,  75,  50], dist: 7, visited: false, isSource: false },
  { id: 'D', pos: [ 200, -15, -30], dist: 6, visited: false, isSource: false },
];

const dedges: DEdge[] = [
  { from: 'S', to: 'A', weight: 5, inPath: true  },
  { from: 'S', to: 'B', weight: 3, inPath: true  },
  { from: 'A', to: 'C', weight: 2, inPath: false },
  { from: 'B', to: 'C', weight: 4, inPath: false },
  { from: 'S', to: 'D', weight: 6, inPath: false },
  { from: 'B', to: 'D', weight: 3, inPath: true  },
];

function project(x: number, y: number, z: number, rotX: number, rotY: number, cx: number, cy: number) {
  const x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
  const z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
  const y1 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
  const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
  const scale = FOV / (FOV + z2 + 200);
  return { sx: cx + x1 * scale, sy: cy + y1 * scale, scale, z: z2 };
}

export default function Dijkstra3D() {
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
      rotY += dt * 0.35;

      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#0f172a'); bg.addColorStop(1, '#1e293b');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

      type Elem = { z: number; draw: () => void };
      const elems: Elem[] = [];

      for (const e of dedges) {
        const nf = dnodes.find(n => n.id === e.from)!;
        const nt = dnodes.find(n => n.id === e.to)!;
        const p1 = project(...nf.pos, rotX, rotY, cx, cy);
        const p2 = project(...nt.pos, rotX, rotY, cx, cy);
        elems.push({
          z: (p1.z + p2.z) / 2,
          draw: () => {
            if (e.inPath) {
              ctx.beginPath(); ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p2.sx, p2.sy);
              ctx.strokeStyle = 'rgba(168,85,247,0.22)'; ctx.lineWidth = 13 * p1.scale; ctx.stroke();
            }
            ctx.beginPath(); ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p2.sx, p2.sy);
            ctx.strokeStyle = e.inPath ? '#a855f7' : '#4b5563';
            ctx.lineWidth = e.inPath ? 3.5 * p1.scale : 1.5 * p1.scale; ctx.stroke();
            const mx = (p1.sx + p2.sx) / 2, my = (p1.sy + p2.sy) / 2 - 12 * p1.scale;
            ctx.fillStyle = 'rgba(255,255,255,0.75)';
            ctx.font = `${Math.round(10 * Math.max(p1.scale, 0.6))}px monospace`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(e.weight.toString(), mx, my);
          }
        });
      }

      for (const n of dnodes) {
        const p = project(...n.pos, rotX, rotY, cx, cy);
        const color = n.isSource ? '#c026d3' : n.visited ? '#a855f7' : '#6b7280';
        elems.push({
          z: p.z,
          draw: () => {
            const r = 24 * p.scale;
            ctx.save();
            ctx.shadowColor = color; ctx.shadowBlur = 14 * p.scale;
            ctx.beginPath(); ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
            ctx.fillStyle = color; ctx.fill();
            ctx.restore();
            ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
            ctx.fillStyle = '#fff';
            ctx.font = `bold ${Math.round(13 * Math.max(p.scale, 0.6))}px sans-serif`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(n.id, p.sx, p.sy);
            ctx.fillStyle = 'rgba(255,255,255,0.85)';
            ctx.font = `${Math.round(10 * Math.max(p.scale, 0.6))}px monospace`;
            ctx.fillText(`d=${n.dist}`, p.sx, p.sy + r + 10 * p.scale);
          }
        });
      }

      elems.sort((a, b) => b.z - a.z);
      elems.forEach(e => e.draw());

      ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      [['#c026d3', 'Source node'], ['#a855f7', 'Visited / Shortest path'], ['#6b7280', 'Unvisited node'], ['rgba(255,255,255,0.6)', 'd= distance from source']]
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
