import type { MediaDataSource } from "@/data-access/contracts/media-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type { MediaItem } from "@/interfaces/media.interface";

export function createMongoMediaDataSource(
  getDatabase: MongoDatabaseProvider,
): MediaDataSource {
  return {
    async getById(mediaId) {
      const database = await getDatabase();
      return database
        .collection<MediaItem>(MONGODB_COLLECTIONS.media)
        .findOne({ _id: mediaId });
    },
    async getByIds(mediaIds) {
      if (!mediaIds.length) return [];

      const database = await getDatabase();
      return database
        .collection<MediaItem>(MONGODB_COLLECTIONS.media)
        .find({ _id: { $in: mediaIds } })
        .toArray();
    },
  };
}
