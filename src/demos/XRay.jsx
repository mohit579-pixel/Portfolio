import { useEffect, useRef, useState } from 'react';
import { analyze, drawFitted, drawSample, H, W } from '../lib/xray';
import { sfx } from '../lib/sfx';
import '../styles/demos.css';

export default function XRay() {
  const canvas = useRef(null);
  const fileInput = useRef(null);
  const timer = useRef(null);
  const [found, setFound] = useState([]);
  const [progress, setProgress] = useState(-1);
  const [note, setNote] = useState('Sample X-ray loaded. Run the analysis.');

  const ctx2d = () => {
    const c = canvas.current;
    c.width = W;
    c.height = H;
    return c.getContext('2d', { willReadFrequently: true });
  };
  const reset = (msg) => {
    clearInterval(timer.current);
    timer.current = null;
    setFound([]);
    setProgress(-1);
    setNote(msg);
  };

  useEffect(() => {
    drawSample(ctx2d());
    return () => clearInterval(timer.current);
  }, []);

  const loadSample = () => {
    drawSample(ctx2d());
    reset('Sample X-ray loaded. Run the analysis.');
  };

  const upload = (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      drawFitted(ctx2d(), img);
      URL.revokeObjectURL(url);
      reset('Image loaded. It stays in your browser. Run the analysis.');
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reset('Could not read that image. Try a PNG or JPEG.');
    };
    img.src = url;
  };

  const run = () => {
    if (timer.current) return;
    setFound([]);
    setProgress(0);
    sfx.scan();
    let n = 0;
    timer.current = setInterval(() => {
      n += 3;
      setProgress(n);
      if (n < 100) return;
      clearInterval(timer.current);
      timer.current = null;
      const res = analyze(canvas.current.getContext('2d').getImageData(0, 0, W, H).data);
      setFound(res);
      setProgress(-1);
      sfx.ok();
      setNote(
        res.length
          ? res.length + ' low-density region' + (res.length > 1 ? 's' : '') + ' flagged for review'
          : 'No low-density regions found',
      );
    }, 45);
  };

  return (
    <>
      <div className="xw">
        <canvas ref={canvas} role="img" aria-label="X-ray image" />
        {progress >= 0 && <i className="scanline" style={{ top: progress + '%' }} />}
        {found.map((o, n) => (
          <div
            key={n}
            className="fb"
            style={{ left: o.x + '%', top: o.y + '%', width: o.w + '%', height: o.h + '%' }}
          >
            <span>
              R{n + 1} · {o.conf}%
            </span>
          </div>
        ))}
      </div>
      <div className="row">
        <button className="btn solid" data-cur="SCAN" onClick={run}>
          Run analysis
        </button>
        <button className="btn" data-cur="LOAD" onClick={loadSample}>
          Load sample
        </button>
        <button className="btn" data-cur="UPLOAD" onClick={() => fileInput.current.click()}>
          Upload X-ray
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={upload}
        />
      </div>
      <div className="say" aria-live="polite">
        &gt; {note}
      </div>
      <div className="say" style={{ fontSize: '.78rem' }}>
        Demo heuristic running on your image in the browser. It is not a diagnosis. The real project
        uses TensorFlow.js.
      </div>
    </>
  );
}
