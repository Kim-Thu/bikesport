import { CLink } from "@/components/link/CLink";
import { MediaImage } from "@/components/media/MediaImage";
import type { AdsRecord } from "@/interfaces/ads.interface";

export function Ads({ ad }: { ad: AdsRecord }) {
  const media = (
    <div className="aspect-video w-full overflow-hidden rounded-lg lg:h-full lg:flex-1 lg:aspect-auto">
      <MediaImage
        mediaId={ad.mediaId}
        alt={ad.alt}
        width={600}
        height={338}
        className="h-full w-full object-cover"
      />
    </div>
  );

  return ad.href ? (
    <CLink
      href={ad.href}
      aria-label={ad.alt}
      className="block cursor-pointer lg:flex lg:min-h-0 lg:flex-1"
    >
      {media}
    </CLink>
  ) : (
    media
  );
}
