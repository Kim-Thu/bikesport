import type { PostDataSource } from "@/data-access/contracts/post-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type { PostRecord } from "@/interfaces/post.interface";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function createMongoPostDataSource(getDatabase: MongoDatabaseProvider): PostDataSource {
  return {
    async getLatestPublished(limit) {
      const db = await getDatabase();
      let cursor = db
        .collection<PostRecord>(MONGODB_COLLECTIONS.posts)
        .find({ status: "published" })
        .sort({ publishedAt: -1 });
      if (typeof limit === "number" && limit > 0) cursor = cursor.limit(limit);
      return cursor.toArray();
    },

    async getLatestPublishedByType(type, limit) {
      const db = await getDatabase();
      let cursor = db
        .collection<PostRecord>(MONGODB_COLLECTIONS.posts)
        .find({ status: "published", type })
        .sort({ publishedAt: -1 });
      if (typeof limit === "number" && limit > 0) cursor = cursor.limit(limit);
      return cursor.toArray();
    },

    async getPublishedBySlugAndType(slug, type) {
      const db = await getDatabase();
      return db
        .collection<PostRecord>(MONGODB_COLLECTIONS.posts)
        .findOne({ status: "published", type, slug });
    },

    async searchPublished({ type, query = "", offset = 0, limit = 6 }) {
      const db = await getDatabase();
      const trimmedQuery = query.trim();
      const match: Record<string, unknown> = { status: "published", type };

      if (trimmedQuery) {
        const regex = { $regex: escapeRegExp(trimmedQuery), $options: "i" };
        match.$or = [
          { title: regex },
          { excerpt: regex },
          { "recruitment.department": regex },
          { "recruitment.location": regex },
          { "recruitment.employmentType": regex },
        ];
      }

      const [result] = await db
        .collection<PostRecord>(MONGODB_COLLECTIONS.posts)
        .aggregate<{ items: PostRecord[]; meta: Array<{ total: number }> }>([
          { $match: match },
          { $sort: { publishedAt: -1 } },
          {
            $facet: {
              items: [
                { $skip: Math.max(0, offset) },
                { $limit: Math.max(1, limit) },
              ],
              meta: [{ $count: "total" }],
            },
          },
        ])
        .toArray();

      return {
        items: result?.items ?? [],
        total: result?.meta[0]?.total ?? 0,
      };
    },
  };
}
