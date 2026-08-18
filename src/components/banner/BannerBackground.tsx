import { MediaImage } from "@/components/media/MediaImage";
import type { BannerRecord } from "@/interfaces/banner.interface";
import { cn } from "@/lib/classname.utils";

const OVERLAY_CLASS = {
  "blue-left": "w-1/2 bg-gradient-to-r from-blue-200 via-blue-200 via-70% to-transparent",
  "blue-center": "inset-x-0 bg-gradient-to-r from-transparent via-blue-200/85 to-transparent",
} as const;

interface BannerBackgroundProps {
  banner: BannerRecord;
  imageClassName?: string;
}

export function BannerBackground({ banner, imageClassName }: BannerBackgroundProps) {
  return (
    <>
      <MediaImage
        mediaId={banner.backgroundMediaId}
        alt=""
        width={1920}
        height={480}
        priority={banner.order === 1}
        sizes="100vw"
        className={cn("absolute inset-0 h-full w-full object-cover object-center", imageClassName)}
      />

      {banner.overlay ? (
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 z-10",
            OVERLAY_CLASS[banner.overlay.variant],
          )}
          aria-hidden="true"
        />
      ) : null}
    </>
  );
}
