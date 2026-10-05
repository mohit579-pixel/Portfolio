// X-ray demo: a generated sample image and a simple low-density heuristic.
// Everything runs in the browser on a 320x180 canvas.
export const W = 320;
export const H = 180;

export function drawSample(x) {
  const g = x.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#10171b');
  g.addColorStop(1, '#222d33');
  x.fillStyle = g;
  x.fillRect(0, 0, W, H);
  for (let i = 0; i < 8; i++) {
    const X = 20 + i * 35;
    x.fillStyle = '#7d8a90';
    x.fillRect(X + 8, 12, 19, 44);
    const t = x.createLinearGradient(0, 56, 0, 110);
    t.addColorStop(0, '#eef2f3');
    t.addColorStop(1, '#b4bfc4');
    x.fillStyle = t;
    x.fillRect(X + 1, 56, 33, 54);
  }
  // Two dark spots the analysis should find.
  [
    [2, 78],
    [5, 86],
  ].forEach(([i, y]) => {
    const cx = 20 + i * 35 + 17;
    const rg = x.createRadialGradient(cx, y, 0, cx, y, 8);
    rg.addColorStop(0, 'rgba(12,16,18,.95)');
    rg.addColorStop(1, 'rgba(12,16,18,0)');
    x.fillStyle = rg;
    x.beginPath();
    x.arc(cx, y, 8, 0, 7);
    x.fill();
  });
  x.fillStyle = '#10171b';
  for (let i = 0; i < 9; i++) x.fillRect(19 + i * 35, 56, 2, 54);
}

export function drawFitted(x, img) {
  x.fillStyle = '#000';
  x.fillRect(0, 0, W, H);
  const k = Math.max(W / img.width, H / img.height);
  x.drawImage(
    img,
    (W - img.width * k) / 2,
    (H - img.height * k) / 2,
    img.width * k,
    img.height * k,
  );
}

// Returns up to three flagged regions as percentages of the image, plus a confidence.
export function analyze(data) {
  const cs = 6;
  const gw = 53;
  const gh = 30;
  const g = [];
  for (let gy = 0; gy < gh; gy++)
    for (let gx = 0; gx < gw; gx++) {
      let s = 0;
      for (let y = 0; y < cs; y++)
        for (let xx = 0; xx < cs; xx++) {
          const p = ((gy * cs + y) * W + gx * cs + xx) * 4;
          s += 0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2];
        }
      g[gy * gw + gx] = s / (cs * cs);
    }

  const cand = [];
  for (let gy = 2; gy < gh - 2; gy++)
    for (let gx = 2; gx < gw - 2; gx++) {
      const ring = [];
      for (let j = -2; j <= 2; j++)
        for (let i = -2; i <= 2; i++)
          if (Math.max(Math.abs(i), Math.abs(j)) === 2) ring.push(g[(gy + j) * gw + gx + i]);
      ring.sort((a, b) => a - b);
      const med = (ring[7] + ring[8]) / 2;
      // A dark cell inside a mostly bright ring. At most two dark ring cells are
      // allowed, so the narrow dark gaps between roots don't count as findings.
      const v = g[gy * gw + gx];
      if (ring[2] > 110 && med > 130 && v < med * 0.65) cand.push({ gx, gy, s: 1 - v / med });
    }

  cand.sort((a, b) => b.s - a.s);
  const out = [];
  for (const k of cand)
    if (
      out.length < 3 &&
      out.every((o) => Math.max(Math.abs(o.gx - k.gx), Math.abs(o.gy - k.gy)) > 3)
    )
      out.push(k);

  return out.map((k) => ({
    x: (k.gx * cs - 5) / 3.2,
    y: (k.gy * cs - 5) / 1.8,
    w: (cs + 10) / 3.2,
    h: (cs + 10) / 1.8,
    conf: Math.round(Math.min(0.97, 0.45 + k.s * 0.55) * 100),
  }));
}
