interface ToolLineData {
  fn: string;
  arg: string;
  res?: string;
}

interface ToolLineProps {
  tool: ToolLineData;
  running: boolean;
}

export function ToolLine({ tool, running }: ToolLineProps) {
  return (
    <div className="tool">
      <span className="gear">⚙</span>
      <span className="fn">{tool.fn}</span>
      <span className="arg">{tool.arg}</span>
      {running
        ? <span className="spin">⟳ running</span>
        : <span className="res">✓ {tool.res}</span>
      }
    </div>
  );
}

export type { ToolLineData };
