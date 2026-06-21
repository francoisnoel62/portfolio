import { useMemo } from 'react';
import type { BookChapter } from '../../data/book-chapters';

function escHtml(s: string): string {
  return s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c] ?? c));
}

function inlineFmt(s: string): string {
  return escHtml(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function mdToHtml(md: string): string {
  const lines = md.split('\n');
  const out: string[] = [];
  let inUl = false;
  let inCode = false;
  const codeLines: string[] = [];

  for (const line of lines) {
    if (line.startsWith('```')) {
      if (!inCode) {
        inCode = true;
        codeLines.length = 0;
      } else {
        inCode = false;
        out.push(`<pre><code>${escHtml(codeLines.join('\n'))}</code></pre>`);
      }
      continue;
    }
    if (inCode) { codeLines.push(line); continue; }

    if (line.startsWith('### ')) {
      if (inUl) { out.push('</ul>'); inUl = false; }
      out.push(`<h3>${inlineFmt(line.slice(4))}</h3>`);
    } else if (line.startsWith('## ')) {
      if (inUl) { out.push('</ul>'); inUl = false; }
      out.push(`<h2>${inlineFmt(line.slice(3))}</h2>`);
    } else if (line.startsWith('# ')) {
      if (inUl) { out.push('</ul>'); inUl = false; }
      out.push(`<h1>${inlineFmt(line.slice(2))}</h1>`);
    } else if (/^[-*] /.test(line)) {
      if (!inUl) { out.push('<ul>'); inUl = true; }
      out.push(`<li>${inlineFmt(line.slice(2))}</li>`);
    } else if (line.trim() === '') {
      if (inUl) { out.push('</ul>'); inUl = false; }
    } else {
      if (inUl) { out.push('</ul>'); inUl = false; }
      out.push(`<p>${inlineFmt(line)}</p>`);
    }
  }
  if (inUl) out.push('</ul>');
  return out.join('\n');
}

export function ChapterViewer({ chapter }: { chapter: BookChapter }) {
  const html = useMemo(() => mdToHtml(chapter.md), [chapter.md]);
  return (
    <article className="chapter-viewer">
      <div className="chapter-viewer__body" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
