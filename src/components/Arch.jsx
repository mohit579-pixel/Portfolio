import { useEffect, useRef, useState } from 'react';
import {
  AFTER_CODE,
  BEFORE_CODE,
  INITIAL_PLUGINS,
  NODES,
  PATHS,
  POD_PRODUCTS,
  STAGES,
  TABS,
  TECHNIQUES,
  podConfig,
} from '../data/arch';
import { prefersReducedMotion } from '../lib/motion';
import { sfx } from '../lib/sfx';
import Tabs from './Tabs';

// Steps through `count` items on an interval; returns [active index, run, running].
function useStepper(count, ms, onStep, onDone) {
  const [hot, setHot] = useState(-1);
  const timer = useRef(null);
  useEffect(() => () => clearInterval(timer.current), []);
  const run = (n = count) => {
    if (timer.current) return;
    const delay = prefersReducedMotion() ? 120 : ms;
    let i = 0;
    setHot(0);
    onStep?.(0);
    timer.current = setInterval(() => {
      i++;
      if (i >= n) {
        clearInterval(timer.current);
        timer.current = null;
        setHot(-1);
        onDone?.();
        return;
      }
      setHot(i);
      onStep?.(i);
    }, delay);
  };
  return [hot, run, hot !== -1];
}

function Flow() {
  const [cache, setCache] = useState('cold');
  const [sel, setSel] = useState(1);
  const [lines, setLines] = useState([]);
  const [stepNode, setStepNode] = useState(-1);
  const path = PATHS[cache];

  const [, run, running] = useStepper(
    path.length,
    750,
    (i) => {
      const [node, text] = path[i];
      setStepNode(node);
      setSel(node);
      setLines((l) => [...l, [node, text]]);
      sfx.type();
    },
    () => {
      setStepNode(-1);
      // After a cold request, the next one is warm.
      if (cache === 'cold') setCache('warm');
      sfx.ok();
    },
  );

  const send = () => {
    if (running) return;
    setLines([]);
    run();
  };

  const dbHits = path.filter(([n]) => n === 3).length;

  return (
    <div>
      <div className="chips" role="group" aria-label="Cache state">
        {[
          ['cold', 'Cache: cold'],
          ['warm', 'Cache: warm'],
        ].map(([k, t]) => (
          <button
            key={k}
            className="chip"
            data-cur="SET"
            aria-pressed={cache === k}
            disabled={running}
            onClick={() => setCache(k)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flow">
        {NODES.map((x, n) => (
          <button
            key={x.name}
            className={
              'node' +
              (sel === n ? ' sel' : '') +
              (stepNode === n ? ' hot' : '') +
              (cache === 'warm' && n === 3 ? ' skip' : '')
            }
            data-cur="INSPECT"
            aria-pressed={sel === n}
            onClick={() => setSel(n)}
          >
            {x.name}
            <small>{x.sub}</small>
          </button>
        ))}
      </div>
      <div className="cta" style={{ marginTop: 0, alignItems: 'center' }}>
        <button className="btn solid" data-cur="GET" onClick={send} disabled={running}>
          {running ? 'Request in flight…' : 'Send a request through'}
        </button>
        <span className="k mut" style={{ fontSize: '.85rem' }}>
          {path.length} hops · {dbHits} database round trip{dbHits === 1 ? '' : 's'}
        </span>
      </div>
      <p className="log" aria-live="polite">
        <b style={{ color: 'var(--fg)' }}>{NODES[sel].name}.</b> {NODES[sel].detail}
      </p>
      <ol className="term" aria-label="Request log">
        {lines.length === 0 && <li className="mut">$ waiting for a request…</li>}
        {lines.map(([node, text], i) => (
          <li key={i}>
            <span className="k">{String(i + 1).padStart(2, '0')}</span>
            <em>{NODES[node].name}</em>
            <span className={/MISS/.test(text) ? 'miss' : /HIT/.test(text) ? 'hit' : undefined}>
              {text}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Design() {
  const [view, setView] = useState('after');
  const [plugins, setPlugins] = useState(INITIAL_PLUGINS);
  const [fresh, setFresh] = useState(null);

  const addProduct = () => {
    const next = String.fromCharCode(65 + plugins.length);
    if (plugins.length >= 12) return;
    setPlugins([...plugins, next]);
    setFresh(next);
    setView('after');
    sfx.pop();
  };

  return (
    <div className="design">
      <div>
        <div className="chips" role="group" aria-label="Code version">
          {[
            ['before', 'Before: if-else per product'],
            ['after', 'After: plug-in specs'],
          ].map(([k, t]) => (
            <button
              key={k}
              className="chip"
              data-cur="VIEW"
              aria-pressed={view === k}
              onClick={() => setView(k)}
            >
              {t}
            </button>
          ))}
        </div>
        <pre className={'code' + (view === 'before' ? ' bad' : '')}>
          <code>{view === 'before' ? BEFORE_CODE : AFTER_CODE}</code>
        </pre>
      </div>
      <div className="card">
        <b>Registered products</b>
        <div className="stack">
          {plugins.map((p) => (
            <span key={p} className={'tag' + (p === fresh ? ' new' : '')}>
              Product {p}
            </span>
          ))}
        </div>
        <button
          className="btn"
          data-cur="PLUG"
          onClick={addProduct}
          disabled={plugins.length >= 12}
        >
          + Plug in a new product
        </button>
        <p className="mut" style={{ fontSize: '.88rem', marginBottom: 0, marginTop: '.9rem' }}>
          {fresh
            ? `Product ${fresh} added as a new spec. Core engine files changed: 0.`
            : 'I analyzed how each new product differed from the existing ones and extended the shared design, so a new product is a new spec, not a new branch.'}
        </p>
      </div>
    </div>
  );
}

function Perf() {
  const [sel, setSel] = useState(TECHNIQUES[0].key);
  const t = TECHNIQUES.find((x) => x.key === sel);
  return (
    <div>
      <div className="chips" role="group" aria-label="Optimization technique">
        {TECHNIQUES.map((x) => (
          <button
            key={x.key}
            className="chip"
            data-cur="PICK"
            aria-pressed={sel === x.key}
            onClick={() => setSel(x.key)}
          >
            {x.name}
          </button>
        ))}
      </div>
      <div className="perf card" aria-live="polite">
        <div>
          <span className="k mut">WHAT</span>
          <p>{t.what}</p>
        </div>
        <div>
          <span className="k mut">WHEN I REACH FOR IT</span>
          <p>{t.when}</p>
        </div>
      </div>
      <p className="mut" style={{ fontSize: '.88rem' }}>
        No single trick fits high-volume banking data. Each use case gets the technique that matches
        its bottleneck.
      </p>
    </div>
  );
}

function Ship() {
  const [sel, setSel] = useState(4);
  const [done, setDone] = useState(false);
  const [product, setProduct] = useState(POD_PRODUCTS[0]);
  const [hot, run, running] = useStepper(
    STAGES.length,
    650,
    (i) => {
      setSel(i);
      setDone(false);
      sfx.type();
    },
    () => {
      setDone(true);
      sfx.ok();
    },
  );

  return (
    <div>
      <div className="flow">
        {STAGES.map((s, n) => (
          <button
            key={s.name}
            className={'node' + (sel === n ? ' sel' : '') + (hot === n ? ' hot' : '')}
            data-cur="INSPECT"
            aria-pressed={sel === n}
            onClick={() => setSel(n)}
          >
            {s.name}
            <small>{s.sub}</small>
          </button>
        ))}
      </div>
      <div className="cta" style={{ marginTop: 0, alignItems: 'center' }}>
        <button className="btn solid" data-cur="RUN" onClick={() => run()} disabled={running}>
          {running ? 'Pipeline running…' : 'Run the pipeline'}
        </button>
        {done && <span className="badge">Released, one pod per product</span>}
      </div>
      <p className="log" aria-live="polite">
        <b style={{ color: 'var(--fg)' }}>{STAGES[sel].name}.</b> {STAGES[sel].detail}
      </p>
      <div className="chips" role="group" aria-label="Pod configuration for product">
        {POD_PRODUCTS.map((p) => (
          <button
            key={p}
            className="chip"
            data-cur="CONFIG"
            aria-pressed={product === p}
            onClick={() => setProduct(p)}
          >
            Pod in product {p}
          </button>
        ))}
      </div>
      <pre className="code">
        <code>{podConfig(product)}</code>
      </pre>
      <p className="mut" style={{ fontSize: '.8rem' }}>
        Illustrative config. Same image, a tailored configuration per consuming product.
      </p>
    </div>
  );
}

// The EdgeVerve Retrieval Engine, explored through four tabs.
export default function Arch() {
  const [tab, setTab] = useState('flow');
  return (
    <div>
      <Tabs label="Retrieval Engine views" tabs={TABS} value={tab} onChange={setTab} />
      <div role="tabpanel" aria-label={TABS.find(([k]) => k === tab)[1]}>
        {tab === 'flow' && <Flow />}
        {tab === 'design' && <Design />}
        {tab === 'perf' && <Perf />}
        {tab === 'ship' && <Ship />}
      </div>
    </div>
  );
}
