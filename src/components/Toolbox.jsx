import { useState } from 'react';
import { SKILLS } from '../data/skills';

const KEYS = Object.keys(SKILLS);
const ALL = KEYS.flatMap((k) => SKILLS[k]);

export default function Toolbox() {
  const [filter, setFilter] = useState('All');
  const list = filter === 'All' ? ALL : SKILLS[filter];
  return (
    <div>
      <div className="chips" role="group" aria-label="Filter skills by area">
        {['All', ...KEYS].map((k) => (
          <button
            key={k}
            className="chip"
            data-cur="FILTER"
            aria-pressed={filter === k}
            onClick={() => setFilter(k)}
          >
            {k}
            {k !== 'All' ? ' ' + SKILLS[k].length : ''}
          </button>
        ))}
      </div>
      <div className="stack" style={{ gap: '.6rem' }}>
        {list.map((s) => (
          <span key={s} className="tag" style={{ fontSize: '.95rem', padding: '.2rem .8rem' }}>
            {s}
          </span>
        ))}
      </div>
      <div className="marq" aria-hidden="true">
        <div className="track">
          {[...ALL, ...ALL].map((s, n) => (
            <span key={n}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
