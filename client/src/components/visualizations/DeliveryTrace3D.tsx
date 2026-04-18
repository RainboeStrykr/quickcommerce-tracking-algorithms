import { useRef, useEffect } from 'react';

const H = 300;
const FOV = 500;

interface Step { id: string; pos: [number, number, number]; type: 'store' | 'rider' | 'customer'; label: string; step: number; }

const steps: Step[] = [
  { id: 'store',    pos: [-200,   0,  0], type: 'store',    label: 'Dark Store', step: 1 },
  { id: 'pickup',   pos: [ -80,  60, 45], type: 'rider',    label: 'Pickup',     step: 2 },
  { id: 'traffic',  pos: [  10,  35, 10], type: 'rider',    label: 'Traffic!',   step: 3 },
  { id: 'reroute',  pos: [  90, -25,-35], type: 'rider',    label: 'Re-route',   step: 4 },
  { id: 'customer', pos: [ 200,   0,  0], type: 'customer', label: 'Customer',   step: 5 },
];

const mainPath: [number, number, number][] = [[-200,0,0],[-80,60,45],[10,35,10],[90,-25,-35],[200,0,0]];
const altPath:  [number, number, number][] = [[10,35,10],[110,70,35],[200,0,0]];

function project(x: number, y: number, z: number, rotX: number, rotY: number, cx: number, cy: number) {
  const x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
  const z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
  const y1 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
  const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
  const scale = FOV / (FOV + z2 + 200);
  return { sx: cx + x1 * scale, sy: cy + y1 * scale, scale, z: z2 };
}

export default function DeliveryTrace3D() {
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

      // Main path
      const mp = mainPath.map(p => project(...p, rotX, rotY, cx, cy));
      elems.push({
        z: mp.reduce((s, p) => s + p.z, 0) / mp.length - 5,
        draw: () => {
          ctx.beginPath(); ctx.moveTo(mp[0].sx, mp[0].sy);
          for (const p of mp) ctx.lineTo(p.sx, p.sy);
          ctx.strokeStyle = 'rgba(59,130,246,0.2)'; ctx.lineWidth = 9 * mp[0].scale; ctx.stroke();
          ctx.beginPath(); ctx.moveTo(mp[0].sx, mp[0].sy);
          for (const p of mp) ctx.lineTo(p.sx, p.sy);
          ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 2.5 * mp[0].scale; ctx.stroke();
        }
      });

      // Alt path (dashed)
      const ap = altPath.map(p => project(...p, rotX, rotY, cx, cy));
      elems.push({
        z: ap.reduce((s, p) => s + p.z, 0) / ap.length,
        draw: () => {
          ctx.save(); ctx.setLineDash([7, 5]);
          ctx.beginPath(); ctx.moveTo(ap[0].sx, ap[0].sy);
          for (const p of ap) ctx.lineTo(p.sx, p.sy);
          ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2.5 * ap[0].scale; ctx.stroke();
          ctx.restore();
        }
      });

      // Animated rider
      const t = (Math.sin(time * 0.6) + 1) / 2;
      const seg = Math.floor(t * (mainPath.length - 1));
      const segT = t * (mainPath.length - 1) - seg;
      const pa = mainPath[Math.min(seg, mainPath.length - 1)];
      const pb = mainPath[Math.min(seg + 1, mainPath.length - 1)];
      const rp = project(pa[0]+(pb[0]-pa[0])*segT, pa[1]+(pb[1]-pa[1])*segT, pa[2]+(pb[2]-pa[2])*segT, rotX, rotY, cx, cy);
      const pulse = 0.8 + 0.2 * Math.sin(time * 5);
      elems.push({
        z: rp.z + 10,
        draw: () => {
          ctx.save(); ctx.shadowColor = '#fbbf24'; ctx.shadowBlur = 20 * rp.scale * pulse;
          ctx.beginPath(); ctx.arc(rp.sx, rp.sy, 11 * rp.scale, 0, Math.PI * 2);
          ctx.fillStyle = '#fbbf24'; ctx.fill(); ctx.restore();
          ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
        }
      });

      // Step nodes
      for (const s of steps) {
        const p = project(...s.pos, rotX, rotY, cx, cy);
        const color = s.type === 'store' ? '#3b82f6' : s.type === 'customer' ? '#22c55e' : '#f59e0b';
        elems.push({
          z: p.z,
          draw: () => {
            const sz = (s.type === 'rider' ? 18 : 25) * p.scale;
            ctx.save(); ctx.shadowColor = color; ctx.shadowBlur = 14 * p.scale;
            if (s.type !== 'rider') {
              ctx.fillStyle = color; ctx.fillRect(p.sx - sz, p.sy - sz, sz * 2, sz * 2);
            } else {
              ctx.beginPath(); ctx.arc(p.sx, p.sy, sz, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill();
            }
            ctx.restore();
            ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5;
            if (s.type !== 'rider') ctx.strokeRect(p.sx - sz, p.sy - sz, sz * 2, sz * 2);
            else { ctx.beginPath(); ctx.arc(p.sx, p.sy, sz, 0, Math.PI * 2); ctx.stroke(); }
            ctx.fillStyle = '#fff';
            ctx.font = `bold ${Math.round(11 * Math.max(p.scale, 0.6))}px sans-serif`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
            ctx.fillText(`${s.step}. ${s.label}`, p.sx, p.sy - sz - 6 * p.scale);
          }
        });
      }

      elems.sort((a, b) => b.z - a.z);
      elems.forEach(e => e.draw());

      ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      [['#3b82f6', 'Blue = Initial path (Dark Store → Customer)'], ['#f59e0b', 'Orange dashed = Re-route via traffic update'], ['#22c55e', 'Green = Successful delivery']]
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
