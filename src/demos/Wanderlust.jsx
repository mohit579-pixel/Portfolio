import { useState } from 'react';
import { STAYS } from '../data/demos';
import { sfx } from '../lib/sfx';
import { addReview, avgRating, deleteReview, filterStays, reviewError } from '../lib/wanderlust';
import Art from './Art';
import '../styles/demos.css';

const TODAY = new Date().toLocaleDateString('en', { month: 'short', year: 'numeric' });
const hueOf = (id) => (id * 57) % 360;

export default function Wanderlust() {
  const [stays, setStays] = useState(STAYS);
  const [q, setQ] = useState('');
  const [maxPrice, setMaxPrice] = useState(6000);
  const [minRating, setMinRating] = useState('0');
  const [sort, setSort] = useState('top');
  const [viewId, setViewId] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [stars, setStars] = useState(0);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [note, setNote] = useState('> GET /listings → 200 (demo data)');

  const list = filterStays(stays, { q, maxPrice, minRating, sort });

  const open = (id) => {
    setViewId(id);
    setStars(0);
    setText('');
    setNote('> GET /listings/' + id + ' → 200');
    sfx.pop();
  };
  const wish = (id) => {
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
    sfx.pop();
  };
  const post = () => {
    const err = reviewError(stars, text);
    if (err) {
      setNote('> ' + err);
      sfx.pop();
      return;
    }
    setStays(
      addReview(stays, viewId, {
        author: name.trim() || 'You',
        stars,
        text: text.trim(),
        date: TODAY,
        mine: true,
      }),
    );
    setStars(0);
    setText('');
    sfx.ok();
    setNote('> POST /listings/' + viewId + '/reviews → 201 Created');
  };
  const remove = (id, i) => {
    setStays(deleteReview(stays, id, i));
    sfx.pop();
    setNote('> DELETE /listings/' + id + '/reviews/' + i + ' → 200');
  };

  const wishButton = (h) => (
    <button
      className="btn"
      data-cur="WISH"
      aria-label={(wishlist.includes(h.id) ? 'Wishlisted ' : 'Wishlist ') + h.name}
      onClick={() => wish(h.id)}
      style={viewId ? { marginLeft: 'auto' } : undefined}
    >
      {wishlist.includes(h.id) ? 'Wishlisted' : 'Wishlist'}
    </button>
  );

  const h = stays.find((x) => x.id === viewId);
  if (h) {
    const avg = avgRating(h);
    const n = h.reviews.length;
    return (
      <div className="dm">
        <div className="row">
          <button
            className="chip"
            data-cur="BACK"
            onClick={() => {
              setViewId(null);
              setNote('> GET /listings → 200');
              sfx.pop();
            }}
          >
            ← All stays
          </button>
        </div>
        <div className="row">
          <Art kind="House" hue={hueOf(h.id)} />
          <div>
            <b style={{ fontSize: '1.2rem' }}>{h.name}</b>
            <div className="mut">
              {h.loc} · ₹{h.price}/night
            </div>
          </div>
          {wishButton(h)}
        </div>
        <div>{h.desc}</div>
        <div className="stack" style={{ margin: 0 }}>
          {h.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <div className="row" style={{ alignItems: 'flex-start', gap: '1.2rem' }}>
          <div>
            <b style={{ fontSize: '2rem' }}>{avg ? avg.toFixed(1) : '–'}</b>
            <div className="mut">
              {n} review{n === 1 ? '' : 's'}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: '10rem', display: 'grid', gap: '.25rem' }}>
            {[5, 4, 3, 2, 1].map((s) => {
              const c = h.reviews.filter((r) => r.stars === s).length;
              return (
                <div className="rb" key={s} aria-label={s + ' stars: ' + c} role="group">
                  <span aria-hidden="true">{s}★</span>
                  <div className="pr" aria-hidden="true">
                    <i style={{ width: (n ? (c / n) * 100 : 0) + '%' }} />
                  </div>
                  <span aria-hidden="true">{c}</span>
                </div>
              );
            })}
          </div>
        </div>
        {h.reviews.map((r, i) => (
          <div className="li2" key={r.author + r.text + i}>
            <span>
              <b>{r.author}</b> <span className="mut">{r.date}</span>
              <br />
              {r.text}
            </span>
            <span style={{ textAlign: 'right' }}>
              <span className="k" style={{ color: 'var(--acc)' }} aria-label={r.stars + ' stars'}>
                {'★'.repeat(r.stars)}
              </span>
              {r.mine && (
                <>
                  <br />
                  <button
                    className="chip"
                    data-cur="DELETE"
                    aria-label={'Delete your review: ' + r.text}
                    onClick={() => remove(h.id, i)}
                  >
                    Delete
                  </button>
                </>
              )}
            </span>
          </div>
        ))}
        {!n && <div className="say">No reviews yet. Be the first.</div>}
        <div className="row">
          <div role="group" aria-label="Your rating" style={{ display: 'contents' }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                className={'star' + (stars >= s ? ' on' : '')}
                aria-pressed={stars === s}
                aria-label={s + (s === 1 ? ' star' : ' stars')}
                data-cur="RATE"
                onClick={() => {
                  setStars(s);
                  sfx.pop();
                }}
              >
                ★
              </button>
            ))}
          </div>
          <input
            aria-label="Your name"
            placeholder="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ maxWidth: '11rem' }}
          />
        </div>
        <div className="row">
          <input
            aria-label="Your review"
            placeholder="Write a review"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && post()}
          />
          <button className="btn solid" data-cur="POST" onClick={post}>
            Post review
          </button>
        </div>
        <div className="say" aria-live="polite">
          {note}
        </div>
      </div>
    );
  }

  return (
    <div className="dm">
      <div className="row">
        <input
          aria-label="Search"
          placeholder="Search a stay or destination"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          aria-label="Minimum rating"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
        >
          <option value="0">Any rating</option>
          <option value="3">3+ stars</option>
          <option value="4">4+ stars</option>
        </select>
        <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="top">Top rated</option>
          <option value="lo">Price low-high</option>
          <option value="hi">Price high-low</option>
        </select>
      </div>
      <div className="row">
        <span className="say" style={{ minWidth: '8.5rem' }}>
          Up to ₹{maxPrice}/night
        </span>
        <input
          type="range"
          aria-label="Maximum price per night"
          aria-valuetext={'₹' + maxPrice + ' per night'}
          min="2000"
          max="6000"
          step="200"
          value={maxPrice}
          onChange={(e) => setMaxPrice(+e.target.value)}
        />
      </div>
      {list.map((x) => {
        const avg = avgRating(x);
        return (
          <div className="lc" key={x.id}>
            <Art kind="House" hue={hueOf(x.id)} />
            <div className="lb">
              <b>{x.name}</b>
              <span className="mut">
                {x.loc} · {x.tags.slice(0, 2).join(', ')}
              </span>
              <span className="pr2">
                ₹{x.price}/night · {avg ? '★ ' + avg.toFixed(1) : 'new'} ({x.reviews.length})
              </span>
            </div>
            <div className="la">
              {wishButton(x)}
              <button
                className="btn solid"
                data-cur="VIEW"
                aria-label={'View ' + x.name}
                onClick={() => open(x.id)}
              >
                View
              </button>
            </div>
          </div>
        );
      })}
      {!list.length && <div className="say">No stays match those filters.</div>}
      <div className="say" aria-live="polite">
        {note}
      </div>
    </div>
  );
}
