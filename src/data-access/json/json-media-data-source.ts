import wpMedia from "@/data/wp-media.json";
import type { MediaDataSource } from "@/data-access/contracts/media-data-source.interface";
import type { MediaItem, MediaLibrary } from "@/interfaces/media.interface";

const mediaLibrary = wpMedia as MediaLibrary;
const mediaIndex = new Map<string, MediaItem>(mediaLibrary.media.map((item) => [item._id, item]));

export const jsonMediaDataSource: MediaDataSource = {
  async getById(mediaId) {
    return mediaIndex.get(mediaId) ?? null;
  },
  async getByIds(mediaIds) {
    if (!mediaIds.length) return [];

    return mediaIds
      .map((mediaId) => mediaIndex.get(mediaId))
      .filter((item): item is MediaItem => item !== undefined);
  },
};
