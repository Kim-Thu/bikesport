import type { ReactNode } from "react";
import { MediaImage } from "@/components/media/MediaImage";
import { cn } from "@/lib/classname.utils";

interface BadgeProps {
  children?: ReactNode;
  mediaId?: string | null;
  alt?: string;
  className?: string;
  imageClassName?: string;
}

export function Badge({ children, mediaId, alt = "Badge", className, imageClassName }: BadgeProps) {
  if (mediaId) {
    return (
      <span className={cn("inline-flex items-center", className)}>
        <MediaImage
          mediaId={mediaId}
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
    <span className={cn("inline-flex items-center rounded bg-red-500 px-2 py-1 text-2xs font-bold text-white", className)}>
      {children}
    </span>
  );
}
