import type { AgentId } from '../../data/agents';

export interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabClick: (id: AgentId | 'welcome') => void;
}

export function Tabs({ tabs, activeTab, onTabClick }: TabsProps) {
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
        </div>
      ))}
    </div>
  );
}
