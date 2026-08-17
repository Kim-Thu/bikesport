import { Countdown } from "@/components/countdown/Countdown";
import { Heading } from "@/components/heading/Heading";
import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import { MediaImage } from "@/components/media/MediaImage";
import type { SectionHeaderProps } from "@/interfaces/section-header.interface";
import { cn } from "@/lib/classname.utils";

export function FlashSaleTemplate({
  title,
  titleMediaId,
  titleAlt,
  href,
  actionLabel = "Xem tất cả",
  countdownAt,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3 rounded-lg bg-red-500 p-4 text-center", className)}>
      <div className="flex min-w-0 items-center justify-center gap-2 text-white">
        {titleMediaId !== undefined ? (
          <MediaImage
            mediaId={titleMediaId}
            alt={titleAlt ?? title ?? "Flash Sale"}
            width={240}
            height={64}
            className="max-h-12 w-auto object-contain"
          />
        ) : (
          <>
            <Icon name="flame" className="h-6 w-6 shrink-0" strokeWidth={2} />
            {title ? (
              <Heading level={2} className="min-w-0 text-base font-bold uppercase sm:text-xl">
                {title}
              </Heading>
            ) : null}
          </>
        )}
      </div>

      {countdownAt ? (
        <div className="flex min-w-0 flex-wrap items-center justify-center gap-3">
          <span className="text-xs font-semibold uppercase text-white">Kết thúc sau</span>
          <Countdown endAt={countdownAt} variant="responsive" />
        </div>
      ) : null}

      {href ? (
        <CLink
          href={href}
          className="inline-flex w-fit items-center gap-1 rounded-md bg-white px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 sm:text-sm"
        >
          <span>{actionLabel}</span>
          <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2} />
        </CLink>
      ) : null}
    </div>
  );
}
