import { useEffect, useRef, useState } from 'react';
import { NODES } from '../data/arch';

// EdgeVerve request flow: click a node to inspect it, or animate a request through.
export default function Arch() {
  const [sel, setSel] = useState(2);
  const [hot, setHot] = useState(-1);
  const timer = useRef(null);

  useEffect(() => () => clearInterval(timer.current), []);

  const send = () => {
    if (timer.current) return;
    let n = 0;
    setHot(0);
    setSel(0);
    timer.current = setInterval(() => {
      n++;
      if (n >= NODES.length) {
        clearInterval(timer.current);
        timer.current = null;
        setHot(-1);
        return;
      }
      setHot(n);
      setSel(n);
    }, 900);
  };

  return (
    <div>
      <div className="flow">
        {NODES.map((x, n) => (
          <button
            key={x.name}
            className={'node' + (sel === n ? ' sel' : '') + (hot === n ? ' hot' : '')}
            data-cur="INSPECT"
            aria-pressed={sel === n}
            onClick={() => setSel(n)}
          >
            {x.name}
            <small>{x.sub}</small>
          </button>
        ))}
      </div>
      <button className="btn solid" data-cur="POST" onClick={send}>
        Send a request through
      </button>
      <p className="log" aria-live="polite">
        <b style={{ color: 'var(--fg)' }}>{NODES[sel].name}.</b> {NODES[sel].detail}
      </p>
    </div>
  );
}
