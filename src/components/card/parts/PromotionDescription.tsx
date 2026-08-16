interface PromotionDescriptionProps {
  description: string;
}

export function PromotionDescription({ description }: PromotionDescriptionProps) {
  const match = description.match(/^(.*?)(\d+%)(.*)$/);

  if (!match) {
    return <span className="text-sm font-medium text-white sm:text-base">{description}</span>;
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
