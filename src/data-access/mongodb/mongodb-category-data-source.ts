import type { CategoryDataSource } from "@/data-access/contracts/category-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type { CategoryRecord } from "@/interfaces/category.interface";

export function createMongoCategoryDataSource(getDatabase: MongoDatabaseProvider): CategoryDataSource {
  return {
    async getActiveById(categoryId) {
      const db = await getDatabase();
      return db.collection<CategoryRecord>(MONGODB_COLLECTIONS.categories).findOne({
        _id: categoryId,
        status: "active",
      });
    },
    async getActiveByType(type) {
      const db = await getDatabase();
      return db
        .collection<CategoryRecord>(MONGODB_COLLECTIONS.categories)
        .find({ status: "active", type })
        .sort({ order: 1 })
        .toArray();
    },
    async getFeaturedByType(type, limit) {
      const db = await getDatabase();
      let cursor = db
        .collection<CategoryRecord>(MONGODB_COLLECTIONS.categories)
        .find({ status: "active", type, featured: true })
        .sort({ order: 1 });
      if (typeof limit === "number") cursor = cursor.limit(limit);
      return cursor.toArray();
    },
    async getActiveHierarchy() {
      const db = await getDatabase();
      return db
        .collection<CategoryRecord>(MONGODB_COLLECTIONS.categories)
        .find({ status: "active" })
        .sort({ order: 1 })
        .toArray();
    },
  };
}
