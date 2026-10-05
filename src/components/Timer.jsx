import { useEffect, useState } from 'react';

const pad = (n) => String(n).padStart(2, '0');

export default function Timer() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setS((x) => x + 1), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="mono" aria-hidden="true">
      REC {pad(Math.floor(s / 60))}:{pad(s % 60)}
    </span>
  );
}
