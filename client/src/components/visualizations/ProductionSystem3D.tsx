import { useRef, useEffect } from 'react';

const H = 300;
const FOV = 500;

interface Component { id: string; pos: [number, number, number]; type: 'store' | 'rider' | 'backend' | 'db' | 'traffic'; }
interface Flow { from: string; to: string; label: string; color: string; }

const components: Component[] = [
  { id: 'store',   pos: [-200,  0,  0], type: 'store'   },
  { id: 'rider',   pos: [   0, 95,  0], type: 'rider'   },
  { id: 'backend', pos: [   0,  0,  0], type: 'backend' },
  { id: 'db',      pos: [ 100,-50,  0], type: 'db'      },
  { id: 'traffic', pos: [ 100, 85,-45], type: 'traffic' },
];

const flows: Flow[] = [
  { from: 'rider',   to: 'backend', label: 'GPS ping',  color: '#f43f5e' },
  { from: 'backend', to: 'store',   label: 'Dijkstra',  color: '#14b8a6' },
  { from: 'backend', to: 'db',      label: 'Path cache', color: '#8b5cf6' },
  { from: 'traffic', to: 'backend', label: 'Edge wts',  color: '#f59e0b' },
];

const compColors: Record<string, string> = { store: '#3b82f6', rider: '#f43f5e', backend: '#14b8a6', db: '#8b5cf6', traffic: '#f59e0b' };
const compLabels: Record<string, string> = { store: 'Dark Store', rider: 'Rider App', backend: 'Backend', db: 'Database', traffic: 'Traffic API' };

function project(x: number, y: number, z: number, rotX: number, rotY: number, cx: number, cy: number) {
  const x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
  const z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
  const y1 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
  const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
  const scale = FOV / (FOV + z2 + 200);
  return { sx: cx + x1 * scale, sy: cy + y1 * scale, scale, z: z2 };
}

interface Packet { flow: number; t: number; speed: number; }

export default function ProductionSystem3D() {
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

    const packets: Packet[] = flows.map((_, i) => ({ flow: i, t: i * 0.25, speed: 0.35 + i * 0.07 }));
    let rotX = 0.25, rotY = 0, animId: number, lastTime = performance.now(), time = 0;

    const draw = () => {
      const W = canvas.width / dpr;
      const cx = W / 2, cy = H / 2;

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now; rotY += dt * 0.35; time += dt;
      for (const pk of packets) pk.t = (pk.t + dt * pk.speed) % 1;

      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#0f172a'); bg.addColorStop(1, '#1e293b');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

      type Elem = { z: number; draw: () => void };
      const elems: Elem[] = [];

      for (let fi = 0; fi < flows.length; fi++) {
        const f = flows[fi];
        const cf = components.find(c => c.id === f.from)!;
        const ct = components.find(c => c.id === f.to)!;
        const p1 = project(...cf.pos, rotX, rotY, cx, cy);
        const p2 = project(...ct.pos, rotX, rotY, cx, cy);
        const pk = packets[fi];
        elems.push({
          z: (p1.z + p2.z) / 2 - 2,
          draw: () => {
            // Edge glow + line
            ctx.beginPath(); ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p2.sx, p2.sy);
            ctx.strokeStyle = f.color + '28'; ctx.lineWidth = 9 * p1.scale; ctx.stroke();
            ctx.beginPath(); ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p2.sx, p2.sy);
            ctx.strokeStyle = f.color; ctx.lineWidth = 2 * p1.scale; ctx.globalAlpha = 0.7; ctx.stroke();
            ctx.globalAlpha = 1;
            // Moving packet
            const px = p1.sx + (p2.sx - p1.sx) * pk.t;
            const py = p1.sy + (p2.sy - p1.sy) * pk.t;
            const ps = p1.scale + (p2.scale - p1.scale) * pk.t;
            ctx.save(); ctx.shadowColor = f.color; ctx.shadowBlur = 12 * ps;
            ctx.beginPath(); ctx.arc(px, py, 7 * ps, 0, Math.PI * 2);
            ctx.fillStyle = '#fff'; ctx.fill(); ctx.restore();
            // Edge label
            const mx = (p1.sx + p2.sx) / 2, my = (p1.sy + p2.sy) / 2 - 14 * p1.scale;
            ctx.fillStyle = f.color;
            ctx.font = `${Math.round(10 * Math.max(p1.scale, 0.6))}px sans-serif`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(f.label, mx, my);
          }
        });
      }

      for (const c of components) {
        const p = project(...c.pos, rotX, rotY, cx, cy);
        const color = compColors[c.type];
        const label = compLabels[c.type];
        const isBox = c.type === 'store' || c.type === 'db';
        const pulse = 1 + 0.06 * Math.sin(time * 1.8 + c.pos[0] * 0.015);
        elems.push({
          z: p.z,
          draw: () => {
            const sz = (isBox ? 30 : 24) * p.scale * pulse;
            ctx.save(); ctx.shadowColor = color; ctx.shadowBlur = 15 * p.scale;
            if (isBox) { ctx.fillStyle = color; ctx.fillRect(p.sx - sz, p.sy - sz, sz * 2, sz * 2); }
            else { ctx.beginPath(); ctx.arc(p.sx, p.sy, sz, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill(); }
            ctx.restore();
            ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5;
            if (isBox) ctx.strokeRect(p.sx - sz, p.sy - sz, sz * 2, sz * 2);
            else { ctx.beginPath(); ctx.arc(p.sx, p.sy, sz, 0, Math.PI * 2); ctx.stroke(); }
            ctx.fillStyle = '#fff';
            ctx.font = `bold ${Math.round(11 * Math.max(p.scale, 0.6))}px sans-serif`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
            ctx.fillText(label, p.sx, p.sy - sz - 6 * p.scale);
          }
        });
      }

      elems.sort((a, b) => b.z - a.z);
      elems.forEach(e => e.draw());

      ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      [['#3b82f6','Blue = Dark Store'],['#f43f5e','Red = Rider App'],['#14b8a6','Teal = Backend (Dijkstra engine)'],['#8b5cf6','Purple = Database / Cache']]
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
