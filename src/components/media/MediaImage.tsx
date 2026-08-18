import Image from "next/image";
import type { MediaImageProps } from "@/interfaces/media.interface";
import { getMediaWithFallback, PLACEHOLDER_MEDIA_ID } from "@/lib/media.utils";

export async function MediaImage({ mediaId, alt, width, height, ...props }: MediaImageProps) {
  const media = await getMediaWithFallback(mediaId);
  if (!media) return null;

  const isPlaceholder = media._id === PLACEHOLDER_MEDIA_ID;
  const resolvedWidth = width ?? media.width;
  const resolvedHeight = height ?? media.height;

  if (!resolvedWidth || !resolvedHeight) return null;

  return (
    <Image
      src={media.src}
      alt={alt ?? (isPlaceholder ? "Placeholder" : media.alt ?? media.name)}
      width={resolvedWidth}
      height={resolvedHeight}
      {...props}
    />
  );
}
