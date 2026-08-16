import { Countdown } from "@/components/countdown/Countdown";
import { Heading } from "@/components/heading/Heading";
import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import type { SectionHeaderProps } from "@/interfaces/section-header.interface";
import { cn } from "@/lib/classname.utils";

export function FlashSaleTemplate({
  title,
  href,
  actionLabel = "Xem tất cả",
  countdownAt,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-4 rounded-lg bg-red-500 p-4", className)}>
      <div className="flex shrink-0 items-center gap-2 text-white">
        <Icon name="flame" className="h-6 w-6" strokeWidth={2} />
        <Heading level={2} className="text-lg font-bold uppercase sm:text-xl">
          {title}
        </Heading>
      </div>

      {countdownAt ? (
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase text-white">Kết thúc sau</span>
          <Countdown endAt={countdownAt} />
        </div>
      ) : (
        <div className="flex-1" />
      )}

      {href ? (
        <CLink
          href={href}
          className="inline-flex shrink-0 items-center gap-1 rounded-md bg-white px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 sm:text-sm"
        >
          <span>{actionLabel}</span>
          <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2} />
        </CLink>
      ) : null}
    </div>
  );
}
