import { useRef, useEffect } from 'react';

const H = 300;
const FOV = 500;

interface TNode { id: string; pos: [number, number, number]; type: 'hub' | 'ch' | 'time' | 'batch'; level: number; }
interface TEdge { from: string; to: string; type: 'hierarchy' | 'skip' | 'temporal' | 'batch'; }

const tnodes: TNode[] = [
  { id: 'H1',    pos: [-160,  85, -50], type: 'hub',   level: 3 },
  { id: 'H2',    pos: [ 160,  85,  50], type: 'hub',   level: 3 },
  { id: 'CH1',   pos: [ -85,  10,  35], type: 'ch',    level: 2 },
  { id: 'CH2',   pos: [   0,   0,   0], type: 'ch',    level: 1 },
  { id: 'CH3',   pos: [  85, -10, -35], type: 'ch',    level: 2 },
  { id: 'TIME',  pos: [ -60, -70,  35], type: 'time',  level: 2 },
  { id: 'BATCH', pos: [  70,  70,  55], type: 'batch', level: 2 },
];

const tedges: TEdge[] = [
  { from: 'H1',    to: 'CH1',   type: 'hierarchy' },
  { from: 'H1',    to: 'CH2',   type: 'hierarchy' },
  { from: 'CH1',   to: 'CH2',   type: 'skip'      },
  { from: 'CH2',   to: 'CH3',   type: 'skip'      },
  { from: 'CH3',   to: 'H2',    type: 'hierarchy' },
  { from: 'H2',    to: 'CH2',   type: 'hierarchy' },
  { from: 'TIME',  to: 'CH2',   type: 'temporal'  },
  { from: 'BATCH', to: 'CH2',   type: 'batch'      },
];

const edgeColors: Record<string, string> = { hierarchy: '#3b82f6', skip: '#06b6d4', temporal: '#f59e0b', batch: '#8b5cf6' };
const nodeColors: Record<string, string> = { hub: '#3b82f6', ch: '#06b6d4', time: '#f59e0b', batch: '#8b5cf6' };

function project(x: number, y: number, z: number, rotX: number, rotY: number, cx: number, cy: number) {
  const x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
  const z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
  const y1 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
  const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
  const scale = FOV / (FOV + z2 + 200);
  return { sx: cx + x1 * scale, sy: cy + y1 * scale, scale, z: z2 };
}

export default function AdvancedTech3D() {
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

    let rotX = 0.25, rotY = 0, animId: number, lastTime = performance.now(), time = 0;

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

      for (const e of tedges) {
        const nf = tnodes.find(n => n.id === e.from)!;
        const nt = tnodes.find(n => n.id === e.to)!;
        const p1 = project(...nf.pos, rotX, rotY, cx, cy);
        const p2 = project(...nt.pos, rotX, rotY, cx, cy);
        const color = edgeColors[e.type];
        elems.push({
          z: (p1.z + p2.z) / 2,
          draw: () => {
            ctx.save();
            if (e.type === 'skip') ctx.setLineDash([7, 5]);
            ctx.beginPath(); ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p2.sx, p2.sy);
            ctx.strokeStyle = color;
            ctx.lineWidth = (e.type === 'hierarchy' ? 3 : 1.5) * p1.scale;
            ctx.globalAlpha = 0.85; ctx.stroke();
            ctx.restore();
          }
        });
      }

      for (const n of tnodes) {
        const p = project(...n.pos, rotX, rotY, cx, cy);
        const color = nodeColors[n.type];
        const label = n.type === 'time' ? 'Time' : n.type === 'batch' ? 'Batch' : n.id;
        const pulse = n.type === 'hub' ? 1 + 0.08 * Math.sin(time * 2 + n.pos[0] * 0.01) : 1;
        elems.push({
          z: p.z,
          draw: () => {
            const r = (16 + n.level * 6) * p.scale * pulse;
            ctx.save(); ctx.shadowColor = color; ctx.shadowBlur = 14 * p.scale;
            ctx.beginPath(); ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
            ctx.fillStyle = color; ctx.fill(); ctx.restore();
            ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
            ctx.fillStyle = '#fff';
            ctx.font = `bold ${Math.round(11 * Math.max(p.scale, 0.6))}px sans-serif`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(label, p.sx, p.sy);
          }
        });
      }

      elems.sort((a, b) => b.z - a.z);
      elems.forEach(e => e.draw());

      ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      [['#3b82f6','Blue = Hub hierarchy edges'],['#06b6d4','Cyan dashed = CH skip connections'],['#f59e0b','Orange = Time-dependent weights'],['#8b5cf6','Purple = Batch processing']]
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
