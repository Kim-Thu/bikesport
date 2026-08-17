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
  children,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-6 gap-y-2", className)}>
      <Heading level={2} className="min-w-0 flex-1 text-base font-bold uppercase text-gray-900 sm:flex-none sm:shrink-0 sm:text-lg">
        {title}
      </Heading>

      {children ? (
        <div className="order-3 min-w-0 basis-full sm:order-none sm:flex-1 sm:basis-auto">{children}</div>
      ) : (
        <div className="hidden flex-1 sm:block" />
      )}

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
