import { useRef } from 'react';
import { useStagger } from '../../hooks/useStagger';

type TimelineEntry = [string, string, string];

export function TimelineRenderer({ data, gen }: { data: TimelineEntry[]; gen: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useStagger(ref as React.RefObject<HTMLElement>, '.tl__row', gen);

  return (
    <div ref={ref}>
      <div className="tl">
        {data.map((row, i) => (
          <div key={i} className="tl__row">
            <div className="tl__yr">{row[0]}</div>
            <div>
              <div className="tl__t">{row[1]}</div>
              <div className="tl__d">{row[2]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
