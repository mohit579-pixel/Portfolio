import { EMAIL } from '../data/links';
import { GLANCE, HERO } from '../data/profile';
import Scramble from './Scramble';

// The grid and glow follow the mouse through two CSS variables.
const track = (e) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', e.clientX - r.left + 'px');
  el.style.setProperty('--my', e.clientY - r.top + 'px');
};

export default function Hero({ copied, onCopy, onSeeWork }) {
  return (
    <div className="wrap hero" onMouseMove={track}>
      <div className="meta mono">{HERO.meta}</div>
      <h1 aria-label={HERO.first + ' ' + HERO.last}>
        {HERO.first}{' '}
        <span aria-hidden="true">
          <Scramble text={HERO.last} />
        </span>
      </h1>
      <p className="lead">{HERO.lead}</p>
      <p>{HERO.body}</p>
      <div className="cta">
        <button className="btn solid" data-cur="GO" onClick={onSeeWork}>
          {HERO.cta}
        </button>
        <button className="btn" data-cur="COPY" onClick={onCopy}>
          {copied ? 'Copied' : EMAIL}
        </button>
      </div>
      <ul className="glance">
        {GLANCE.map(([code, text, label]) => (
          <li key={code}>
            <span className="k">{code}</span>
            <span>{text}</span>
            <em>{label}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
