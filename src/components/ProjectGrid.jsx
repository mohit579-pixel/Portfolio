import { PROJECTS } from '../data/projects';
import { projectHref } from '../lib/routing';

export default function ProjectGrid() {
  return (
    <div className="pcards">
      {PROJECTS.map((p, n) => (
        <a key={p.id} className="pcard" href={projectHref(p.id)} data-cur="OPEN">
          <div className="pprev" style={{ '--h': 160 + n * 70 }}>
            <span className="k idx" style={{ margin: 0 }}>
              {p.id}
            </span>
          </div>
          <h3>{p.name}</h3>
          <p>{p.type}</p>
          <div className="stack">
            {p.stack.slice(0, 4).map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
          <span className="k go2">Open live demo →</span>
        </a>
      ))}
    </div>
  );
}
