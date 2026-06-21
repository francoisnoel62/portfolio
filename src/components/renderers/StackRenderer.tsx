import { useRef } from 'react';
import { useStagger } from '../../hooks/useStagger';

interface StackCol {
  cls: string;
  h: string;
  d: string;
  items: string[];
}

export function StackRenderer({ data, gen }: { data: StackCol[]; gen: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useStagger(ref as React.RefObject<HTMLElement>, '.scol', gen);

  return (
    <div ref={ref}>
      <div className="scols">
        {data.map((col, i) => (
          <div key={i} className={`scol ${col.cls}`}>
            <div className="scol__h"><i />{col.h}</div>
            <div className="scol__d">{col.d}</div>
            <div className="tags">
              {col.items.map(item => (
                <span key={item} className="tag">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
