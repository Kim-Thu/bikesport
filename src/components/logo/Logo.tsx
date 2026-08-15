import Image from "next/image";
import Link from "next/link";
import wpOption from "@/data/wp-option.json";
import type { LogoProps } from "@/interfaces/logo.interface";

export function Logo({ href = "/" }: LogoProps) {
  const { logo, siteTitle, tagLine, showSiteTitle, showTagLine } = wpOption.site;
  const hasLogo = Boolean(logo);
  const shouldShowSiteTitle = !hasLogo || showSiteTitle;
  const shouldShowTagLine = showTagLine && Boolean(tagLine);

  return (
    <Link href={href} className="inline-flex items-center gap-3" aria-label={siteTitle || "Trang chủ"}>
      {hasLogo && (
        <Image
          src={logo}
          alt={siteTitle || "Logo"}
          width={160}
          height={40}
          className="h-auto w-40 max-md:w-28"
          priority
        />
      )}

      {(shouldShowSiteTitle || shouldShowTagLine) && (
        <span className="flex flex-col">
          {shouldShowSiteTitle && siteTitle && <span>{siteTitle}</span>}
          {shouldShowTagLine && <span>{tagLine}</span>}
        </span>
      )}
    </Link>
  );
}
