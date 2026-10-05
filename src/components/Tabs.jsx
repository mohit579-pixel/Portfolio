// A row of chip-styled tabs with arrow-key navigation (roving tabindex).
export default function Tabs({ label, tabs, value, onChange, cur = 'TAB', style }) {
  const onKeyDown = (e) => {
    const i = tabs.findIndex(([k]) => k === value);
    let next = null;
    if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    if (next === null) return;
    e.preventDefault();
    e.stopPropagation(); // don't also switch projects
    onChange(tabs[next][0]);
    e.currentTarget.querySelectorAll('[role=tab]')[next]?.focus();
  };
  return (
    <div className="chips" role="tablist" aria-label={label} style={style} onKeyDown={onKeyDown}>
      {tabs.map(([k, text]) => (
        <button
          key={k}
          type="button"
          role="tab"
          className="chip"
          data-cur={cur}
          aria-selected={value === k}
          tabIndex={value === k ? 0 : -1}
          onClick={() => onChange(k)}
        >
          {text}
        </button>
      ))}
    </div>
  );
}
