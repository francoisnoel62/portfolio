import type { AgentMessageData } from './components/panel/AgentMessage';
import type { BookChapter } from './data/book-chapters';

export type MessageData =
  | { kind: 'welcome'; id: string; gen: number }
  | { kind: 'user'; id: string; text: string }
  | ({ kind: 'agent'; id: string } & AgentMessageData)
  | { kind: 'fallback'; id: string; userText: string; gen: number }
  | { kind: 'system-tool'; id: string; fn: string; arg: string; res: string }
  | { kind: 'chapter'; id: string; chapter: BookChapter };
