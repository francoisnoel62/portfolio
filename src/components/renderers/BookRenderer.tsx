import { useRef } from 'react';
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

export function BookRenderer({ data, gen, onChapterClick }: { data: BookData; gen: number; onChapterClick: (chapter: BookChapter) => void }) {
  const bookRef = useRef<HTMLDivElement>(null);

  useStagger(bookRef as React.RefObject<HTMLElement>, '.book', gen);

  return (
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
            {data.six.map((s, i) => {
              const chapter = data.chapters?.[i];
              if (i < 3 && chapter) {
                return (
                  <button
                    key={i}
                    type="button"
                    className="book__six-btn"
                    onClick={() => onChapterClick(chapter)}
                    dangerouslySetInnerHTML={{ __html: s }}
                  />
                );
              }
              return <div key={i} dangerouslySetInnerHTML={{ __html: s }} />;
            })}
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
  );
}
