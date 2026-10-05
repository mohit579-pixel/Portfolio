import { useEffect, useRef, useState } from 'react';

// Ctrl/Cmd+K palette. Mount it only while it is open: every open starts fresh.
// Keyboard: type to filter, Up/Down to move, Enter to run, Esc to close.
export default function CommandMenu({ items, onClose }) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const input = useRef(null);
  const list = items.filter((x) => x.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    const opener = document.activeElement;
    input.current?.focus();
    return () => opener?.focus?.({ preventScroll: true });
  }, []);

  const run = (item) => {
    if (!item) return;
    onClose();
    item.run();
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((n) => Math.min(n + 1, list.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((n) => Math.max(n - 1, 0));
    } else if (e.key === 'Enter') run(list[active]);
    else if (e.key === 'Escape') onClose();
    else if (e.key === 'Tab') e.preventDefault(); // keep focus inside the dialog
  };

  return (
    <div className="ov" onClick={onClose}>
      <div
        className="cmd"
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={input}
          value={q}
          placeholder="Jump to a section or run an action"
          aria-label="Search commands"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmd-list"
          aria-activedescendant={list.length ? 'cmd-' + active : undefined}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
        />
        <ul id="cmd-list" role="listbox" aria-label="Commands">
          {list.map((x, n) => (
            <li
              key={x.label}
              id={'cmd-' + n}
              role="option"
              aria-selected={n === active}
              className={n === active ? 'on' : ''}
              data-cur="RUN"
              onMouseEnter={() => setActive(n)}
              onClick={() => run(x)}
            >
              <span>{x.label}</span>
              <span className="k">{x.hint}</span>
            </li>
          ))}
          {!list.length && (
            <li style={{ padding: '.8rem', color: 'var(--mut)' }}>
              No match. Try &quot;skills&quot; or &quot;email&quot;.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
