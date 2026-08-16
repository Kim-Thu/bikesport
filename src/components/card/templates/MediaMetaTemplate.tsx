import { CLink } from "@/components/link/CLink";
import { MediaImage } from "@/components/media/MediaImage";
import type { CardProps } from "@/interfaces/card.interface";
import { cn } from "@/lib/classname.utils";

export function MediaMetaTemplate({ title, href, mediaId, publishedAt, className }: CardProps) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white transition-colors hover:border-blue-200",
        className,
      )}
    >
      <CLink href={href} className="block p-4 pb-0">
        <div className="aspect-video w-full overflow-hidden rounded-md">
          <MediaImage
            mediaId={mediaId}
            alt={title}
            width={480}
            height={270}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </CLink>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <CLink href={href} className="line-clamp-2 text-xs font-semibold text-gray-900 sm:text-sm">
          {title}
        </CLink>
        {publishedAt ? (
          <time dateTime={publishedAt} className="mt-auto text-xs text-gray-500">
            {new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(
              new Date(publishedAt),
            )}
          </time>
        ) : null}
      </div>
    </article>
  );
}
