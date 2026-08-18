import type { ReactNode } from "react";
import { MediaImageView } from "@/components/media/MediaImageView";
import type { MediaItem } from "@/interfaces/media.interface";
import { cn } from "@/lib/classname.utils";

interface BadgeProps {
  children?: ReactNode;
  mediaId?: string | null;
  media?: MediaItem | null;
  alt?: string;
  className?: string;
  imageClassName?: string;
}

export function Badge({ children, media, alt = "Badge", className, imageClassName }: BadgeProps) {
  if (media) {
    return (
      <span className={cn("inline-flex items-center", className)}>
        <MediaImageView
          media={media}
          alt={alt}
          width={96}
          height={40}
          className={cn("h-auto max-h-10 w-auto object-contain", imageClassName)}
        />
      </span>
    );
  }

  if (!children) return null;

  return (
    <span className={cn("inline-flex items-center rounded bg-red-700 px-2 py-1 text-2xs font-bold text-white", className)}>
      {children}
    </span>
  );
}
