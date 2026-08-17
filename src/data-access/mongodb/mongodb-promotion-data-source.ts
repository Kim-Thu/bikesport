import type { PromotionDataSource } from "@/data-access/contracts/promotion-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type { PromotionRecord } from "@/interfaces/promotion.interface";

export function createMongoPromotionDataSource(getDatabase: MongoDatabaseProvider): PromotionDataSource {
  return {
    async getById(promotionId) {
      const db = await getDatabase();
      return db.collection<PromotionRecord>(MONGODB_COLLECTIONS.promotions).findOne({
        _id: promotionId,
      });
    },
    async getActive() {
      const db = await getDatabase();
      return db
        .collection<PromotionRecord>(MONGODB_COLLECTIONS.promotions)
        .find({ status: "active" })
        .sort({ priority: -1 })
        .toArray();
    },
  };
}
