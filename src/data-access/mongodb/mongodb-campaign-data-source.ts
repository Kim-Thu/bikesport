import type { CampaignDataSource } from "@/data-access/contracts/campaign-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type { CampaignRecord } from "@/interfaces/campaign.interface";

export function createMongoCampaignDataSource(
  getDatabase: MongoDatabaseProvider,
): CampaignDataSource {
  return {
    async getById(campaignId) {
      const database = await getDatabase();
      return database
        .collection<CampaignRecord>(MONGODB_COLLECTIONS.campaigns)
        .findOne({ _id: campaignId });
    },
    async getActive(limit) {
      const database = await getDatabase();
      let cursor = database
        .collection<CampaignRecord>(MONGODB_COLLECTIONS.campaigns)
        .find({ status: "active" });

      if (typeof limit === "number") cursor = cursor.limit(limit);
      return cursor.toArray();
    },
  };
}
