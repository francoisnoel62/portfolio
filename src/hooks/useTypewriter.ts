import { useEffect } from 'react';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, reduce ? 0 : ms));
}

export function useTypewriter(
  ref: React.RefObject<HTMLElement | null>,
  text: string,
  gen: number,
  speed = 13,
  onDone?: () => void
) {
  useEffect(() => {
    if (!ref.current) return;
    let cancelled = false;
    const node = ref.current;

    if (reduce) {
      node.textContent = text;
      onDone?.();
      return;
    }

    node.classList.add('cursor');

    async function run() {
      for (let i = 0; i < text.length; i++) {
        if (cancelled) {
          node.classList.remove('cursor');
          return;
        }
        node.textContent = text.slice(0, i + 1);
        await sleep(speed);
      }
      node.classList.remove('cursor');
      onDone?.();
    }

    run();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, gen]);
}
