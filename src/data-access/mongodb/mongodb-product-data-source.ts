import type { ProductDataSource } from "@/data-access/contracts/product-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type { ProductRecord } from "@/interfaces/product.interface";

export function createMongoProductDataSource(getDatabase: MongoDatabaseProvider): ProductDataSource {
  return {
    async getPublished(limit) {
      const db = await getDatabase();
      let cursor = db
        .collection<ProductRecord>(MONGODB_COLLECTIONS.products)
        .find({ status: "published" });
      if (typeof limit === "number") cursor = cursor.limit(limit);
      return cursor.toArray();
    },
    async getFeatured(limit) {
      const db = await getDatabase();
      let cursor = db
        .collection<ProductRecord>(MONGODB_COLLECTIONS.products)
        .find({ status: "published", featured: true });
      if (typeof limit === "number") cursor = cursor.limit(limit);
      return cursor.toArray();
    },
    async getPublishedByBrandId(brandId, limit) {
      const db = await getDatabase();
      let cursor = db
        .collection<ProductRecord>(MONGODB_COLLECTIONS.products)
        .find({ status: "published", brandId });
      if (typeof limit === "number") cursor = cursor.limit(limit);
      return cursor.toArray();
    },
    async getPublishedByCategoryIds(categoryIds, limit) {
      const db = await getDatabase();
      let cursor = db
        .collection<ProductRecord>(MONGODB_COLLECTIONS.products)
        .find({ status: "published", categoryIds: { $in: categoryIds } });
      if (typeof limit === "number") cursor = cursor.limit(limit);
      return cursor.toArray();
    },
  };
}
