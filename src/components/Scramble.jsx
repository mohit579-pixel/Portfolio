import { useCallback, useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';

const CHARS = '01<>/{}#$%&';

// Text that scrambles into place on load and on hover.
export default function Scramble({ text }) {
  const [shown, setShown] = useState(text);
  const timer = useRef();

  const run = useCallback(() => {
    if (prefersReducedMotion()) return;
    clearInterval(timer.current);
    let n = 0;
    timer.current = setInterval(() => {
      n++;
      if (n >= text.length * 2) {
        clearInterval(timer.current);
        setShown(text);
        return;
      }
      setShown(
        text
          .split('')
          .map((c, i) => (i < n / 2 ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join(''),
      );
    }, 35);
  }, [text]);

  useEffect(() => {
    run();
    return () => clearInterval(timer.current);
  }, [run]);

  // The scramble alphabet has no letters, so the text only matches once it has settled.
  return (
    <span className={shown !== text ? 'sc' : ''} data-cur="HOVER" onMouseEnter={run}>
      {shown}
    </span>
  );
}
