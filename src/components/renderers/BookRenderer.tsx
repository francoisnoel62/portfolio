import { useRef, useState } from 'react';
import { useStagger } from '../../hooks/useStagger';
import type { BookChapter } from '../../data/book-chapters';

interface BookData {
  kicker: string;
  title: string;
  sub: string;
  meta: string;
  lead: string;
  six: string[];
  note: string;
  cta1: string;
  cta2: string;
  mailtoSubj: string;
  chapters: BookChapter[];
}

function lineClass(line: string): string {
  if (/^# /.test(line)) return 'h1';
  if (/^## /.test(line)) return 'h2';
  if (/^(def |class |if |for |while |return |const |let |var |```|    )/.test(line)) return 'code';
  return '';
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] ?? c));
}

function MdReader({ chapters }: { chapters: BookChapter[] }) {
  const [active, setActive] = useState(0);
  const chapter = chapters[active];

  const lines = chapter.md.split('\n');

  return (
    <div className="mdreader">
      <div className="mdreader__bar">
        <span>~/book/from-demo-to-production</span>
        <div className="mdreader__tabs">
          {chapters.map((ch, i) => (
            <button
              key={i}
              className={`mdtab${i === active ? ' on' : ''}`}
              type="button"
              onClick={() => setActive(i)}
            >
              {ch.file}
            </button>
          ))}
        </div>
      </div>
      <div className="mdreader__body">
        <div className="mdreader__tree">
          <div className="mdreader__folder">▸ chapters</div>
          {chapters.map((ch, i) => (
            <button
              key={i}
              className={`mdfile${i === active ? ' on' : ''}`}
              type="button"
              onClick={() => setActive(i)}
            >
              ▸ {ch.file}
            </button>
          ))}
        </div>
        <div className="mdcode">
          {lines.map((line, idx) => (
            <div key={idx} className="mdline">
              <span className="mdln">{String(idx + 1).padStart(3, ' ')}</span>
              <span
                className={`mdtxt ${lineClass(line)}`}
                dangerouslySetInnerHTML={{ __html: escapeHtml(line) || ' ' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BookRenderer({ data, gen }: { data: BookData; gen: number }) {
  const bookRef = useRef<HTMLDivElement>(null);
  const readerRef = useRef<HTMLDivElement>(null);

  useStagger(bookRef as React.RefObject<HTMLElement>, '.book', gen, () => {
    if (!readerRef.current) return;
    const node = readerRef.current.querySelector('.mdreader');
    if (node) {
      setTimeout(() => node.classList.add('in'), 90);
    }
  });

  return (
    <>
      <div ref={bookRef}>
        <div className="book">
          <div className="book__cover">
            <div className="book__kicker">{data.kicker}</div>
            <div
              className="book__title"
              dangerouslySetInnerHTML={{ __html: data.title }}
            />
            <div className="book__sub">{data.sub}</div>
            <div className="book__meta">{data.meta}</div>
          </div>
          <div>
            <p className="book__lead">{data.lead}</p>
            <div className="book__six">
              {data.six.map((s, i) => (
                <div key={i} dangerouslySetInnerHTML={{ __html: s }} />
              ))}
            </div>
            <p className="note">{data.note}</p>
            <div className="cbtns" style={{ marginTop: '14px' }}>
              <a
                className="cbtn cbtn--solid"
                href={`mailto:francoisnoel62@gmail.com?subject=${data.mailtoSubj}`}
              >
                {data.cta1}
              </a>
            </div>
          </div>
        </div>
      </div>
      {data.chapters && data.chapters.length > 0 && (
        <div ref={readerRef}>
          <MdReader chapters={data.chapters} />
        </div>
      )}
    </>
  );
}
