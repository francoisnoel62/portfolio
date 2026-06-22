import { useEffect, useState } from 'react';
import { useLang } from '../../context/LangContext';
import { UI } from '../../data/ui-strings';
import { DATA, AGENT_ORDER, type AgentId } from '../../data/agents';

interface SidebarProps {
  activeAgent: AgentId | null;
  busyAgent: AgentId | null;
  onAgentClick: (id: AgentId) => void;
  sidebarKey: number;
}

export function Sidebar({ activeAgent, busyAgent, onAgentClick, sidebarKey }: SidebarProps) {
  const { lang } = useLang();
  const s = UI[lang];
  const agents = DATA[lang];
  const [onlineCount, setOnlineCount] = useState(0);
  const [shownIds, setShownIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setOnlineCount(0);
    setShownIds(new Set());
    const total = AGENT_ORDER.length;
    let shown = 0;
    const iv = setInterval(() => {
      shown++;
      setOnlineCount(shown);
      if (shown >= total) clearInterval(iv);
    }, 120);
    return () => clearInterval(iv);
  }, [sidebarKey]);

  useEffect(() => {
    setShownIds(new Set());
    AGENT_ORDER.forEach((id, idx) => {
      setTimeout(() => {
        setShownIds(prev => new Set([...prev, id]));
      }, 220 + idx * 100);
    });
  }, [sidebarKey]);

  return (
    <aside className="side">
      <div className="side__h">
        <span>Agents</span>
        <span className="side__count">
          {onlineCount === 0 ? `— ${s.online}` : `${onlineCount} ${s.online}`}
        </span>
      </div>
      <div className="agents" id="agentList">
        {AGENT_ORDER.map(id => {
          const a = agents[id];
          const isFeatured = id === 'profil';
          const isActive = activeAgent === id;
          const isBusy = busyAgent === id;
          const isShown = shownIds.has(id);
          return (
            <div
              key={id}
              className={`agent${isFeatured ? ' agent--feature' : ''}${isActive ? ' active' : ''}${isBusy ? ' busy' : ''}${isShown ? ' in' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => onAgentClick(id)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onAgentClick(id); } }}
            >
              <span className="agent__dot" />
              <span className="agent__meta">
                <span className="agent__name">
                  {a.name}
                  {isFeatured && <span className="agent__tag">brief</span>}
                </span>
                <span className="agent__role">{a.role}</span>
              </span>
            </div>
          );
        })}
      </div>
      <div className="side__f">
        <div><b>{s.session}</b> · main</div>
        <div><b>{s.model}</b> · françois-noël-1</div>
      </div>
    </aside>
  );
}
