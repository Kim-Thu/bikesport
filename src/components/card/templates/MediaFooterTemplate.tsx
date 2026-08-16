import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import { MediaImage } from "@/components/media/MediaImage";
import type { CardProps } from "@/interfaces/card.interface";
import { cn } from "@/lib/classname.utils";

export function MediaFooterTemplate({ title, href, mediaId, className }: CardProps) {
  return (
    <CLink
      href={href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white transition-colors hover:border-blue-200",
        className,
      )}
    >
      <div className="flex min-h-28 flex-1 items-center justify-center bg-white p-3 sm:min-h-32 lg:min-h-36">
        <MediaImage
          mediaId={mediaId}
          alt={title}
          width={320}
          height={220}
          className="h-24 w-full object-contain transition-transform duration-300 group-hover:scale-105 sm:h-28 lg:h-32"
        />
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-gray-100 bg-white px-3 py-2.5">
        <span className="min-w-0 text-xs font-semibold text-gray-900 sm:text-sm">{title}</span>
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-colors group-hover:border-blue-600 group-hover:text-blue-600">
          <Icon name="arrow-right" className="h-3 w-3" strokeWidth={2} />
        </span>
      </div>
    </CLink>
  );
}
