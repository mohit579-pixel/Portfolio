import { lazy, Suspense, useEffect } from 'react';
import { PROJECTS } from '../data/projects';
import { SITE_TITLE } from '../data/profile';
import { projectHref, useRouter } from '../lib/routing';

// Each demo is its own chunk, loaded only when its project page opens.
const DEMOS = {
  'P-01': lazy(() => import('../demos/Dental')),
  'P-02': lazy(() => import('../demos/Mantionify')),
  'P-03': lazy(() => import('../demos/Wanderlust')),
};

const isTyping = (el) => el.closest?.('input, select, textarea, [contenteditable="true"]');

export default function ProjectPage({ id }) {
  const { goHome, openProject } = useRouter();
  const i = PROJECTS.findIndex((x) => x.id === id);
  const p = PROJECTS[i];
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const prev = PROJECTS[(i + PROJECTS.length - 1) % PROJECTS.length];
  const Demo = DEMOS[p.id];

  useEffect(() => {
    document.title = p.name + ' — Mohit Khandelwal';
    const onKey = (e) => {
      if (isTyping(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'Escape') goHome();
      if (e.key === 'ArrowRight') openProject(next.id);
      if (e.key === 'ArrowLeft') openProject(prev.id);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.title = SITE_TITLE;
    };
  }, [p.name, next.id, prev.id, goHome, openProject]);

  return (
    <div className="pg">
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="wrap">
        <button className="btn" data-cur="BACK" onClick={goHome}>
          ← All projects
        </button>
        <span className="idx" style={{ marginTop: '3rem' }}>
          {p.id} · {p.type}
        </span>
        <h1 className="pt" key={p.id}>
          {p.name}
        </h1>
        <div className="stack">
          {p.badge && <span className="badge">{p.badge}</span>}
          {p.stack.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <div className="pgrid">
          <div className="frame">
            <div className="wtop" aria-hidden="true">
              <i />
              <i />
              <i />
              <span className="mono">live demo · sample data</span>
            </div>
            <div className="wbody big" key={p.id}>
              <Suspense fallback={<div className="say">&gt; loading demo…</div>}>
                <Demo />
              </Suspense>
            </div>
          </div>
          <aside>
            <span className="idx">What I built</span>
            {p.built.map((t) => (
              <p key={t}>{t}</p>
            ))}
            <p className="say">Tip: arrow keys switch projects, Esc goes back.</p>
          </aside>
        </div>
        <nav className="pnav" aria-label="More projects">
          <a className="pcard" href={projectHref(prev.id)} data-cur="PREV">
            ← {prev.name}
          </a>
          <a
            className="pcard"
            style={{ textAlign: 'right' }}
            href={projectHref(next.id)}
            data-cur="NEXT"
          >
            {next.name} →
          </a>
        </nav>
      </div>
    </div>
  );
}
