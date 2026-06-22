import { useRef } from 'react';
import { ToolLine } from './ToolLine';
import { ProfileRenderer } from '../renderers/ProfileRenderer';
import { BookRenderer } from '../renderers/BookRenderer';
import { TimelineRenderer } from '../renderers/TimelineRenderer';
import { CardsRenderer } from '../renderers/CardsRenderer';
import { StackRenderer } from '../renderers/StackRenderer';
import { ContactRenderer } from '../renderers/ContactRenderer';
import { useTypewriter } from '../../hooks/useTypewriter';
import type { BookChapter } from '../../data/book-chapters';

export interface AgentMessageData {
  kind: 'agent';
  agentId: string;
  badge: string;
  name: string;
  role: string;
  color?: string;
  tool: { fn: string; arg: string; res: string };
  intro: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  status: 'running' | 'done';
  gen: number;
}

interface AgentMessageProps {
  message: AgentMessageData;
  onChapterClick: (chapter: BookChapter) => void;
}

function IntroText({ text, gen }: { text: string; gen: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useTypewriter(ref as React.RefObject<HTMLElement>, text, gen, 12);
  return <p className="prose" ref={ref} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RendererSwitch({ type, data, gen, onChapterClick }: { type: string; data: any; gen: number; onChapterClick: (chapter: BookChapter) => void }) {
  if (type === 'profile') return <ProfileRenderer data={data} gen={gen} />;
  if (type === 'book') return <BookRenderer data={data} gen={gen} onChapterClick={onChapterClick} />;
  if (type === 'timeline') return <TimelineRenderer data={data} gen={gen} />;
  if (type === 'cards' || type === 'notes') return <CardsRenderer data={data} type={type} gen={gen} />;
  if (type === 'stack') return <StackRenderer data={data} gen={gen} />;
  if (type === 'contact') return <ContactRenderer data={data} gen={gen} />;
  return null;
}

export function AgentMessage({ message, onChapterClick }: AgentMessageProps) {
  const colorStyle = message.color ? { color: message.color } : undefined;

  return (
    <div className="msg">
      <div className="ag">
        <div className="ag__head">
          <span className="ag__badge" style={colorStyle}>{message.badge}</span>
          <span className="ag__name" style={colorStyle}>{message.name}</span>
          <span className="ag__role">{message.role}</span>
        </div>
        <ToolLine tool={message.tool} running={message.status === 'running'} />
        {message.status === 'done' && (
          <>
            <IntroText text={message.intro} gen={message.gen} />
            <RendererSwitch type={message.type} data={message.data} gen={message.gen} onChapterClick={onChapterClick} />
          </>
        )}
      </div>
    </div>
  );
}
