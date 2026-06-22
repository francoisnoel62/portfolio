import { useLang } from '../../context/LangContext';
import { UI } from '../../data/ui-strings';

interface TitleBarProps {
  onMenuToggle: () => void;
  menuOpen: boolean;
}

export function TitleBar({ onMenuToggle, menuOpen }: TitleBarProps) {
  const { lang } = useLang();
  const s = UI[lang];
  return (
    <div className="titlebar">
      <div className="lights"><i /><i /><i /></div>
      <div
        className="titlebar__name"
        dangerouslySetInnerHTML={{ __html: `francois-noel — <b>~/portfolio</b> · ${s.tbSession}` }}
      />
      <div className="titlebar__ico">
        <span>⌘K</span>
        <button
          className={`titlebar__menu${menuOpen ? ' active' : ''}`}
          onClick={onMenuToggle}
          aria-label="Toggle file tree"
        >≡</button>
      </div>
    </div>
  );
}
