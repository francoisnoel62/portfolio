import { useCallback, useEffect, useRef, useState } from 'react';
import { useLang } from './context/LangContext';
import { UI } from './data/ui-strings';
import type { Lang } from './data/ui-strings';
import { DATA, AGENT_ORDER, type AgentId } from './data/agents';
import { route, escapeHtml } from './utils/route';
import { sleep } from './hooks/useTypewriter';
import type { MessageData } from './types';

import { TitleBar } from './components/shell/TitleBar';
import { Tabs, type Tab } from './components/shell/Tabs';
import { Sidebar } from './components/shell/Sidebar';
import { Dock } from './components/shell/Dock';
import { StatusBar } from './components/shell/StatusBar';
import { Log } from './components/panel/Log';

let msgCounter = 0;
function nextId() { return String(++msgCounter); }

export default function App() {
  const { lang, setLang } = useLang();
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [tabs, setTabs] = useState<Tab[]>([{ id: 'welcome', label: 'welcome' }]);
  const [activeTab, setActiveTab] = useState<string>('welcome');
  const [activeAgent, setActiveAgent] = useState<AgentId | null>(null);
  const [busyAgent, setBusyAgent] = useState<AgentId | null>(null);
  const [running, setRunning] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [sidebarKey, setSidebarKey] = useState(0);
  const [agentsOnline, setAgentsOnline] = useState(0);

  const genRef = useRef(0);
  const chainRef = useRef<Promise<void>>(Promise.resolve());
  const langRef = useRef(lang);
  const runningRef = useRef(false);
  const autoBriefRef = useRef(true);

  useEffect(() => { langRef.current = lang; }, [lang]);
  useEffect(() => { runningRef.current = running; }, [running]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function appendMsg(msg: MessageData) {
    setMessages(prev => [...prev, msg]);
  }

  function updateMsg(id: string, patch: Record<string, unknown>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setMessages(prev => prev.map(m => m.id === id ? { ...m, ...patch } as any : m));
  }

  function activateTab(id: AgentId, label: string) {
    setTabs(prev => {
      if (prev.some(t => t.id === id)) return prev;
      return [...prev, { id, label }];
    });
    setActiveTab(id);
  }

  const runAgent = useCallback(async (id: AgentId) => {
    const g = genRef.current;
    const a = DATA[langRef.current][id];
    if (!a) return;

    setRunning(true);
    setBusyAgent(id);
    setActiveAgent(id);
    activateTab(id, a.tab);

    const userId = nextId();
    appendMsg({
      kind: 'user',
      id: userId,
      text: `${UI[langRef.current].runVerb} ${a.name}`,
    });

    await sleep(180);
    if (g !== genRef.current) { setRunning(false); setBusyAgent(null); setActiveAgent(null); return; }

    const agentMsgId = nextId();
    appendMsg({
      kind: 'agent',
      id: agentMsgId,
      agentId: id,
      badge: a.badge,
      name: a.name,
      role: a.role,
      color: a.color,
      tool: a.tool,
      intro: a.intro,
      type: a.type,
      data: a.data,
      status: 'running',
      gen: g,
    });

    await sleep(600);
    if (g !== genRef.current) { setRunning(false); setBusyAgent(null); setActiveAgent(null); return; }

    updateMsg(agentMsgId, { status: 'done' } as Partial<MessageData>);

    // Approximate time to let animations complete before next agent can run
    const delays: Record<string, number> = {
      profile: 2800, book: 3200, timeline: 2000,
      cards: 2200, notes: 2000, stack: 1800, contact: 1200,
    };
    await sleep(delays[a.type as string] ?? 1500);
    if (g !== genRef.current) return;

    setRunning(false);
    setBusyAgent(null);
    setActiveAgent(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trigger = useCallback((id: AgentId) => {
    if (!DATA[langRef.current][id]) return;
    chainRef.current = chainRef.current.then(() => runAgent(id));
  }, [runAgent]);

  const runWelcome = useCallback((switched: boolean) => {
    const g = genRef.current;
    if (switched) {
      const s = UI[langRef.current];
      appendMsg({
        kind: 'system-tool',
        id: nextId(),
        fn: 'set_language',
        arg: langRef.current,
        res: s.langName[langRef.current],
      });
    }
    chainRef.current = chainRef.current.then(async () => {
      await sleep(switched ? 160 : 480);
      if (g !== genRef.current) return;
      appendMsg({ kind: 'welcome', id: nextId(), gen: g });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initial welcome + auto-brief
  const didInit = useRef(false);
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    runWelcome(false);
    chainRef.current = chainRef.current.then(() => sleep(650)).then(() => {
      if (autoBriefRef.current) {
        autoBriefRef.current = false;
        trigger('profil');
      }
    });
  }, [runWelcome, trigger]);

  function doLangSwitch(newLang: Lang) {
    if (newLang === langRef.current || runningRef.current) return;
    genRef.current++;
    chainRef.current = Promise.resolve();
    setMessages([]);
    setTabs([{ id: 'welcome', label: 'welcome' }]);
    setActiveTab('welcome');
    setActiveAgent(null);
    setBusyAgent(null);
    setRunning(false);
    autoBriefRef.current = false;
    setSidebarKey(k => k + 1);
    langRef.current = newLang;
    setLang(newLang);
    runWelcome(true);
  }

  function handleTabClick(id: AgentId | 'welcome') {
    if (id === 'welcome') { setActiveTab('welcome'); return; }
    trigger(id);
  }

  function handleSubmit() {
    const v = inputValue.trim();
    if (!v) return;
    setInputValue('');

    const low = v.toLowerCase();
    if (low === '/en' || low === '/lang en' || low === 'english' || low === 'anglais') {
      doLangSwitch('en'); return;
    }
    if (low === '/fr' || low === '/lang fr' || low === 'français' || low === 'francais' || low === 'french') {
      doLangSwitch('fr'); return;
    }

    const r = route(v);
    if (r === 'clear') {
      genRef.current++;
      chainRef.current = Promise.resolve();
      setMessages([]);
      setTabs([{ id: 'welcome', label: 'welcome' }]);
      setActiveTab('welcome');
      setRunning(false);
      autoBriefRef.current = false;
      runWelcome(false);
      return;
    }
    if (r === 'help') { runWelcome(false); return; }
    if (r) {
      // runAgent will add the user message
      trigger(r);
    } else {
      const safeText = escapeHtml(v);
      const g = genRef.current;
      chainRef.current = chainRef.current.then(async () => {
        await sleep(160);
        if (g !== genRef.current) return;
        appendMsg({ kind: 'fallback', id: nextId(), userText: safeText, gen: g });
      });
    }
  }

  // Track agentsOnline count when sidebarKey changes
  useEffect(() => {
    setAgentsOnline(0);
    let count = 0;
    const total = AGENT_ORDER.length;
    const iv = setInterval(() => {
      count++;
      setAgentsOnline(count);
      if (count >= total) clearInterval(iv);
    }, 120);
    return () => clearInterval(iv);
  }, [sidebarKey]);

  return (
    <div className="app">
      <TitleBar />
      <Tabs tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
      <div className="shell">
        <Sidebar
          activeAgent={activeAgent}
          busyAgent={busyAgent}
          onAgentClick={trigger}
          sidebarKey={sidebarKey}
        />
        <main className="panel">
          <Log messages={messages} onChipClick={trigger} />
          <Dock
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSubmit}
            disabled={running}
          />
        </main>
      </div>
      <StatusBar agentsOnline={agentsOnline} isReady={!running} onLangChange={doLangSwitch} />
    </div>
  );
}
