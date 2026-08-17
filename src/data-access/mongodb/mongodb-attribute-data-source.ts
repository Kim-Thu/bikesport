import type { AttributeDataSource } from "@/data-access/contracts/attribute-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type { AttributeRecord } from "@/interfaces/attribute.interface";

export function createMongoAttributeDataSource(
  getDatabase: MongoDatabaseProvider,
): AttributeDataSource {
  return {
    async getById(id) {
      const database = await getDatabase();
      return database
        .collection<AttributeRecord>(MONGODB_COLLECTIONS.attributes)
        .findOne({ _id: id });
    },
    async getActive() {
      const database = await getDatabase();
      return database
        .collection<AttributeRecord>(MONGODB_COLLECTIONS.attributes)
        .find({ status: "active" })
        .sort({ name: 1 })
        .toArray();
    },
    async getActiveBySlug(slug) {
      const database = await getDatabase();
      return database
        .collection<AttributeRecord>(MONGODB_COLLECTIONS.attributes)
        .findOne({ slug, status: "active" });
    },
  };
}
