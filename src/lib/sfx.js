// Tiny WebAudio sound engine. Nothing plays until the visitor has interacted
// with the page (pointer, key or touch), so the browser never blocks audio and
// the page never makes noise on its own.
let ctx = null;
let enabled = true;
let unlocked = false;

const UNLOCK_EVENTS = ['pointerdown', 'keydown', 'touchstart'];
if (typeof window !== 'undefined') {
  const unlock = () => {
    unlocked = true;
    UNLOCK_EVENTS.forEach((t) => window.removeEventListener(t, unlock, true));
  };
  UNLOCK_EVENTS.forEach((t) => window.addEventListener(t, unlock, true));
}

function audio() {
  if (!unlocked) return null;
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch {
      return null;
    }
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(freq, dur, type = 'sine', vol = 0.04, delay = 0, to) {
  if (!enabled) return;
  const a = audio();
  if (!a) return;
  const t = a.currentTime + delay;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g);
  g.connect(a.destination);
  o.start(t);
  o.stop(t + dur + 0.03);
}

export const sfx = {
  setEnabled(v) {
    enabled = v;
    if (v) audio();
  },
  click: () => tone(540, 0.07, 'square', 0.025, 0, 270),
  hover: () => tone(1000, 0.03, 'sine', 0.01),
  pop: () => tone(620, 0.1, 'sine', 0.05, 0, 980),
  type: () => tone(1100 + Math.random() * 400, 0.025, 'square', 0.012),
  scan: () => tone(260, 1.5, 'sawtooth', 0.018, 0, 1100),
  ok: () => {
    tone(523, 0.12, 'triangle', 0.05);
    tone(784, 0.2, 'triangle', 0.05, 0.1);
  },
};
