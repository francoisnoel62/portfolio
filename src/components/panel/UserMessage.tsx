interface UserMessageProps {
  text: string;
}

export function UserMessage({ text }: UserMessageProps) {
  return (
    <div className="msg user">
      <span className="caret">❯</span>
      <span className="cmd" dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}
