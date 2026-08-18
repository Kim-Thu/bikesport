import type { BrandDataSource } from "@/data-access/contracts/brand-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type { BrandRecord } from "@/interfaces/brand.interface";

export function createMongoBrandDataSource(getDatabase: MongoDatabaseProvider): BrandDataSource {
  return {
    async getActive(limit) {
      const db = await getDatabase();
      let cursor = db
        .collection<BrandRecord>(MONGODB_COLLECTIONS.brands)
        .find({ status: "active" })
        .sort({ order: 1 });
      if (typeof limit === "number") cursor = cursor.limit(limit);
      return cursor.toArray();
    },
    async getFeatured(limit) {
      const db = await getDatabase();
      let cursor = db
        .collection<BrandRecord>(MONGODB_COLLECTIONS.brands)
        .find({ status: "active", featured: true })
        .sort({ order: 1 });
      if (typeof limit === "number") cursor = cursor.limit(limit);
      return cursor.toArray();
    },
    async getActiveById(brandId) {
      const db = await getDatabase();
      return db.collection<BrandRecord>(MONGODB_COLLECTIONS.brands).findOne({
        _id: brandId,
        status: "active",
      });
    },
  };
}
