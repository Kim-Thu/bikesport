import Image from "next/image";
import { CLink } from "@/components/link/CLink";
import type { LogoProps } from "@/interfaces/logo.interface";

export function Logo({ href = "/", site, logoMedia = null }: LogoProps) {
  const { siteTitle, tagLine, showSiteTitle, showTagLine } = site;
  const hasLogo = Boolean(logoMedia?.src && logoMedia.width && logoMedia.height);
  const shouldShowSiteTitle = !hasLogo || showSiteTitle;
  const shouldShowTagLine = showTagLine && Boolean(tagLine);

  return (
    <CLink href={href} className="inline-flex shrink-0 items-center gap-4" aria-label={siteTitle || "Trang chủ"}>
      {hasLogo && logoMedia ? (
        <Image
          src={logoMedia.src}
          alt={siteTitle || logoMedia.alt || logoMedia.name || "Logo"}
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
