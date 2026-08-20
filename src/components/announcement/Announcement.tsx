import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import { MediaImage } from "@/components/media/MediaImage";
import type { AnnouncementProps } from "@/interfaces/announcement.interface";
import { getActiveAnnouncementById } from "@/lib/announcement.utils";
import { getMediaById } from "@/lib/media.utils";

export async function Announcement({ announcementId }: AnnouncementProps) {
  const announcement = await getActiveAnnouncementById(announcementId);
  if (!announcement) return null;

  const {
    type,
    content,
    mediaId,
    alt = "Announcement",
    href,
    ctaLabel,
    iconMediaId,
  } = announcement;
  const iconMedia = iconMediaId ? await getMediaById(iconMediaId) : null;

  if (type === "image") {
    if (!mediaId) return null;

    const image = (
      <MediaImage mediaId={mediaId} alt={alt} width={1920} height={120} className="h-auto w-full" />
    );
    return href ? <CLink href={href}>{image}</CLink> : image;
  }

  if (!content) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-2 text-center text-2xs text-white sm:gap-4 sm:text-xs">
      {iconMedia?.src ? <Icon mediaUrl={iconMedia.src} className="h-3 w-3 text-white sm:h-3.5 sm:w-3.5" /> : null}
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
