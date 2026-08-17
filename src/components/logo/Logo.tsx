import { CLink } from "@/components/link/CLink";
import { MediaImage } from "@/components/media/MediaImage";
import type { LogoProps } from "@/interfaces/logo.interface";
import { getMediaById } from "@/lib/media.utils";

export function Logo({ href = "/", site }: LogoProps) {
  const { logoMediaId, siteTitle, tagLine, showSiteTitle, showTagLine } = site;
  const logoMedia = logoMediaId ? getMediaById(logoMediaId) : null;
  const hasLogo = Boolean(logoMedia);
  const shouldShowSiteTitle = !hasLogo || showSiteTitle;
  const shouldShowTagLine = showTagLine && Boolean(tagLine);

  return (
    <CLink href={href} className="inline-flex shrink-0 items-center gap-3" aria-label={siteTitle || "Trang chủ"}>
      {hasLogo && logoMediaId ? (
        <MediaImage
          mediaId={logoMediaId}
          alt={siteTitle || "Logo"}
          width={192}
          height={48}
          className="h-auto w-36 md:w-48"
          priority
        />
      ) : null}

      {(shouldShowSiteTitle || shouldShowTagLine) && (
        <span className="flex flex-col">
          {shouldShowSiteTitle && siteTitle && <span>{siteTitle}</span>}
          {shouldShowTagLine && <span>{tagLine}</span>}
        </span>
      )}
    </CLink>
  );
}
