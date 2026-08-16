import Image from "next/image";
import { CLink } from "@/components/link/CLink";
import wpOption from "@/data/wp-option.json";
import type { LogoProps } from "@/interfaces/logo.interface";

export function Logo({ href = "/" }: LogoProps) {
  const { logo, siteTitle, tagLine, showSiteTitle, showTagLine } = wpOption.site;
  const hasLogo = Boolean(logo);
  const shouldShowSiteTitle = !hasLogo || showSiteTitle;
  const shouldShowTagLine = showTagLine && Boolean(tagLine);

  return (
    <CLink href={href} className="inline-flex shrink-0 items-center gap-3" aria-label={siteTitle || "Trang chủ"}>
      {hasLogo && (
        <Image
          src={logo}
          alt={siteTitle || "Logo"}
          width={192}
          height={48}
          className="h-auto w-36 md:w-48"
          priority
        />
      )}

      {(shouldShowSiteTitle || shouldShowTagLine) && (
        <span className="flex flex-col">
          {shouldShowSiteTitle && siteTitle && <span>{siteTitle}</span>}
          {shouldShowTagLine && <span>{tagLine}</span>}
        </span>
      )}
    </CLink>
  );
}
