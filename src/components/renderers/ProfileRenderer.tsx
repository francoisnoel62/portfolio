import { useRef } from 'react';
import { useStagger } from '../../hooks/useStagger';

interface Metric { 0: string; 1: string }
interface Signal { k: string; t: string; d: string }

interface ProfileData {
  metrics: [string, string][];
  signals: Signal[];
  cta1: string;
  cta2: string;
}

export function ProfileRenderer({ data, gen, onContactClick }: { data: ProfileData; gen: number; onContactClick?: () => void }) {
  const metricsRef = useRef<HTMLDivElement>(null);
  const signalsRef = useRef<HTMLDivElement>(null);

  useStagger(metricsRef as React.RefObject<HTMLElement>, '.metric', gen, () => {
    if (!signalsRef.current) return;
    const nodes = signalsRef.current.querySelectorAll('.signal');
    let i = 0;
    function next() {
      if (i >= nodes.length) return;
      nodes[i].classList.add('in');
      i++;
      setTimeout(next, 90);
    }
    next();
  });

  return (
    <>
      <div className="metrics" ref={metricsRef}>
        {data.metrics.map((m: Metric, i: number) => (
          <div key={i} className="metric">
            <div className="metric__v">{m[0]}</div>
            <div className="metric__l">{m[1]}</div>
          </div>
        ))}
      </div>
      <div className="signals" ref={signalsRef}>
        {data.signals.map((s: Signal, i: number) => (
          <div key={i} className="signal">
            <div className="signal__k">{s.k}</div>
            <div className="signal__t">{s.t}</div>
            <div className="signal__d">{s.d}</div>
          </div>
        ))}
      </div>
      <div className="cbtns" style={{ marginTop: '14px' }}>
        <button className="cbtn cbtn--solid" onClick={onContactClick}>{data.cta1}</button>
        <a className="cbtn" href="/assets/cv-francois-noel.pdf" target="_blank" rel="noopener">{data.cta2} ↗</a>
      </div>
    </>
  );
}
