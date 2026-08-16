import Image from "next/image";
import type { MediaImageProps } from "@/interfaces/media.interface";
import { getMediaById, getMediaUrl } from "@/lib/media.utils";

export function MediaImage({ mediaId, alt, width, height, ...props }: MediaImageProps) {
  const media = getMediaById(mediaId);
  const src = getMediaUrl(mediaId);

  if (!media || !src) return null;

  const resolvedWidth = width ?? media.width;
  const resolvedHeight = height ?? media.height;

  if (!resolvedWidth || !resolvedHeight) return null;

  return (
    <Image
      src={src}
      alt={alt ?? media.alt ?? media.name}
      width={resolvedWidth}
      height={resolvedHeight}
      {...props}
    />
  );
}
