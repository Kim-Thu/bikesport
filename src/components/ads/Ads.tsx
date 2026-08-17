import { CLink } from "@/components/link/CLink";
import { MediaImage } from "@/components/media/MediaImage";
import type { AdsRecord } from "@/interfaces/ads.interface";

export function Ads({ ad }: { ad: AdsRecord }) {
  const media = (
    <div className="aspect-video w-full overflow-hidden rounded-lg lg:aspect-1/2">
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
    <CLink href={ad.href} aria-label={ad.alt} className="block cursor-pointer">
      {media}
    </CLink>
  ) : (
    media
  );
}
