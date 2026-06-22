import { useRef } from 'react';
import { useStagger } from '../../hooks/useStagger';
import { useLang } from '../../context/LangContext';
import { BOOK_CHAPTERS, type BookChapter } from '../../data/book-chapters';

interface CardData {
  lead?: boolean;
  t: string;
  when: string;
  d: string;
  tags?: string[];
  proof?: string[];
  link?: string;
  linkTxt?: string;
  chapter?: string;
}

type NoteData = [string, string, string, string?];

function findChapter(file?: string): BookChapter | undefined {
  if (!file) return undefined;
  return BOOK_CHAPTERS.find(c => c.file === file);
}

export function CardsRenderer({
  data,
  type,
  gen,
  onChapterClick,
}: {
  data: CardData[] | NoteData[];
  type: string;
  gen: number;
  onChapterClick?: (chapter: BookChapter) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { lang } = useLang();
  useStagger(ref as React.RefObject<HTMLElement>, '.pcard', gen);

  const readLabel = lang === 'fr' ? 'lire le cas ↗' : 'read the case ↗';

  if (type === 'notes') {
    const notes = data as NoteData[];
    return (
      <div ref={ref}>
        <div className="cards">
          {notes.map((n, i) => {
            const chapter = findChapter(n[3]);
            return (
              <div key={i} className="pcard">
                <div className="pcard__top">
                  <span className="pcard__when" style={{ color: 'var(--cyan)' }}>{n[0]}</span>
                </div>
                <div className="pcard__t" style={{ marginTop: '6px' }}>{n[1]}</div>
                <div className="pcard__d">{n[2]}</div>
                {chapter && onChapterClick && (
                  <button type="button" className="lnk" onClick={() => onChapterClick(chapter)}>
                    {lang === 'fr' ? 'lire le chapitre ↗' : 'read the chapter ↗'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const cards = data as CardData[];
  return (
    <div ref={ref}>
      <div className="cards">
        {cards.map((p, i) => {
          const chapter = findChapter(p.chapter);
          return (
            <div key={i} className={`pcard${p.lead ? ' pcard__lead' : ''}`}>
              <div className="pcard__top">
                <span className="pcard__t">{p.t}</span>
                <span className="pcard__when">{p.when}</span>
              </div>
              <div className="pcard__d">{p.d}</div>
              {p.tags && (
                <div className="tags">
                  {p.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
              )}
              {p.proof && (
                <div className="pcard__proof">
                  {p.proof.map(x => (
                    <span key={x} className="proof"><b>✓</b> {x}</span>
                  ))}
                </div>
              )}
              {p.link && (
                <a className="lnk" href={p.link} target="_blank" rel="noopener">
                  {p.linkTxt}
                </a>
              )}
              {!p.link && chapter && onChapterClick && (
                <button type="button" className="lnk" onClick={() => onChapterClick(chapter)}>
                  {p.linkTxt ?? readLabel}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
