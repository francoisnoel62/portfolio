import { useState } from 'react';

type FileNode = {
  name: string;
  type: 'folder' | 'file';
  ext?: string;
  children?: FileNode[];
};

const TREE: FileNode = {
  name: 'portfolio',
  type: 'folder',
  children: [
    { name: '.agents', type: 'folder', children: [] },
    { name: '.claude', type: 'folder', children: [] },
    { name: '.vite', type: 'folder', children: [] },
    { name: 'assets', type: 'folder', children: [] },
    { name: 'dist', type: 'folder', children: [] },
    { name: 'node_modules', type: 'folder', children: [] },
    { name: 'public', type: 'folder', children: [] },
    { name: 'scripts', type: 'folder', children: [] },
    {
      name: 'src',
      type: 'folder',
      children: [
        {
          name: 'components',
          type: 'folder',
          children: [
            {
              name: 'panel',
              type: 'folder',
              children: [
                { name: 'AgentMessage.tsx', type: 'file', ext: 'tsx' },
                { name: 'ChapterViewer.tsx', type: 'file', ext: 'tsx' },
                { name: 'FallbackMessage.tsx', type: 'file', ext: 'tsx' },
                { name: 'Log.tsx', type: 'file', ext: 'tsx' },
                { name: 'ToolLine.tsx', type: 'file', ext: 'tsx' },
                { name: 'UserMessage.tsx', type: 'file', ext: 'tsx' },
                { name: 'WelcomeMessage.tsx', type: 'file', ext: 'tsx' },
              ],
            },
            {
              name: 'renderers',
              type: 'folder',
              children: [
                { name: 'BookRenderer.tsx', type: 'file', ext: 'tsx' },
                { name: 'CardsRenderer.tsx', type: 'file', ext: 'tsx' },
                { name: 'ContactRenderer.tsx', type: 'file', ext: 'tsx' },
                { name: 'ProfileRenderer.tsx', type: 'file', ext: 'tsx' },
                { name: 'StackRenderer.tsx', type: 'file', ext: 'tsx' },
                { name: 'TimelineRenderer.tsx', type: 'file', ext: 'tsx' },
              ],
            },
            {
              name: 'shell',
              type: 'folder',
              children: [
                { name: 'Dock.tsx', type: 'file', ext: 'tsx' },
                { name: 'FileTreePanel.tsx', type: 'file', ext: 'tsx' },
                { name: 'Sidebar.tsx', type: 'file', ext: 'tsx' },
                { name: 'StatusBar.tsx', type: 'file', ext: 'tsx' },
                { name: 'Tabs.tsx', type: 'file', ext: 'tsx' },
                { name: 'TitleBar.tsx', type: 'file', ext: 'tsx' },
              ],
            },
            { name: 'EmailGateModal.tsx', type: 'file', ext: 'tsx' },
          ],
        },
        {
          name: 'context',
          type: 'folder',
          children: [{ name: 'LangContext.tsx', type: 'file', ext: 'tsx' }],
        },
        {
          name: 'data',
          type: 'folder',
          children: [
            { name: 'agents.ts', type: 'file', ext: 'ts' },
            { name: 'book-chapters.ts', type: 'file', ext: 'ts' },
            { name: 'ui-strings.ts', type: 'file', ext: 'ts' },
          ],
        },
        {
          name: 'hooks',
          type: 'folder',
          children: [
            { name: 'useStagger.ts', type: 'file', ext: 'ts' },
            { name: 'useTypewriter.ts', type: 'file', ext: 'ts' },
          ],
        },
        {
          name: 'styles',
          type: 'folder',
          children: [{ name: 'global.css', type: 'file', ext: 'css' }],
        },
        {
          name: 'utils',
          type: 'folder',
          children: [{ name: 'route.ts', type: 'file', ext: 'ts' }],
        },
        { name: 'App.tsx', type: 'file', ext: 'tsx' },
        { name: 'main.tsx', type: 'file', ext: 'tsx' },
        { name: 'types.ts', type: 'file', ext: 'ts' },
        { name: 'vite-env.d.ts', type: 'file', ext: 'ts' },
      ],
    },
    { name: '.gitignore', type: 'file', ext: 'gitignore' },
    { name: 'index.html', type: 'file', ext: 'html' },
    { name: 'package-lock.json', type: 'file', ext: 'json' },
    { name: 'package.json', type: 'file', ext: 'json' },
    { name: 'tsconfig.app.json', type: 'file', ext: 'json' },
    { name: 'tsconfig.json', type: 'file', ext: 'json' },
    { name: 'tsconfig.node.json', type: 'file', ext: 'json' },
    { name: 'vercel.json', type: 'file', ext: 'json' },
    { name: 'vite.config.ts', type: 'file', ext: 'vite' },
  ],
};

function FileIcon({ ext }: { ext?: string }) {
  switch (ext) {
    case 'ts':        return <i className="ft-icon ft-icon--ts">ts</i>;
    case 'tsx':       return <i className="ft-icon ft-icon--tsx">tsx</i>;
    case 'json':      return <i className="ft-icon ft-icon--json">{'{}'}</i>;
    case 'html':      return <i className="ft-icon ft-icon--html">{'<>'}</i>;
    case 'css':       return <i className="ft-icon ft-icon--css">{'{}'}</i>;
    case 'gitignore': return <i className="ft-icon ft-icon--git">◆</i>;
    case 'vite':      return <i className="ft-icon ft-icon--vite">⚡</i>;
    default:          return <i className="ft-icon ft-icon--def">·</i>;
  }
}

function TreeNode({ node, depth, defaultOpen = false }: {
  node: FileNode;
  depth: number;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const pl = depth * 12 + 4;

  if (node.type === 'folder') {
    const hasChildren = !!node.children?.length;
    return (
      <>
        <div
          className="ft-row ft-folder-row"
          style={{ paddingLeft: pl }}
          onClick={() => hasChildren && setOpen(o => !o)}
        >
          <span className="ft-chevron">{hasChildren ? (open ? '▾' : '▸') : ''}</span>
          <span className={`ft-name${depth === 0 ? ' ft-name--root' : ''}`}>{node.name}</span>
        </div>
        {open && node.children?.map(child => (
          <TreeNode
            key={child.name}
            node={child}
            depth={depth + 1}
            defaultOpen={depth === 0 && child.name === 'src'}
          />
        ))}
      </>
    );
  }

  return (
    <div className="ft-row" style={{ paddingLeft: pl + 16 }}>
      <FileIcon ext={node.ext} />
      <span className="ft-name">{node.name}</span>
    </div>
  );
}

export function FileTreePanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="ft-backdrop" onClick={onClose} />
      <div className="ft-panel">
        <div className="ft-tabs">
          <span className="ft-tab">Changes</span>
          <span className="ft-tab active">Files</span>
          <div className="ft-tab-icons">
            <span>⌕</span>
            <span>⊞</span>
          </div>
        </div>
        <div className="ft-tree">
          <TreeNode node={TREE} depth={0} defaultOpen />
        </div>
      </div>
    </>
  );
}
