import { Heading } from "@/components/heading/Heading";
import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import type { SectionHeaderAlign, SectionHeaderProps } from "@/interfaces/section-header.interface";
import { cn } from "@/lib/classname.utils";

const ALIGN_CLASS: Record<SectionHeaderAlign, { root: string; title: string; spacer: string }> = {
  left: {
    root: "",
    title: "",
    spacer: "",
  },
  center: {
    root: "justify-center text-center",
    title: "mx-auto text-center",
    spacer: "hidden",
  },
  right: {
    root: "justify-end text-right",
    title: "ml-auto text-right",
    spacer: "hidden",
  },
};

export function DefaultTemplate({
  title,
  href,
  actionLabel = "Xem tất cả",
  align = "left",
  className,
  children,
}: SectionHeaderProps) {
  const alignment = ALIGN_CLASS[align];

  return (
    <div className={cn("flex flex-wrap items-center gap-x-6 gap-y-2", alignment.root, className)}>
      <Heading
        level={2}
        className={cn(
          "min-w-0 flex-1 text-lg font-bold uppercase leading-tight text-gray-900 sm:flex-none sm:shrink-0 sm:text-xl lg:text-2xl",
          alignment.title,
        )}
      >
        {title}
      </Heading>

      {children ? (
        <div className="order-3 min-w-0 basis-full sm:order-none sm:flex-1 sm:basis-auto">{children}</div>
      ) : (
        <div className={cn("hidden flex-1 sm:block", alignment.spacer)} />
      )}

      {href ? (
        <CLink
          href={href}
          className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-700 sm:text-sm"
        >
          <span>{actionLabel}</span>
          <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2} />
        </CLink>
      ) : null}
    </div>
  );
}
