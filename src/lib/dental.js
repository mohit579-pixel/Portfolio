import { SLOTS } from '../data/demos';

// The next five days, labelled the way the calendar shows them.
export function buildDays(now = new Date()) {
  return [0, 1, 2, 3, 4].map((i) => {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    return {
      label:
        i === 0 ? 'Today' : i === 1 ? 'Tmrw' : d.toLocaleDateString('en', { weekday: 'short' }),
      word:
        i === 0
          ? 'today'
          : i === 1
            ? 'tomorrow'
            : d.toLocaleDateString('en', { weekday: 'long' }).toLowerCase(),
    };
  });
}

const slotMinutes = SLOTS.map((s) => +s.slice(0, 2) * 60 + +s.slice(3));
export const nearestSlot = (m) =>
  slotMinutes.reduce((best, v, i, a) => (Math.abs(v - m) < Math.abs(a[best] - m) ? i : best), 0);

// Turn free text ("book tomorrow 3 pm") into an intent.
export function parseCommand(text, days) {
  const q = text.toLowerCase();
  let day = null;
  let slot = null;
  if (/today/.test(q)) day = 0;
  else if (/tomorrow/.test(q)) day = 1;
  else for (let i = 2; i < 5; i++) if (q.includes(days[i].word.slice(0, 3))) day = i;

  const m = /(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/.exec(q);
  if (m) {
    let h = +m[1];
    const ap = m[3];
    if (ap === 'pm' && h < 12) h += 12;
    if (ap === 'am' && h === 12) h = 0;
    if (!ap && h < 8) h += 12;
    slot = nearestSlot(h * 60 + +(m[2] || 0));
  }

  let action = 'unknown';
  if (/cancel|remove|delete/.test(q)) action = 'cancel_appointment';
  else if (/x-?ray|scan|analy/.test(q)) action = 'open_xray';
  else if (/book|schedule|appointment|reserve/.test(q)) action = 'book_appointment';
  else if (/show|go to|open|view/.test(q) && day !== null) action = 'show_day';
  return { action, day, slot };
}

const key = (d, s) => d + '-' + s;

// Click a calendar cell (or book/cancel by command). Bookings: 0 = taken, 1 = yours.
export function toggleSlot(bookings, day, slot, days, force) {
  const k = key(day, slot);
  const v = bookings[k];
  if (v === 0) return { bookings, log: ['409 Conflict: that slot is taken'], sound: 'pop' };
  if (v === 1) {
    if (force === 'book') return { bookings, log: ['you already have that slot'] };
    const next = { ...bookings };
    delete next[k];
    return { bookings: next, log: ['DELETE /api/appointments → 200 (demo)'], sound: 'pop' };
  }
  return {
    bookings: { ...bookings, [k]: 1 },
    log: ['POST /api/appointments → 201 ' + days[day].label + ' ' + SLOTS[slot] + ' (demo)'],
    sound: 'ok',
  };
}

// Run a command against the current state and describe what should change.
export function runCommand(text, { bookings, focusDay, days }) {
  const { action, day, slot } = parseCommand(text, days);
  const log = [
    'intent: ' +
      JSON.stringify({
        action,
        day: day !== null ? days[day].label : undefined,
        time: slot !== null ? SLOTS[slot] : undefined,
      }),
  ];
  const done = (r) => ({ ...r, log: [...log, ...(r.log || [])] });

  if (action === 'open_xray') return done({ tab: 'xray', sound: 'ok' });
  if (action === 'show_day') return done({ focusDay: day, sound: 'pop' });
  if (action === 'book_appointment') {
    const d = day === null ? 1 : day;
    const s = slot !== null ? slot : SLOTS.findIndex((_, i) => !(key(d, i) in bookings));
    if (s < 0) return done({ log: ['no free slot that day'], sound: 'pop' });
    return done({ focusDay: d, ...toggleSlot(bookings, d, s, days, 'book') });
  }
  if (action === 'cancel_appointment') {
    const d = day === null ? focusDay : day;
    const s = slot !== null ? slot : SLOTS.findIndex((_, i) => bookings[key(d, i)] === 1);
    if (s < 0 || bookings[key(d, s)] !== 1)
      return done({ log: ['nothing of yours to cancel there'], sound: 'pop' });
    return done({ focusDay: d, ...toggleSlot(bookings, d, s, days) });
  }
  return done({ log: ['did not catch that, try: book tomorrow 3 pm'], sound: 'pop' });
}
