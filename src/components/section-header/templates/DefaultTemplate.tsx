import { Heading } from "@/components/heading/Heading";
import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import type { SectionHeaderProps } from "@/interfaces/section-header.interface";
import { cn } from "@/lib/classname.utils";

export function DefaultTemplate({
  title,
  href,
  actionLabel = "Xem tất cả",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <Heading level={2} className="text-base font-bold uppercase text-gray-900 sm:text-lg">
        {title}
      </Heading>

      {href ? (
        <CLink
          href={href}
          className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 sm:text-sm"
        >
          <span>{actionLabel}</span>
          <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2} />
        </CLink>
      ) : null}
    </div>
  );
}
