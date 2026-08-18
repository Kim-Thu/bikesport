import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import { MediaImageView } from "@/components/media/MediaImageView";
import type { CardProps } from "@/interfaces/card.interface";
import { cn } from "@/lib/classname.utils";

export function MediaDetailsTemplate({ title, href, media, description, metaItems, actionLabel, className }: CardProps) {
  return (
    <article className={cn("group flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white transition-colors hover:border-blue-200", className)}>
      <CLink href={href} className="block">
        <div className="aspect-video w-full overflow-hidden">
          <MediaImageView media={media} alt={title} width={480} height={270} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
      </CLink>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-col gap-3">
          <CLink href={href} className="block text-sm font-semibold text-gray-950">{title}</CLink>
          {description ? <p className="text-xs text-gray-600">{description}</p> : null}
          {metaItems?.length ? (
            <div className="space-y-2 text-xs text-gray-500">
              {metaItems.map((item) => (
                <div key={`${item.icon ?? "meta"}-${item.text}`} className="flex items-start gap-2">
                  <Icon name={item.icon} className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        {actionLabel ? <CLink href={href} className="mt-auto text-xs font-semibold text-blue-600">{actionLabel}</CLink> : null}
      </div>
    </article>
  );
}
