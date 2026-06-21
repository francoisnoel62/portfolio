import { useEffect, useRef, useState } from 'react';
import { useLang } from '../../context/LangContext';
import { UI } from '../../data/ui-strings';
import type { Lang } from '../../data/ui-strings';

interface StatusBarProps {
  agentsOnline: number;
  isReady: boolean;
  onLangChange: (l: Lang) => void;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
}

export function StatusBar({ agentsOnline, isReady, onLangChange, theme, onThemeToggle }: StatusBarProps) {
  const { lang } = useLang();
  const s = UI[lang];
  const [clock, setClock] = useState('--:--');
  const meterRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function tick() {
      const d = new Date();
      setClock(
        String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0')
      );
    }
    tick();
    const iv = setInterval(tick, 15000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (meterRef.current) meterRef.current.style.width = '100%';
    }, 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="status">
      <span className="seg online">
        <i /> <span>{isReady ? s.ready : '…'}</span>
      </span>
      <span className="seg hide-m">main</span>
      <span className="seg hide-m">
        <span>{agentsOnline}</span> <span>{s.agentsWord}</span>
      </span>
      <span className="right">
        <span className="seg hide-m">
          <span>{s.ctx}</span>{' '}
          <span className="meter"><i ref={meterRef} /></span>
        </span>
        <button
          type="button"
          className="seg theme-tog"
          onClick={onThemeToggle}
          aria-label="Basculer le thème"
          title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
        >
          {theme === 'dark' ? '☀' : '🌙'}
        </button>
        <span className="seg langtog" role="group" aria-label="language">
          <button
            type="button"
            className={lang === 'fr' ? 'on' : ''}
            onClick={() => onLangChange('fr')}
          >FR</button>
          <button
            type="button"
            className={lang === 'en' ? 'on' : ''}
            onClick={() => onLangChange('en')}
          >EN</button>
        </span>
        <span className="seg clay">senior fullstack · IA</span>
        <span className="seg">{clock}</span>
      </span>
    </div>
  );
}
