import type { ComboDataSource } from "@/data-access/contracts/combo-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type { ComboRecord } from "@/interfaces/combo.interface";

export function createMongoComboDataSource(getDatabase: MongoDatabaseProvider): ComboDataSource {
  return {
    async getById(comboId) {
      const db = await getDatabase();
      return db.collection<ComboRecord>(MONGODB_COLLECTIONS.combos).findOne({ _id: comboId });
    },
    async getActive(limit) {
      const db = await getDatabase();
      let cursor = db
        .collection<ComboRecord>(MONGODB_COLLECTIONS.combos)
        .find({ status: "active" })
        .sort({ order: 1 });
      if (typeof limit === "number") cursor = cursor.limit(limit);
      return cursor.toArray();
    },
    async getFeatured(limit) {
      const db = await getDatabase();
      let cursor = db
        .collection<ComboRecord>(MONGODB_COLLECTIONS.combos)
        .find({ status: "active", featured: true })
        .sort({ order: 1 });
      if (typeof limit === "number") cursor = cursor.limit(limit);
      return cursor.toArray();
    },
  };
}
