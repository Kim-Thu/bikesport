import { MEDIA_PLACEHOLDER } from "@/constants/media.constant";
import { dataSources } from "@/data-access/data-sources";
import type { MediaItem } from "@/interfaces/media.interface";
import { CACHE_TAG, cachedDomain } from "@/lib/cache.utils";

export const PLACEHOLDER_MEDIA_ID = MEDIA_PLACEHOLDER.id;

function isSafeLocalMediaUrl(src: string): boolean {
  return src.startsWith("/") && !src.startsWith("//");
}

export async function getMediaById(mediaId?: string | null): Promise<MediaItem | null> {
  if (!mediaId) return null;

  return cachedDomain(
    "media",
    ["by-id", mediaId],
    () => dataSources.media.getById(mediaId),
    [CACHE_TAG.entity("media", mediaId)],
  );
}

export async function getMediaByIds(mediaIds: string[]): Promise<MediaItem[]> {
  const uniqueMediaIds = [...new Set(mediaIds.filter(Boolean))].sort();
  if (!uniqueMediaIds.length) return [];

  return cachedDomain(
    "media",
    ["by-ids", ...uniqueMediaIds],
    () => dataSources.media.getByIds(uniqueMediaIds),
    uniqueMediaIds.map((mediaId) => CACHE_TAG.entity("media", mediaId)),
  );
}

export async function getMediaUrl(mediaId?: string | null): Promise<string | undefined> {
  const media = await getMediaById(mediaId);
  if (!media?.src || !isSafeLocalMediaUrl(media.src)) return undefined;
  return media.src;
}

export async function getMediaUrlsByIds(
  mediaIds: Array<string | null | undefined>,
): Promise<Record<string, string>> {
  const requestedIds = [...new Set(mediaIds.filter((mediaId): mediaId is string => Boolean(mediaId)))];
  if (!requestedIds.length) return {};

  const mediaItems = await getMediaByIds(requestedIds);
  const urlsById: Record<string, string> = {};

  for (const media of mediaItems) {
    if (media.src && isSafeLocalMediaUrl(media.src)) {
      urlsById[media._id] = media.src;
    }
  }

  return urlsById;
}

export async function getMediaWithFallback(mediaId?: string | null): Promise<MediaItem | null> {
  const mediaById = await getMediaWithFallbackByIds(mediaId ? [mediaId] : []);
  return mediaId ? mediaById[mediaId] ?? null : mediaById[PLACEHOLDER_MEDIA_ID] ?? null;
}

export async function getMediaWithFallbackByIds(mediaIds: string[]): Promise<Record<string, MediaItem>> {
  const uniqueMediaIds = [...new Set(mediaIds.filter(Boolean))];
  const requestedIds = uniqueMediaIds.includes(PLACEHOLDER_MEDIA_ID)
    ? uniqueMediaIds
    : [...uniqueMediaIds, PLACEHOLDER_MEDIA_ID];
  const mediaItems = await getMediaByIds(requestedIds);
  const sourceById = new Map(mediaItems.map((item) => [item._id, item]));
  const placeholder = sourceById.get(PLACEHOLDER_MEDIA_ID);
  const safePlaceholder = placeholder?.src && isSafeLocalMediaUrl(placeholder.src) ? placeholder : null;
  const resolved: Record<string, MediaItem> = {};

  for (const mediaId of uniqueMediaIds) {
    const media = sourceById.get(mediaId);
    if (media?.src && isSafeLocalMediaUrl(media.src)) {
      resolved[mediaId] = media;
    } else if (safePlaceholder) {
      resolved[mediaId] = safePlaceholder;
    }
  }

  if (safePlaceholder) {
    resolved[PLACEHOLDER_MEDIA_ID] = safePlaceholder;
  }

  return resolved;
}
