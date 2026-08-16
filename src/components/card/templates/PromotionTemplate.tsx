import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import type { CardProps } from "@/interfaces/card.interface";
import { cn } from "@/lib/classname.utils";

function PromotionDescription({ description }: { description: string }) {
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
        className="pointer-events-none absolute bottom-3 right-3 h-24 w-24 text-blue-400/20"
        strokeWidth={1.4}
      />

      <div className="relative z-10 border-b border-white/20 pb-3">
        <span className="text-base font-bold uppercase sm:text-lg">{title}</span>
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
