import type { PostDataSource } from "@/data-access/contracts/post-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type { PostRecord } from "@/interfaces/post.interface";

export function createMongoPostDataSource(getDatabase: MongoDatabaseProvider): PostDataSource {
  return {
    async getLatestPublished(limit) {
      const db = await getDatabase();
      let cursor = db
        .collection<PostRecord>(MONGODB_COLLECTIONS.posts)
        .find({ status: "published" })
        .sort({ publishedAt: -1 });
      if (typeof limit === "number") cursor = cursor.limit(limit);
      return cursor.toArray();
    },
  };
}
