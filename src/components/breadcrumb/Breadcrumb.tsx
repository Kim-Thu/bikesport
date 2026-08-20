import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import type { BreadcrumbProps } from "@/interfaces/breadcrumb.interface";
import { cn } from "@/lib/classname.utils";

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("flex flex-wrap items-center gap-4 text-sm text-gray-500", className)}>
      {items.map((item, index) => {
        const isCurrent = index === items.length - 1;

        return (
          <div key={`${item.href ?? "current"}-${item.label}`} className="flex items-center gap-4">
            {index > 0 ? (
              <Icon name="chevron-right" size={16} strokeWidth={2} className="text-gray-300" />
            ) : null}

            {item.href && !isCurrent ? (
              <CLink href={item.href} className="hover:text-blue-700">
                {item.label}
              </CLink>
            ) : (
              <span aria-current={isCurrent ? "page" : undefined} className={isCurrent ? "text-gray-700" : undefined}>
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
