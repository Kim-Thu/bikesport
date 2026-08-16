import { CLink } from "@/components/link/CLink";
import type { CardProps } from "@/interfaces/card.interface";
import { cn } from "@/lib/classname.utils";

export function PromotionTemplate({ title, description, href, actionLabel = "Xem tất cả", className }: CardProps) {
  return (
    <CLink
      href={href}
      className={cn(
        "flex h-full min-h-56 flex-col rounded-lg bg-blue-600 p-5 text-white sm:p-6",
        className,
      )}
    >
      <span className="text-lg font-bold uppercase sm:text-xl">{title}</span>
      {description ? <span className="mt-5 text-sm font-medium">{description}</span> : null}
      <span className="mt-auto pt-6 text-xs font-semibold">{actionLabel} →</span>
    </CLink>
  );
}
