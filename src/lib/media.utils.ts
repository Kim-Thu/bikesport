import wpMedia from "@/data/wp-media.json";
import type { MediaItem, MediaLibrary } from "@/interfaces/media.interface";

const mediaLibrary = wpMedia as MediaLibrary;
const mediaIndex = new Map<string, MediaItem>(mediaLibrary.media.map((item) => [item._id, item]));

function isSafeMediaUrl(src: string): boolean {
  return src.startsWith("/") || /^https?:\/\//i.test(src);
}

export function getMediaById(mediaId?: string | null): MediaItem | null {
  if (!mediaId) return null;
  return mediaIndex.get(mediaId) ?? null;
}

export function getMediaUrl(mediaId?: string | null): string | undefined {
  const media = getMediaById(mediaId);
  if (!media?.src || !isSafeMediaUrl(media.src)) return undefined;
  return media.src;
}
