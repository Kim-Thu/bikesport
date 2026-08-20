"use client";

import { useState } from "react";
import Image from "next/image";
import type { ImageProps } from "next/image";
import { MEDIA_PLACEHOLDER } from "@/constants/media.constant";
import type { MediaItem } from "@/interfaces/media.interface";

interface MediaImageViewProps extends Omit<ImageProps, "src" | "alt" | "width" | "height"> {
  media?: MediaItem | null;
  alt?: string;
  width?: number;
  height?: number;
}

export function MediaImageView({ media, alt, width, height, onError, ...props }: MediaImageViewProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const source = media?.src?.trim();
  const usePlaceholder = !source || failedSrc === source;
  const resolvedSrc = usePlaceholder ? MEDIA_PLACEHOLDER.src : source;
  const resolvedWidth = width ?? media?.width ?? MEDIA_PLACEHOLDER.width;
  const resolvedHeight = height ?? media?.height ?? MEDIA_PLACEHOLDER.height;

  return (
    <Image
      src={resolvedSrc}
      alt={alt ?? media?.alt ?? media?.name ?? MEDIA_PLACEHOLDER.alt}
      width={resolvedWidth}
      height={resolvedHeight}
      onError={(event) => {
        if (!usePlaceholder && source) setFailedSrc(source);
        onError?.(event);
      }}
      {...props}
    />
  );
}
