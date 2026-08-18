import type { PageDataSource } from "@/data-access/contracts/page-data-source.interface";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { PageRecord } from "@/interfaces/page.interface";

export function createMongoPageDataSource(getDatabase: MongoDatabaseProvider): PageDataSource {
  return {
    async getPublished() {
      const database = await getDatabase();
      return database
        .collection<PageRecord>(MONGODB_COLLECTIONS.pages)
        .find({ status: "published" })
        .sort({ path: 1 })
        .toArray();
    },

    async getPublishedByPath(path) {
      const database = await getDatabase();
      return database.collection<PageRecord>(MONGODB_COLLECTIONS.pages).findOne({
        path,
        status: "published",
      });
    },

    async getPublishedBySlug(slug) {
      const database = await getDatabase();
      return database.collection<PageRecord>(MONGODB_COLLECTIONS.pages).findOne({
        slug,
        status: "published",
      });
    },

    async getPublishedSlugs() {
      const database = await getDatabase();
      const pages = await database
        .collection<PageRecord>(MONGODB_COLLECTIONS.pages)
        .aggregate<{ slug: string }>([
          { $match: { status: "published", path: { $ne: "/" } } },
          { $sort: { path: 1 } },
          { $project: { _id: 0, slug: 1 } },
        ])
        .toArray();

      return pages.map((page) => page.slug);
    },
  };
}
