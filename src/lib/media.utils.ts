import { dataSources } from "@/data-access/data-sources";
import type { MediaItem } from "@/interfaces/media.interface";

export const PLACEHOLDER_MEDIA_ID = "66bf4e8c9f2a4d7b8c1e3702";

function isSafeLocalMediaUrl(src: string): boolean {
  return src.startsWith("/") && !src.startsWith("//");
}

export async function getMediaById(mediaId?: string | null): Promise<MediaItem | null> {
  if (!mediaId) return null;
  return dataSources.media.getById(mediaId);
}

export async function getMediaByIds(mediaIds: string[]): Promise<MediaItem[]> {
  const uniqueMediaIds = [...new Set(mediaIds.filter(Boolean))];
  if (!uniqueMediaIds.length) return [];
  return dataSources.media.getByIds(uniqueMediaIds);
}

export async function getMediaUrl(mediaId?: string | null): Promise<string | undefined> {
  const media = await getMediaById(mediaId);
  if (!media?.src || !isSafeLocalMediaUrl(media.src)) return undefined;
  return media.src;
}

export async function getMediaWithFallback(mediaId?: string | null): Promise<MediaItem | null> {
  const requestedIds = mediaId && mediaId !== PLACEHOLDER_MEDIA_ID
    ? [mediaId, PLACEHOLDER_MEDIA_ID]
    : [PLACEHOLDER_MEDIA_ID];
  const mediaItems = await getMediaByIds(requestedIds);
  const mediaById = new Map(mediaItems.map((item) => [item._id, item]));
  const media = mediaId ? mediaById.get(mediaId) : null;

  if (media?.src && isSafeLocalMediaUrl(media.src)) return media;

  const placeholder = mediaById.get(PLACEHOLDER_MEDIA_ID);
  if (!placeholder?.src || !isSafeLocalMediaUrl(placeholder.src)) return null;

  return placeholder;
}
