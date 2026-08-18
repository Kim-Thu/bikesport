import { CLink } from "@/components/link/CLink";
import { Icon } from "@/components/icon/Icon";
import type { CardProps } from "@/interfaces/card.interface";
import { cn } from "@/lib/classname.utils";

export function ListingTemplate({
  title,
  href,
  eyebrow,
  description,
  metaItems,
  actionLabel = "Xem chi tiết",
  className,
}: CardProps) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 transition-colors hover:border-blue-300 sm:p-6",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {eyebrow ? (
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-700">{eyebrow}</p>
          ) : null}
          <h3 className="text-base font-bold text-gray-950 sm:text-lg">
            <CLink href={href} className="transition-colors group-hover:text-blue-700">
              {title}
            </CLink>
          </h3>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
          <Icon name="users" size={18} strokeWidth={2} />
        </span>
      </div>

      {description ? (
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">{description}</p>
      ) : null}

      {metaItems?.length ? (
        <div className="mt-5 grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
          {metaItems.map((item) => (
            <div key={`${item.icon ?? "meta"}-${item.text}`} className="flex min-w-0 items-start gap-2">
              <Icon name={item.icon} size={16} className="mt-0.5 shrink-0 text-blue-700" strokeWidth={2} />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      ) : null}

      <CLink
        href={href}
        className="mt-6 inline-flex items-center gap-1 self-start text-sm font-semibold text-blue-700 transition-opacity hover:opacity-75"
      >
        {actionLabel}
        <Icon name="arrow-right" size={15} strokeWidth={2} />
      </CLink>
    </article>
  );
}
