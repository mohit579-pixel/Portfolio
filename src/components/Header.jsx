import Timer from './Timer';

export default function Header({ dark, onToggleTheme, sound, onToggleSound, onOpenMenu, onTop }) {
  return (
    <header className="bar">
      <div className="wrap">
        <a
          className="logo"
          href="#top"
          data-cur="TOP"
          aria-label="Mohit Khandelwal, back to top"
          onClick={(e) => {
            e.preventDefault();
            onTop();
          }}
        >
          <span className="rec" />
          MK
          <Timer />
        </a>
        <div>
          <button
            className="btn"
            data-cur="MENU"
            aria-haspopup="dialog"
            aria-keyshortcuts="Control+K Meta+K"
            onClick={onOpenMenu}
          >
            Menu<span className="kbd">Ctrl K</span>
          </button>
          <button
            className="btn"
            style={{ marginLeft: '.5rem' }}
            data-cur="THEME"
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={onToggleTheme}
          >
            {dark ? 'Light' : 'Dark'}
          </button>
          <button
            className="btn"
            style={{ marginLeft: '.5rem' }}
            data-cur="SOUND"
            aria-pressed={sound}
            onClick={onToggleSound}
          >
            Sound {sound ? 'on' : 'off'}
          </button>
        </div>
      </div>
    </header>
  );
}
