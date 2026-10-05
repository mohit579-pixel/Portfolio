import { useEffect, useRef, useState } from 'react';
import { sfx } from '../lib/sfx';

// Lagging ring + dot cursor. The ring shows the hovered element's data-cur label,
// and each click leaves a small "200 OK" ripple. Only on precise pointers.
export default function Cursor() {
  const ring = useRef(null);
  const dot = useRef(null);
  const [label, setLabel] = useState(null);
  const [live, setLive] = useState(false);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    document.body.classList.add('cc');
    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let raf;
    let lastTarget = null;
    const timers = new Set();

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      setLive(true);
      dot.current.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      const t = e.target.closest?.('[data-cur]') ?? null;
      if (t && t !== lastTarget) sfx.hover();
      lastTarget = t;
      setLabel(t ? t.dataset.cur : null);
    };
    const down = (e) => {
      const id = Math.random();
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      const timer = setTimeout(() => {
        timers.delete(timer);
        setRipples((r) => r.filter((q) => q.id !== id));
      }, 800);
      timers.add(timer);
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      ring.current.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    loop();
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      document.body.classList.remove('cc');
    };
  }, []);

  return (
    <div aria-hidden="true">
      <div className={'ring' + (live ? ' live' : '') + (label ? ' big' : '')} ref={ring}>
        <span>{label}</span>
      </div>
      <div className="dot" ref={dot} style={{ opacity: live ? 1 : 0 }} />
      {ripples.map((r) => (
        <div key={r.id} className="rip" style={{ left: r.x + 12, top: r.y - 8 }}>
          200 OK
        </div>
      ))}
    </div>
  );
}
