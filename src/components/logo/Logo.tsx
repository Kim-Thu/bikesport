import Image from "next/image";
import Link from "next/link";
import settings from "@/data/wp-option.json";
import type { LogoProps } from "@/interfaces/logo.interface";

export function Logo({ href = "/" }: LogoProps) {
  const hasLogo = Boolean(settings.logo);
  const showSiteTitle = !hasLogo || settings.showSiteTitle;
  const showTagLine = settings.showTagLine && Boolean(settings.tagLine);

  return (
    <Link href={href} className="inline-flex items-center gap-3" aria-label={settings.siteTitle || "Trang chủ"}>
      {hasLogo && (
        <Image
          src={settings.logo}
          alt={settings.siteTitle || "Logo"}
          width={160}
          height={40}
          className="h-auto w-40 max-md:w-28"
          priority
        />
      )}

      {(showSiteTitle || showTagLine) && (
        <span className="flex flex-col">
          {showSiteTitle && settings.siteTitle && <span>{settings.siteTitle}</span>}
          {showTagLine && <span>{settings.tagLine}</span>}
        </span>
      )}
    </Link>
  );
}
