import { Fragment, useState } from 'react';
import { JOBS } from '../data/jobs';

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
            <ul className="xb" id={'job-' + n}>
              {j.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
        </Fragment>
      ))}
    </div>
  );
}
