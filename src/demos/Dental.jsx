import { Fragment, useEffect, useRef, useState } from 'react';
import Tabs from '../components/Tabs';
import { INITIAL_BOOKINGS, SLOTS } from '../data/demos';
import { buildDays, runCommand, toggleSlot } from '../lib/dental';
import { sfx } from '../lib/sfx';
import XRay from './XRay';
import '../styles/demos.css';

const TABS = [
  ['appt', 'Appointments'],
  ['xray', 'X-ray analysis'],
];
const MODES = [
  ['voice', 'Voice and text'],
  ['gesture', 'Hand gestures'],
];
// Hand skeleton around the pointer: [dx, dy, small]
const FINGERS = [
  [0, 0, 0],
  [-16, -14, 1],
  [0, -20, 1],
  [16, -14, 1],
  [24, 2, 1],
];

const pointIn = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  return {
    x: (e.clientX - r.left) / r.width,
    y: Math.min(0.999, Math.max(0, (e.clientY - r.top) / r.height)),
  };
};

export default function Dental() {
  const [days] = useState(() => buildDays());
  const [tab, setTab] = useState('appt');
  const [mode, setMode] = useState('voice');
  const [cmd, setCmd] = useState('');
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [focusDay, setFocusDay] = useState(1);
  const [hand, setHand] = useState(null);
  const [log, setLog] = useState(['> ready: speak or type a command']);
  const [listening, setListening] = useState(false);
  const swipeStart = useRef(0);
  const recognizer = useRef(null);

  useEffect(() => () => recognizer.current?.abort(), []);

  const say = (...lines) => setLog((x) => [...x, ...lines].slice(-4));

  // Apply a result from the pure dental logic: state changes, log lines, sound.
  const apply = (r) => {
    if (r.bookings) setBookings(r.bookings);
    if (r.focusDay != null) setFocusDay(r.focusDay);
    if (r.tab) setTab(r.tab);
    say(...r.log);
    if (r.sound) sfx[r.sound]();
  };

  const flip = (day, slot) => apply(toggleSlot(bookings, day, slot, days));
  const run = (text) => apply(runCommand(text, { bookings, focusDay, days }));

  const mic = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      say('speech recognition not available here, type a command');
      return;
    }
    try {
      const r = new SR();
      recognizer.current = r;
      r.lang = 'en-US';
      r.onstart = () => {
        setListening(true);
        sfx.pop();
      };
      r.onend = () => setListening(false);
      r.onerror = (e) => say('mic: ' + e.error + ', type a command instead');
      r.onresult = (e) => {
        const t = e.results[0][0].transcript;
        setCmd(t);
        say('heard: "' + t + '"');
        run(t);
      };
      r.start();
    } catch {
      say('mic unavailable, type a command');
    }
  };

  const pointerUp = (e) => {
    const dx = e.clientX - swipeStart.current;
    if (dx > 50) {
      setFocusDay(Math.min(4, focusDay + 1));
      say('gesture: swipe right');
      sfx.pop();
    } else if (dx < -50) {
      setFocusDay(Math.max(0, focusDay - 1));
      say('gesture: swipe left');
      sfx.pop();
    } else {
      const r = toggleSlot(bookings, focusDay, Math.floor(pointIn(e).y * 6), days);
      apply({ ...r, log: ['gesture: pinch', ...r.log] });
    }
  };

  const examples = [
    'book tomorrow 3 pm',
    'book today 10:30',
    'cancel tomorrow 3 pm',
    'show ' + days[3].word,
    'open x-ray',
  ];

  return (
    <div className="dm">
      <Tabs
        label="Dental demo"
        tabs={TABS}
        value={tab}
        onChange={setTab}
        style={{ marginBottom: 0 }}
      />
      {tab === 'appt' ? (
        <>
          <Tabs
            label="Input mode"
            tabs={MODES}
            value={mode}
            onChange={setMode}
            cur="MODE"
            style={{ marginBottom: 0 }}
          />
          {mode === 'voice' ? (
            <>
              <div className="row">
                <input
                  aria-label="Command"
                  placeholder="e.g. book tomorrow 3 pm"
                  value={cmd}
                  onChange={(e) => setCmd(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && run(cmd)}
                />
                <button className="btn solid" data-cur="RUN" onClick={() => run(cmd)}>
                  Run
                </button>
                <button className="btn" data-cur="MIC" aria-pressed={listening} onClick={mic}>
                  {listening ? 'Listening...' : 'Mic'}
                </button>
              </div>
              <div className="chips" style={{ marginBottom: 0 }}>
                {examples.map((x) => (
                  <button
                    key={x}
                    className="chip"
                    data-cur="TRY"
                    onClick={() => {
                      setCmd(x);
                      run(x);
                    }}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div
              className="pad"
              onPointerMove={(e) => setHand(pointIn(e))}
              onPointerLeave={() => setHand(null)}
              onPointerDown={(e) => {
                swipeStart.current = e.clientX;
              }}
              onPointerUp={pointerUp}
            >
              <span className="padl">
                {hand
                  ? 'hand detected · ' +
                    days[focusDay].label +
                    ' · ' +
                    SLOTS[Math.floor(hand.y * 6)]
                  : 'move your hand (mouse) here · drag sideways to swipe days · click to pinch and book'}
              </span>
              {hand &&
                FINGERS.map(([dx, dy, small], n) => (
                  <i
                    key={n}
                    className={'hd' + (small ? ' s' : '')}
                    style={{
                      left: 'calc(' + hand.x * 100 + '% + ' + dx + 'px)',
                      top: 'calc(' + hand.y * 100 + '% + ' + dy + 'px)',
                    }}
                  />
                ))}
            </div>
          )}
          <div className="cal" role="group" aria-label="Appointment calendar">
            <span />
            {days.map((d, i) => (
              <span key={i} className={'h' + (focusDay === i ? ' f' : '')}>
                {d.label}
              </span>
            ))}
            {SLOTS.map((s, r) => (
              <Fragment key={s}>
                <span className="h">{s}</span>
                {days.map((d, i) => {
                  const v = bookings[i + '-' + r];
                  const state = v === 0 ? 'taken' : v === 1 ? 'booked by you' : 'free';
                  return (
                    <button
                      key={i}
                      className={
                        'cell' +
                        (v === 0 ? ' t' : v === 1 ? ' me' : '') +
                        (focusDay === i ? ' fc' : '')
                      }
                      data-cur={v === 0 ? 'TAKEN' : v === 1 ? 'CANCEL' : 'BOOK'}
                      aria-label={d.label + ' ' + s + ', ' + state}
                      onClick={() => flip(i, r)}
                    >
                      {v === 0 ? 'taken' : v === 1 ? 'You' : ''}
                    </button>
                  );
                })}
              </Fragment>
            ))}
          </div>
          <div className="say" aria-live="polite">
            {log.map((l, i) => (
              <div key={i}>{l}</div>
            ))}
          </div>
        </>
      ) : (
        <XRay />
      )}
    </div>
  );
}
