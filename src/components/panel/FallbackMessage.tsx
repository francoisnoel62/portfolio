import { useRef } from 'react';
import { useTypewriter } from '../../hooks/useTypewriter';
import type { AgentId } from '../../data/agents';
import { useLang } from '../../context/LangContext';
import { UI } from '../../data/ui-strings';

interface FallbackMessageProps {
  userText: string;
  gen: number;
  onChipClick: (id: AgentId) => void;
}

function FallbackText({ gen }: { gen: number }) {
  const { lang } = useLang();
  const s = UI[lang];
  const ref = useRef<HTMLParagraphElement>(null);
  useTypewriter(ref as React.RefObject<HTMLElement>, s.fallback, gen, 13);
  return <p className="prose" ref={ref} />;
}

export function FallbackMessage({ userText, gen, onChipClick }: FallbackMessageProps) {
  const { lang } = useLang();
  const s = UI[lang];

  return (
    <>
      <div className="msg user">
        <span className="caret">❯</span>
        <span className="cmd">{userText}</span>
      </div>
      <div className="msg">
        <div className="ag">
          <div className="ag__head">
            <span className="ag__badge" style={{ color: 'var(--accent)' }}>◈</span>
            <span className="ag__name" style={{ color: 'var(--accent)' }}>{s.orientName}</span>
          </div>
          <FallbackText gen={gen} />
          <div className="chips">
            {s.chips.map(([id, label]) => (
              <button
                key={id}
                className="chip"
                onClick={() => onChipClick(id as AgentId)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
