export interface BookChapter {
  file: string;
  title: string;
  md: string;
}

const rawFiles = import.meta.glob('../content/book/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): { titre: string; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { titre: '', content: raw };
  const titre = match[1].match(/^titre:\s*"(.+?)"/m)?.[1] ?? '';
  return { titre, content: match[2] };
}

function sortKey(filename: string): string {
  if (filename.startsWith('intro')) return '000_000';
  if (filename.startsWith('conclusion')) return '999_999';
  const m = filename.match(/^(\d+)\.(\d+)/);
  if (m) return `${m[1].padStart(3, '0')}_${m[2].padStart(3, '0')}`;
  return '500_000';
}

export const BOOK_CHAPTERS: BookChapter[] = Object.entries(rawFiles)
  .sort(([a], [b]) => {
    const fa = a.split('/').pop()!;
    const fb = b.split('/').pop()!;
    return sortKey(fa).localeCompare(sortKey(fb));
  })
  .map(([path, raw]) => {
    const file = path.split('/').pop()!;
    const { titre, content } = parseFrontmatter(raw);
    return { file, title: titre || file, md: content };
  });
