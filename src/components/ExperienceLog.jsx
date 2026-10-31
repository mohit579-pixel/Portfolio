import { Fragment, useState } from 'react';
import { JOBS } from '../data/jobs';
import { prefersReducedMotion } from '../lib/motion';
import XpIcon from './XpIcon';

// Cards lean toward the pointer in 3D.
const tilt = (e) => {
  if (prefersReducedMotion()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.setProperty('--rx', (-y * 10).toFixed(2) + 'deg');
  el.style.setProperty('--ry', (x * 12).toFixed(2) + 'deg');
  el.style.setProperty('--gx', (x + 0.5) * 100 + '%');
  el.style.setProperty('--gy', (y + 0.5) * 100 + '%');
};
const untilt = (e) => {
  e.currentTarget.style.setProperty('--rx', '0deg');
  e.currentTarget.style.setProperty('--ry', '0deg');
};

export default function ExperienceLog() {
  const [open, setOpen] = useState(0);
  return (
    <div className="xp">
      {JOBS.map((j, n) => (
        <Fragment key={j.org}>
          <button
            className="xh"
            data-cur={open === n ? 'CLOSE' : 'OPEN'}
            aria-expanded={open === n}
            aria-controls={'job-' + n}
            onClick={() => setOpen(open === n ? -1 : n)}
          >
            <span className="k idx" style={{ margin: 0 }}>
              0{n + 1}
            </span>
            <span>
              <b>{j.title}</b>
              <small>
                {j.org} · {j.where}
              </small>
            </span>
            <span className="k idx" style={{ margin: 0 }}>
              {j.dates}
            </span>
          </button>
          {open === n && (
            <ul className="xcards" id={'job-' + n}>
              {j.bullets.map(([icon, title, text], i) => (
                <li
                  key={title}
                  className="xcard"
                  style={{ '--i': i }}
                  onPointerMove={tilt}
                  onPointerLeave={untilt}
                >
                  <div className="xcard-in">
                    <XpIcon name={icon} />
                    <b>{title}</b>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Fragment>
      ))}
    </div>
  );
}
