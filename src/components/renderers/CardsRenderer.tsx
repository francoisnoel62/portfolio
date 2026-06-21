import { useRef } from 'react';
import { useStagger } from '../../hooks/useStagger';

interface CardData {
  lead?: boolean;
  t: string;
  when: string;
  d: string;
  tags?: string[];
  proof?: string[];
  link?: string;
  linkTxt?: string;
}

type NoteData = [string, string, string];

export function CardsRenderer({ data, type, gen }: { data: CardData[] | NoteData[]; type: string; gen: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useStagger(ref as React.RefObject<HTMLElement>, '.pcard', gen);

  if (type === 'notes') {
    const notes = data as NoteData[];
    return (
      <div ref={ref}>
        <div className="cards">
          {notes.map((n, i) => (
            <div key={i} className="pcard">
              <div className="pcard__top">
                <span className="pcard__when" style={{ color: 'var(--cyan)' }}>{n[0]}</span>
              </div>
              <div className="pcard__t" style={{ marginTop: '6px' }}>{n[1]}</div>
              <div className="pcard__d">{n[2]}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const cards = data as CardData[];
  return (
    <div ref={ref}>
      <div className="cards">
        {cards.map((p, i) => (
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
          </div>
        ))}
      </div>
    </div>
  );
}
