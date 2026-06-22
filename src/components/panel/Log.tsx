import { useEffect, useRef } from 'react';
import type { MessageData } from '../../types';
import { AgentMessage } from './AgentMessage';
import { WelcomeMessage } from './WelcomeMessage';
import { FallbackMessage } from './FallbackMessage';
import { UserMessage } from './UserMessage';
import { ChapterViewer } from './ChapterViewer';
import type { AgentId } from '../../data/agents';
import type { BookChapter } from '../../data/book-chapters';

interface ToolLineSystemData {
  kind: 'system-tool';
  fn: string;
  arg: string;
  res: string;
  id: string;
}

interface LogProps {
  messages: MessageData[];
  onChipClick: (id: AgentId) => void;
  onAgentClick: (id: AgentId) => void;
  onChapterClick: (chapter: BookChapter) => void;
  scrollTopKey: number;
}

export function Log({ messages, onChipClick, onAgentClick, onChapterClick, scrollTopKey }: LogProps) {
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = 0;
  }, [scrollTopKey]);

  return (
    <div className="log" ref={logRef}>
      <div className="log__inner">
        {messages.map(msg => {
          if (msg.kind === 'welcome') {
            return <WelcomeMessage key={msg.id} gen={msg.gen} onChipClick={onChipClick} />;
          }
          if (msg.kind === 'user') {
            return <UserMessage key={msg.id} text={msg.text} />;
          }
          if (msg.kind === 'agent') {
            return <AgentMessage key={msg.id} message={msg} onChapterClick={onChapterClick} onAgentClick={onAgentClick} />;
          }
          if (msg.kind === 'fallback') {
            return (
              <FallbackMessage
                key={msg.id}
                userText={msg.userText}
                gen={msg.gen}
                onChipClick={onChipClick}
              />
            );
          }
          if (msg.kind === 'chapter') {
            return <ChapterViewer key={msg.id} chapter={msg.chapter} />;
          }
          if (msg.kind === 'system-tool') {
            const m = msg as ToolLineSystemData;
            return (
              <div key={m.id} className="tool" style={{ marginBottom: '12px' }}>
                <span className="gear">⚙</span>
                <span className="fn">{m.fn}</span>
                <span className="arg">{m.arg}</span>
                <span className="res">✓ {m.res}</span>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
