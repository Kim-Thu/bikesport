import type { OptionsDataSource } from "@/data-access/contracts/options-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type { SiteOptionsRecord } from "@/interfaces/options.interface";

export function createMongoOptionsDataSource(
  getDatabase: MongoDatabaseProvider,
): OptionsDataSource {
  return {
    async getSiteOptions() {
      const database = await getDatabase();
      return database
        .collection<SiteOptionsRecord>(MONGODB_COLLECTIONS.options)
        .findOne({});
    },
  };
}
