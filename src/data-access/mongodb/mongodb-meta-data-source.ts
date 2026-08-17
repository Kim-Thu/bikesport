import type { MetaDataSource } from "@/data-access/contracts/meta-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type { MetaCategoryRecord } from "@/interfaces/meta.interface";

export function createMongoMetaDataSource(getDatabase: MongoDatabaseProvider): MetaDataSource {
  return {
    async getCategoryById(categoryId) {
      const database = await getDatabase();
      return database
        .collection<MetaCategoryRecord>(MONGODB_COLLECTIONS.metaCategories)
        .findOne({ _id: categoryId });
    },
    async getActiveCategoriesByType(type) {
      const database = await getDatabase();
      return database
        .collection<MetaCategoryRecord>(MONGODB_COLLECTIONS.metaCategories)
        .find({ type, status: "active" })
        .sort({ name: 1 })
        .toArray();
    },
    async getActiveCategoryBySlug(type, slug) {
      const database = await getDatabase();
      return database
        .collection<MetaCategoryRecord>(MONGODB_COLLECTIONS.metaCategories)
        .findOne({ type, slug, status: "active" });
    },
  };
}
