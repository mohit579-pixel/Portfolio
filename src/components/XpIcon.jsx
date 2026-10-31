// Small animated line icons for the experience cards. Each one acts out its bullet.
// Animations live in CSS (home.css, ".ico-*") and stop under reduced motion.
const P = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const GEAR =
  'M24 14.5l2.2-.4.9-3 2.8 1.2-.6 2.2 1.9 1.9 2.2-.6 1.2 2.8-3 .9-.4 2.2.4 2.2 3 .9-1.2 2.8-2.2-.6-1.9 1.9.6 2.2-2.8 1.2-.9-3-2.2-.4-2.2.4-.9 3-2.8-1.2.6-2.2-1.9-1.9-2.2.6-1.2-2.8 3-.9.4-2.2-.4-2.2-3-.9 1.2-2.8 2.2.6 1.9-1.9-.6-2.2 2.8-1.2.9 3z';

const ICONS = {
  // Retrieval Engine: a gear turning, with data rows feeding into it.
  engine: (
    <>
      <g className="ico-spin">
        <path {...P} d={GEAR} />
        <circle {...P} cx="24" cy="23.5" r="3.4" />
      </g>
      <path {...P} className="ico-feed" d="M4 10h8M4 24h6M4 38h8" />
    </>
  ),
  // Reusable abstractions: a new piece slides into a shared base.
  plug: (
    <>
      <rect {...P} x="6" y="28" width="36" height="12" rx="2" />
      <path {...P} d="M14 28v-4M24 28v-4M34 28v-4" opacity=".5" />
      <g className="ico-plug">
        <rect {...P} x="18" y="8" width="12" height="10" rx="2" />
        <path {...P} d="M21 18v4M27 18v4" />
      </g>
    </>
  ),
  // Performance: a gauge needle sweeping to fast.
  speed: (
    <>
      <path {...P} d="M8 34a16 16 0 1 1 32 0" />
      <path {...P} d="M12 22l2 1.4M24 14v2.4M36 22l-2 1.4" opacity=".5" />
      <g className="ico-needle">
        <path {...P} d="M24 34L24 20" strokeWidth="2.2" />
      </g>
      <circle cx="24" cy="34" r="2.4" fill="currentColor" />
    </>
  ),
  // Kafka: events flowing along topic lanes.
  stream: (
    <>
      <path {...P} d="M6 14h36M6 24h36M6 34h36" opacity=".35" />
      <circle className="ico-ev e1" cx="6" cy="14" r="2.6" fill="currentColor" />
      <circle className="ico-ev e2" cx="6" cy="24" r="2.6" fill="currentColor" />
      <circle className="ico-ev e3" cx="6" cy="34" r="2.6" fill="currentColor" />
    </>
  ),
  // Docker + Kubernetes: containers stacking, a helm wheel turning.
  ship: (
    <>
      <g className="ico-box b1">
        <rect {...P} x="5" y="30" width="11" height="9" rx="1" />
      </g>
      <g className="ico-box b2">
        <rect {...P} x="18" y="30" width="11" height="9" rx="1" />
      </g>
      <g className="ico-box b3">
        <rect {...P} x="11.5" y="19" width="11" height="9" rx="1" />
      </g>
      <g className="ico-spin slow">
        <circle {...P} cx="37" cy="14" r="7" />
        <path {...P} d="M37 7v14M30 14h14M32 9l10 10M42 9L32 19" opacity=".7" />
      </g>
    </>
  ),
  // Debugging + docs: a magnifier scanning lines of a page.
  debug: (
    <>
      <rect {...P} x="6" y="6" width="28" height="36" rx="3" />
      <path {...P} d="M12 15h16M12 22h12M12 29h16M12 36h9" opacity=".5" />
      <g className="ico-scan">
        <circle {...P} cx="30" cy="24" r="7" />
        <path {...P} d="M35 29l7 7" strokeWidth="2.2" />
      </g>
    </>
  ),
  // Frontend: a browser window with a layout snapping in.
  ui: (
    <>
      <rect {...P} x="5" y="8" width="38" height="32" rx="3" />
      <path {...P} d="M5 16h38" />
      <rect {...P} className="ico-pop p1" x="10" y="21" width="12" height="14" rx="1.5" />
      <rect {...P} className="ico-pop p2" x="26" y="21" width="12" height="6" rx="1.5" />
      <rect {...P} className="ico-pop p3" x="26" y="29" width="12" height="6" rx="1.5" />
    </>
  ),
  api: (
    <>
      <path {...P} d="M16 14l-9 10 9 10M32 14l9 10-9 10" />
      <path {...P} className="ico-blink" d="M27 10l-6 28" />
    </>
  ),
  state: (
    <>
      <circle {...P} cx="24" cy="24" r="4" />
      <g className="ico-spin">
        <ellipse {...P} cx="24" cy="24" rx="18" ry="7" />
        <ellipse {...P} cx="24" cy="24" rx="18" ry="7" transform="rotate(60 24 24)" />
        <ellipse {...P} cx="24" cy="24" rx="18" ry="7" transform="rotate(120 24 24)" />
      </g>
    </>
  ),
};

export default function XpIcon({ name }) {
  return (
    <span className="xico-tile">
      <svg className="xico" viewBox="0 0 48 48" width="30" height="30" aria-hidden="true">
        {ICONS[name] || ICONS.engine}
      </svg>
    </span>
  );
}
