import { CLink } from "@/components/link/CLink";
import { MediaImage } from "@/components/media/MediaImage";
import type { AdsRecord } from "@/interfaces/ads.interface";

export function Ads({ ad }: { ad: AdsRecord }) {
  const media = (
    <div className="aspect-1/2 w-full overflow-hidden rounded-lg">
      <MediaImage
        mediaId={ad.mediaId}
        alt={ad.alt}
        width={300}
        height={600}
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
