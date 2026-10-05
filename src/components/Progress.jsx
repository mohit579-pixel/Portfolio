import { useEffect, useState } from 'react';

const percent = () => {
  const h = document.documentElement;
  return (h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100;
};

export default function Progress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const update = () => setWidth(percent());
    const first = requestAnimationFrame(update);
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener('scroll', update);
    };
  }, []);
  return <div className="prog" aria-hidden="true" style={{ width: width + '%' }} />;
}
