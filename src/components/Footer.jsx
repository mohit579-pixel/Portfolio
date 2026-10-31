import { EMAIL, LINKS } from '../data/links';
import { FOOTER_NOTE, SECTIONS } from '../data/profile';

export default function Footer({ copied, onCopy }) {
  const s = SECTIONS.contact;
  const links = Object.entries(LINKS).filter(([, url]) => url);
  return (
    <footer id="contact">
      <div className="wrap">
        <span className="idx">{s.idx}</span>
        <h2>
          {s.title}
          <span aria-hidden="true">_</span>
        </h2>
        <p className="sub">{s.sub}</p>
        <div className="cta" style={{ marginTop: 0 }}>
          <a
            className="btn solid"
            style={{ textDecoration: 'none' }}
            href={'mailto:' + EMAIL}
            data-cur="MAIL"
          >
            Say hello
          </a>
          <button className="btn" data-cur="COPY" onClick={onCopy}>
            {copied ? 'Copied' : 'Copy email'}
          </button>
        </div>
        <div className="links">
          {links.map(([name, url]) => (
            <a
              key={name}
              href={url}
              data-cur="GET"
              {...(url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {name}
            </a>
          ))}
          <span>{FOOTER_NOTE}</span>
        </div>
      </div>
    </footer>
  );
}
