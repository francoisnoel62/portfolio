import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { BookChapter } from '../../data/book-chapters';
import type { Components } from 'react-markdown';

SyntaxHighlighter.registerLanguage('python', python);

const components: Components = {
  code({ className, children }) {
    const match = /language-(\w+)/.exec(className || '');
    if (match) {
      return (
        <SyntaxHighlighter
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          style={vscDarkPlus as any}
          language={match[1]}
          PreTag="div"
          customStyle={{ margin: '14px 0', borderRadius: '8px', border: '1px solid var(--border)' }}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      );
    }
    return <code className={className}>{children}</code>;
  },
};

export function ChapterViewer({ chapter }: { chapter: BookChapter }) {
  return (
    <article className="chapter-viewer">
      <div className="chapter-viewer__body">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {chapter.md}
        </ReactMarkdown>
      </div>
    </article>
  );
}
