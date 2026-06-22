import type { AgentId } from '../../data/agents';

export interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabClick: (id: AgentId | 'welcome') => void;
  onTabClose: (id: string) => void;
}

export function Tabs({ tabs, activeTab, onTabClick, onTabClose }: TabsProps) {
  return (
    <div className="tabs" id="tabs">
      {tabs.map(tab => (
        <div
          key={tab.id}
          className={`tab${tab.id === activeTab ? ' active' : ''}`}
          data-tab={tab.id}
          onClick={() => onTabClick(tab.id as AgentId | 'welcome')}
        >
          <span className="dot" />{tab.label}
          {tab.id !== 'welcome' && (
            <button
              type="button"
              className="tab__close"
              onClick={e => { e.stopPropagation(); onTabClose(tab.id); }}
              aria-label="Fermer"
            >×</button>
          )}
        </div>
      ))}
    </div>
  );
}
