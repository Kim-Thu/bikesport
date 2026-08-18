import type { MediaImageProps } from "@/interfaces/media.interface";
import { MediaImageView } from "@/components/media/MediaImageView";
import { getMediaWithFallback } from "@/lib/media.utils";

export async function MediaImage({ mediaId, alt, width, height, ...props }: MediaImageProps) {
  const media = await getMediaWithFallback(mediaId);

  return (
    <MediaImageView
      media={media}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  );
}
