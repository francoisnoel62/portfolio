import { useLang } from '../../context/LangContext';
import { UI } from '../../data/ui-strings';

export function TitleBar() {
  const { lang } = useLang();
  const s = UI[lang];
  return (
    <div className="titlebar">
      <div className="lights"><i /><i /><i /></div>
      <div
        className="titlebar__name"
        dangerouslySetInnerHTML={{ __html: `francois-noel — <b>~/portfolio</b> · ${s.tbSession}` }}
      />
      <div className="titlebar__ico">⌘K&nbsp;&nbsp;≡</div>
    </div>
  );
}
