import { useRef, useState } from 'react';
import { useStagger } from '../../hooks/useStagger';
import type { BookChapter } from '../../data/book-chapters';
import { EmailGateModal } from '../EmailGateModal';

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
  const [showModal, setShowModal] = useState(false);

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
            <button
              className="cbtn cbtn--solid"
              type="button"
              onClick={() => setShowModal(true)}
            >
              {data.cta1}
            </button>
            <a
              className="cbtn"
              href={`https://mail.google.com/mail/?view=cm&to=francoisnoel62@gmail.com&su=${data.mailtoSubj}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.cta2}
            </a>
          </div>
        </div>
      </div>
      {showModal && <EmailGateModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
