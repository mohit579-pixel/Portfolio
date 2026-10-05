import { useState } from 'react';
import Tabs from '../components/Tabs';
import { LISTINGS, PROPERTY_KINDS } from '../data/demos';
import { filterListings, fmtPrice, makeListing } from '../lib/mantionify';
import { sfx } from '../lib/sfx';
import Art from './Art';
import '../styles/demos.css';

const EMPTY_FORM = { title: '', kind: 'Flat', loc: '', price: '', beds: '2', area: '' };

export default function Mantionify() {
  const [listings, setListings] = useState(LISTINGS);
  const [tab, setTab] = useState('browse');
  const [q, setQ] = useState('');
  const [kind, setKind] = useState('All');
  const [max, setMax] = useState(300);
  const [sort, setSort] = useState('new');
  const [sel, setSel] = useState(null);
  const [saved, setSaved] = useState([]);
  const [contact, setContact] = useState(null);
  const [msg, setMsg] = useState('');
  const [form, setForm] = useState(EMPTY_FORM);
  const [note, setNote] = useState(
    '> sample listings (demo data). Filter, save, contact a seller, or list your own.',
  );

  const shown = filterListings(listings, { q, kind, max, sort });

  const toggleSave = (id) => {
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
    sfx.pop();
  };

  const post = () => {
    const id = Date.now();
    const listing = makeListing(form, id);
    if (!listing) {
      setNote('> add a title and a price (in lakhs) to list a property');
      sfx.pop();
      return;
    }
    setListings([listing, ...listings]);
    setForm({ ...form, title: '', price: '', area: '', loc: '' });
    setTab('browse');
    setKind('All');
    setQ('');
    setMax(300);
    setSort('new');
    setSel(id);
    sfx.ok();
    setNote('> POST /api/listings → 201 Created (demo). Your listing is first in the list.');
  };

  const send = () => {
    if (!msg.trim()) {
      sfx.pop();
      setNote('> write a short message first');
      return;
    }
    setContact(null);
    setMsg('');
    sfx.ok();
    setNote('> POST /api/inquiries → 201. Message sent to the seller (demo).');
  };

  const card = (l) => (
    <div key={l.id} className={'lc' + (sel === l.id ? ' sel' : '')}>
      <Art kind={l.kind} hue={(l.id * 47) % 360} />
      <div className="lb">
        <b>{l.title}</b>
        <span className="mut">
          {l.loc} · {l.kind}
          {l.beds ? ' · ' + l.beds + ' bed' : ''}
          {l.area ? ' · ' + l.area + ' sqft' : ''}
        </span>
        <span className="pr2">₹{fmtPrice(l.price)}</span>
      </div>
      <div className="la">
        <button
          className="btn"
          data-cur="SAVE"
          aria-label={(saved.includes(l.id) ? 'Saved ' : 'Save ') + l.title}
          onClick={() => toggleSave(l.id)}
        >
          {saved.includes(l.id) ? 'Saved' : 'Save'}
        </button>
        <button
          className="btn"
          data-cur="CONTACT"
          aria-expanded={contact === l.id}
          aria-label={'Contact the seller of ' + l.title}
          onClick={() => {
            setContact(contact === l.id ? null : l.id);
            sfx.pop();
          }}
        >
          Contact
        </button>
      </div>
      {contact === l.id && (
        <div className="lm row">
          <input
            aria-label="Message to the seller"
            placeholder="Message to the seller"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
          />
          <button className="btn solid" data-cur="SEND" onClick={send}>
            Send
          </button>
        </div>
      )}
    </div>
  );

  const field = (k, label, type = 'text') => (
    <input
      aria-label={label}
      placeholder={label}
      type={type}
      value={form[k]}
      onChange={(e) => setForm({ ...form, [k]: e.target.value })}
    />
  );

  return (
    <div className="dm">
      <Tabs
        label="Mantionify demo"
        tabs={[
          ['browse', 'Browse'],
          ['sell', 'List a property'],
          ['saved', 'Saved ' + saved.length],
        ]}
        value={tab}
        onChange={setTab}
        style={{ marginBottom: 0 }}
      />
      {tab === 'browse' && (
        <>
          <div className="row">
            <input
              aria-label="Search"
              placeholder="Search title or area"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <select aria-label="Type" value={kind} onChange={(e) => setKind(e.target.value)}>
              {['All', ...PROPERTY_KINDS].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
            <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="new">Newest</option>
              <option value="lo">Price low-high</option>
              <option value="hi">Price high-low</option>
            </select>
          </div>
          <div className="row">
            <span className="say" style={{ minWidth: '8.5rem' }}>
              Up to ₹{fmtPrice(max)}
            </span>
            <input
              type="range"
              aria-label="Maximum price"
              aria-valuetext={'₹' + fmtPrice(max)}
              min="20"
              max="300"
              step="10"
              value={max}
              onChange={(e) => setMax(+e.target.value)}
            />
          </div>
          <div className="map" role="group" aria-label="Map of listings">
            {shown.map((l) => (
              <button
                key={l.id}
                className={'pin' + (sel === l.id ? ' on' : '')}
                style={{ left: l.x + '%', top: l.y + '%' }}
                data-cur="PIN"
                aria-label={l.title + ', ₹' + fmtPrice(l.price)}
                aria-pressed={sel === l.id}
                onClick={() => {
                  setSel(l.id);
                  sfx.pop();
                }}
              >
                ₹{fmtPrice(l.price)}
              </button>
            ))}
          </div>
          {shown.map(card)}
          {!shown.length && <div className="say">No listings match. Try a higher budget.</div>}
        </>
      )}
      {tab === 'sell' && (
        <>
          <div className="row">
            {field('title', 'Title, e.g. Sunny 2 BHK')}
            {field('loc', 'Locality')}
          </div>
          <div className="row">
            <select
              aria-label="Property type"
              value={form.kind}
              onChange={(e) => setForm({ ...form, kind: e.target.value })}
            >
              {PROPERTY_KINDS.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
            {field('price', 'Price in lakhs', 'number')}
            {field('beds', 'Beds', 'number')}
            {field('area', 'Area (sqft)', 'number')}
          </div>
          <div className="row">
            <button className="btn solid" data-cur="POST" onClick={post}>
              Post listing
            </button>
          </div>
        </>
      )}
      {tab === 'saved' && (
        <>
          {listings.filter((l) => saved.includes(l.id)).map(card)}
          {!saved.length && (
            <div className="say">Nothing saved yet. Save a listing from Browse.</div>
          )}
        </>
      )}
      <div className="say" aria-live="polite">
        {note}
      </div>
    </div>
  );
}
