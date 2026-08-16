import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import type { CardProps } from "@/interfaces/card.interface";
import { cn } from "@/lib/classname.utils";

function PromotionDescription({ description }: { description: string }) {
  const match = description.match(/^(.*?)(\d+%)(.*)$/);

  if (!match) {
    return <span className="text-base font-semibold text-white sm:text-lg">{description}</span>;
  }

  const [, before, highlight, after] = match;

  return (
    <span className="text-base font-semibold text-white sm:text-lg">
      {before}
      <strong className="text-lg font-black sm:text-xl">{highlight}</strong>
      {after}
    </span>
  );
}

export function PromotionTemplate({ title, description, href, actionLabel = "Xem tất cả", className }: CardProps) {
  return (
    <CLink
      href={href}
      className={cn(
        "relative flex h-full min-h-56 flex-col overflow-hidden rounded-lg bg-blue-600 p-5 text-white sm:p-6",
        className,
      )}
    >
      <Icon
        name="badge-percent"
        className="pointer-events-none absolute bottom-3 right-3 h-24 w-24 text-blue-600/20"
        strokeWidth={1.4}
      />

      <div className="relative z-10 border-b border-blue-600/10 pb-4">
        <span className="text-xl font-bold uppercase sm:text-2xl">{title}</span>
      </div>

      {description ? (
        <div className="relative z-10 pt-4">
          <PromotionDescription description={description} />
        </div>
      ) : null}

      <span className="relative z-10 mt-auto pt-6 text-sm font-semibold">{actionLabel} →</span>
    </CLink>
  );
}
