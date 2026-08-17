import type { BannerDataSource } from "@/data-access/contracts/banner-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type { BannerRecord } from "@/interfaces/banner.interface";

export function createMongoBannerDataSource(
  getDatabase: MongoDatabaseProvider,
): BannerDataSource {
  return {
    async getById(bannerId) {
      const db = await getDatabase();
      return db.collection<BannerRecord>(MONGODB_COLLECTIONS.banners).findOne({ _id: bannerId });
    },
    async getByGroup(groupId) {
      const db = await getDatabase();
      return db
        .collection<BannerRecord>(MONGODB_COLLECTIONS.banners)
        .find({ groupId })
        .sort({ order: 1 })
        .toArray();
    },
    async getByCategory(categoryId) {
      const db = await getDatabase();
      return db
        .collection<BannerRecord>(MONGODB_COLLECTIONS.banners)
        .find({ categoryId })
        .sort({ order: 1 })
        .toArray();
    },
  };
}
