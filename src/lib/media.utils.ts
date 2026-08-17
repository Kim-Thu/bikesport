import wpMedia from "@/data/wp-media.json";
import type { MediaItem, MediaLibrary } from "@/interfaces/media.interface";

export const PLACEHOLDER_MEDIA_ID = "66bf4e8c9f2a4d7b8c1e3702";

const mediaLibrary = wpMedia as MediaLibrary;
const mediaIndex = new Map<string, MediaItem>(mediaLibrary.media.map((item) => [item._id, item]));

function isSafeLocalMediaUrl(src: string): boolean {
  return src.startsWith("/") && !src.startsWith("//");
}

export function getMediaById(mediaId?: string | null): MediaItem | null {
  if (!mediaId) return null;
  return mediaIndex.get(mediaId) ?? null;
}

export function getMediaUrl(mediaId?: string | null): string | undefined {
  const media = getMediaById(mediaId);
  if (!media?.src || !isSafeLocalMediaUrl(media.src)) return undefined;
  return media.src;
}

export function getMediaWithFallback(mediaId?: string | null): MediaItem | null {
  const media = getMediaById(mediaId);
  if (media?.src && isSafeLocalMediaUrl(media.src)) return media;

  const placeholder = getMediaById(PLACEHOLDER_MEDIA_ID);
  if (!placeholder?.src || !isSafeLocalMediaUrl(placeholder.src)) return null;

  return placeholder;
}
