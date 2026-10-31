import { prefersReducedMotion } from '../lib/motion';

// A CSS-3D scene of the Retrieval Engine: a spinning core cube on a tilted plane,
// consuming products orbiting it, requests flowing in along spokes, Kafka events
// circling on the outer ring, and Redis + database layers underneath.
const PRODUCTS = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'];
const FACES = ['front', 'back', 'right', 'left', 'top'];
const FACE_TEXT = {
  front: 'Retrieval\nEngine',
  back: 'Spring\nBoot',
  right: 'REST',
  left: 'Java',
  top: 'RE',
};

const STATS = [
  ['5+', 'products served'],
  ['1', 'reusable code path'],
  ['Kafka', 'async events'],
  ['Redis', 'hot-data cache'],
  ['K8s', 'pods on AWS EC2'],
];

const look = (e) => {
  if (prefersReducedMotion()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--px', (((e.clientX - r.left) / r.width - 0.5) * 16).toFixed(2) + 'deg');
  el.style.setProperty('--py', (((e.clientY - r.top) / r.height - 0.5) * -10).toFixed(2) + 'deg');
};

export default function EngineCore() {
  return (
    <div className="core-wrap">
      <ul className="core-stats">
        {STATS.map(([v, l], i) => (
          <li key={l} style={{ '--i': i }}>
            <b>{v}</b>
            <span>{l}</span>
          </li>
        ))}
      </ul>
      <div
        className="core3d"
        onPointerMove={look}
        role="img"
        aria-label="3D animation: the Retrieval Engine at the center, five banking products orbiting it, requests flowing in, Kafka events on the outer ring, Redis and the database below."
      >
        <div className="cam">
          <div className="stage">
            <div className="layer db">
              <span>Database · many schemas</span>
            </div>
            <div className="layer redis">
              <span>Redis cache</span>
            </div>
            <div className="oring kafka">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
                <i key={n} style={{ '--a': n * 45 + 'deg' }} />
              ))}
            </div>
            <div className="oring orbit" />
            {PRODUCTS.map((p, n) => (
              <div
                key={p}
                className="spoke"
                style={{ '--a': n * 72 + 'deg', '--d': n * 0.45 + 's' }}
              >
                <i className="packet" />
              </div>
            ))}
            {PRODUCTS.map((p, n) => (
              <div key={p} className="sat" style={{ '--a': n * 72 + 'deg' }}>
                <div className="sat-face">
                  <span>{p}</span>
                </div>
              </div>
            ))}
            <div className="cube">
              {FACES.map((f) => (
                <div key={f} className={'face ' + f}>
                  {FACE_TEXT[f]}
                </div>
              ))}
            </div>
          </div>
        </div>
        <span className="core-tag k">kafka topic ring ↻</span>
      </div>
    </div>
  );
}
