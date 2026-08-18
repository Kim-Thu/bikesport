import Image from "next/image";
import type { ImageProps } from "next/image";
import type { MediaItem } from "@/interfaces/media.interface";

interface MediaImageViewProps extends Omit<ImageProps, "src" | "alt" | "width" | "height"> {
  media: MediaItem | null;
  alt?: string;
  width?: number;
  height?: number;
}

export function MediaImageView({ media, alt, width, height, ...props }: MediaImageViewProps) {
  if (!media?.src) return null;

  const resolvedWidth = width ?? media.width;
  const resolvedHeight = height ?? media.height;
  if (!resolvedWidth || !resolvedHeight) return null;

  return (
    <Image
      src={media.src}
      alt={alt ?? media.alt ?? media.name}
      width={resolvedWidth}
      height={resolvedHeight}
      {...props}
    />
  );
}
