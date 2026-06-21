import { useLang } from '../../context/LangContext';
import { UI } from '../../data/ui-strings';
import type { AgentId } from '../../data/agents';

interface DockProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  onAgentClick: (id: AgentId) => void;
}

export function Dock({ value, onChange, onSubmit, disabled, onAgentClick }: DockProps) {
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
      <div className="dock__hint">
        {s.hintPrefix}{' '}
        {s.hintAgents.map(([id, label], i) => (
          <span key={id}>
            <button
              type="button"
              className="hint-agent"
              onClick={() => onAgentClick(id as AgentId)}
            >{label}</button>
            {i < s.hintAgents.length - 1 && ' · '}
          </span>
        ))}
        {'. '}{s.hintSuffix}
      </div>
    </div>
  );
}
