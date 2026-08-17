import type { AdsDataSource } from "@/data-access/contracts/ads-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type { AdsRecord } from "@/interfaces/ads.interface";

export function createMongoAdsDataSource(getDatabase: MongoDatabaseProvider): AdsDataSource {
  return {
    async getActiveByPlacement(placement) {
      const db = await getDatabase();
      return db
        .collection<AdsRecord>(MONGODB_COLLECTIONS.ads)
        .find({ status: "active", placement })
        .sort({ priority: -1 })
        .toArray();
    },
  };
}
