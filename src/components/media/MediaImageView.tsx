"use client";

import { useState } from "react";
import Image from "next/image";
import type { ImageProps } from "next/image";
import type { MediaItem } from "@/interfaces/media.interface";

const PLACEHOLDER_SRC = "/uploads/images/placehoder.png";
const PLACEHOLDER_WIDTH = 1200;
const PLACEHOLDER_HEIGHT = 200;

interface MediaImageViewProps extends Omit<ImageProps, "src" | "alt" | "width" | "height"> {
  media: MediaItem | null;
  alt?: string;
  width?: number;
  height?: number;
}

export function MediaImageView({ media, alt, width, height, onError, ...props }: MediaImageViewProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const source = media?.src?.trim();
  const usePlaceholder = !source || failedSrc === source;
  const resolvedSrc = usePlaceholder ? PLACEHOLDER_SRC : source;
  const resolvedWidth = width ?? media?.width ?? PLACEHOLDER_WIDTH;
  const resolvedHeight = height ?? media?.height ?? PLACEHOLDER_HEIGHT;

  return (
    <Image
      src={resolvedSrc}
      alt={alt ?? media?.alt ?? media?.name ?? "Placeholder"}
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
