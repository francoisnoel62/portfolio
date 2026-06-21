import { useLang } from '../../context/LangContext';
import { UI } from '../../data/ui-strings';

interface DockProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

export function Dock({ value, onChange, onSubmit, disabled }: DockProps) {
  const { lang } = useLang();
  const s = UI[lang];

  return (
    <div className="dock">
      <div className="dock__inner">
        <span className="dock__caret">❯</span>
        <input
          id="input"
          type="text"
          autoComplete="off"
          spellCheck={false}
          placeholder={s.placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') onSubmit(); }}
        />
        <button
          className="send"
          disabled={disabled}
          onClick={onSubmit}
        >
          {s.send}
        </button>
      </div>
      <div
        className="dock__hint"
        dangerouslySetInnerHTML={{ __html: s.hint }}
      />
    </div>
  );
}
