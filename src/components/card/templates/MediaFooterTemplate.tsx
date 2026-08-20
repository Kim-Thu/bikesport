import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import { MediaImageView } from "@/components/media/MediaImageView";
import type { CardProps } from "@/interfaces/card.interface";
import { cn } from "@/lib/classname.utils";

export function MediaFooterTemplate({ title, href, media, className }: CardProps) {
  return (
    <CLink href={href} className={cn("group flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white transition-colors hover:border-blue-200", className)}>
      <div className="aspect-card-media w-full overflow-hidden bg-white p-4">
        <MediaImageView media={media} alt={title} width={320} height={240} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-gray-100 bg-white p-4">
        <span className="min-w-0 text-xs font-semibold text-gray-900 sm:text-sm">{title}</span>
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-colors group-hover:border-blue-700 group-hover:text-blue-700">
          <Icon name="arrow-right" className="h-3 w-3" strokeWidth={2} />
        </span>
      </div>
    </CLink>
  );
}
