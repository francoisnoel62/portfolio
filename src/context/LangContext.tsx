import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Lang } from '../data/ui-strings';

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const detected = (navigator.language || 'fr').toLowerCase().slice(0, 2) === 'fr' ? 'fr' : 'en';
  const [lang, setLang] = useState<Lang>(detected as Lang);
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
