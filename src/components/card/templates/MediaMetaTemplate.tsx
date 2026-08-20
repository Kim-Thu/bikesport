import { CLink } from "@/components/link/CLink";
import { MediaImageView } from "@/components/media/MediaImageView";
import type { CardProps } from "@/interfaces/card.interface";
import { cn } from "@/lib/classname.utils";

export function MediaMetaTemplate({ title, href, media, description, publishedAt, categoryName, categoryHref, authorName, actionLabel, className }: CardProps) {
  return (
    <article className={cn("group flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white transition-colors hover:border-blue-200", className)}>
      <div className="relative">
        <CLink href={href} className="block">
          <div className="aspect-video w-full overflow-hidden">
            <MediaImageView media={media} alt={title} width={480} height={270} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
          </div>
        </CLink>
        {categoryName && categoryHref ? <CLink href={categoryHref} className="absolute left-4 top-4 rounded-md bg-blue-700/10 px-2 py-2 text-xs font-medium text-blue-700">{categoryName}</CLink> : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-xs font-semibold text-gray-900 sm:text-sm"><CLink href={href}>{title}</CLink></h3>
        {description ? <p className="line-clamp-2 text-xs leading-relaxed text-gray-600">{description}</p> : null}
        <div className="mt-auto flex items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-2 text-gray-500">
            {authorName ? <span>{authorName}</span> : null}
            {authorName && publishedAt ? <span aria-hidden="true">•</span> : null}
            {publishedAt ? <time dateTime={publishedAt}>{new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(publishedAt))}</time> : null}
          </div>
          {actionLabel ? <CLink href={href} className="shrink-0 font-semibold text-blue-700">{actionLabel}</CLink> : null}
        </div>
      </div>
    </article>
  );
}
