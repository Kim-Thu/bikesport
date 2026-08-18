interface PercentHighlightTextProps {
  text: string;
}

export function PercentHighlightText({ text }: PercentHighlightTextProps) {
  const match = text.match(/^(.*?)(\d+%)(.*)$/);

  if (!match) {
    return <span className="text-sm font-medium text-white sm:text-base">{text}</span>;
  }

  const [, before, highlight, after] = match;

  return (
    <span className="text-sm font-medium text-white sm:text-base">
      {before}
      <strong className="text-xl font-black sm:text-2xl">{highlight}</strong>
      {after}
    </span>
  );
}
