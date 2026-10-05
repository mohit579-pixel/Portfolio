import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';

// A page section that fades in the first time it scrolls into view.
export default function Section({ id, idx, title, sub, children }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(
    () => typeof IntersectionObserver === 'undefined' || prefersReducedMotion(),
  );

  useEffect(() => {
    if (seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen]);

  return (
    <section id={id} ref={ref} className={seen ? 'in' : undefined}>
      <div className="wrap">
        <span className="idx">{idx}</span>
        <h2>{title}</h2>
        {sub && <p className="sub">{sub}</p>}
        {children}
      </div>
    </section>
  );
}
