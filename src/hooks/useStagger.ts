import { useEffect } from 'react';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useStagger(
  containerRef: React.RefObject<HTMLElement | null>,
  selector: string,
  gen: number,
  onDone?: () => void
) {
  useEffect(() => {
    if (!containerRef.current) return;
    const nodes = Array.from(containerRef.current.querySelectorAll<HTMLElement>(selector));
    let cancelled = false;
    let i = 0;

    function next() {
      if (cancelled || i >= nodes.length) { onDone?.(); return; }
      nodes[i].classList.add('in');
      i++;
      setTimeout(next, reduce ? 0 : 90);
    }

    next();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gen]);
}

export function staggerElements(nodes: Element[], onDone?: () => void): Promise<void> {
  return new Promise(resolve => {
    let i = 0;
    function next() {
      if (i >= nodes.length) { onDone?.(); resolve(); return; }
      nodes[i].classList.add('in');
      i++;
      setTimeout(next, reduce ? 0 : 90);
    }
    next();
  });
}
