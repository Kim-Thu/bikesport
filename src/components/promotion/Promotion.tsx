import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import { MediaImage } from "@/components/media/MediaImage";
import type { PromotionProps } from "@/interfaces/promotion.interface";

export function Promotion({ type = "text", content, mediaId, alt = "Promotion", href, ctaLabel, iconMediaId }: PromotionProps) {
  if (type === "image") {
    if (!mediaId) return null;

    const image = (
      <MediaImage mediaId={mediaId} alt={alt} width={1920} height={120} className="h-auto w-full" />
    );
    return href ? <CLink href={href}>{image}</CLink> : image;
  }

  if (!content) return null;

  return (
    <div className="flex min-h-9 items-center justify-center gap-2 text-center text-2xs text-white sm:gap-3 sm:text-xs">
      {iconMediaId ? <Icon mediaId={iconMediaId} className="h-3 w-3 text-white sm:h-3.5 sm:w-3.5" /> : null}
      <strong>{content}</strong>
      {href && ctaLabel ? (
        <CLink href={href} className="inline-flex items-center gap-1 border-l border-white/40 pl-2 text-2xs sm:pl-4 sm:text-xs">
          {ctaLabel}
          <Icon name="arrow-right" className="h-3 w-3" />
        </CLink>
      ) : null}
    </div>
  );
}
