import type { StoreDataSource } from "@/data-access/contracts/store-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type {
  StoreLocationRecord,
  StoreRecord,
  StoreRegionRecord,
} from "@/interfaces/store.interface";

export function createMongoStoreDataSource(getDatabase: MongoDatabaseProvider): StoreDataSource {
  return {
    async getActiveRegions() {
      const db = await getDatabase();
      return db
        .collection<StoreRegionRecord>(MONGODB_COLLECTIONS.storeRegions)
        .find({ status: "active" })
        .sort({ order: 1 })
        .toArray();
    },
    async getActiveRegionById(regionId) {
      const db = await getDatabase();
      return db
        .collection<StoreRegionRecord>(MONGODB_COLLECTIONS.storeRegions)
        .findOne({ _id: regionId, status: "active" });
    },
    async getActiveLocations(type) {
      const db = await getDatabase();
      return db
        .collection<StoreLocationRecord>(MONGODB_COLLECTIONS.storeLocations)
        .find(type ? { status: "active", type } : { status: "active" })
        .sort({ order: 1 })
        .toArray();
    },
    async getActiveLocationById(locationId) {
      const db = await getDatabase();
      return db
        .collection<StoreLocationRecord>(MONGODB_COLLECTIONS.storeLocations)
        .findOne({ _id: locationId, status: "active" });
    },
    async getActiveLocationChildren(parentId) {
      const db = await getDatabase();
      return db
        .collection<StoreLocationRecord>(MONGODB_COLLECTIONS.storeLocations)
        .find({ status: "active", parentId })
        .sort({ order: 1 })
        .toArray();
    },
    async getActiveStores(limit) {
      const db = await getDatabase();
      let cursor = db
        .collection<StoreRecord>(MONGODB_COLLECTIONS.stores)
        .find({ status: "active" })
        .sort({ order: 1 });
      if (typeof limit === "number") cursor = cursor.limit(limit);
      return cursor.toArray();
    },
    async getFeaturedStores(limit) {
      const db = await getDatabase();
      let cursor = db
        .collection<StoreRecord>(MONGODB_COLLECTIONS.stores)
        .find({ status: "active", featured: true })
        .sort({ order: 1 });
      if (typeof limit === "number") cursor = cursor.limit(limit);
      return cursor.toArray();
    },
    async getActiveStoresByRegion(regionId, limit) {
      const db = await getDatabase();
      let cursor = db
        .collection<StoreRecord>(MONGODB_COLLECTIONS.stores)
        .find({ status: "active", regionId })
        .sort({ order: 1 });
      if (typeof limit === "number") cursor = cursor.limit(limit);
      return cursor.toArray();
    },
    async getActiveStoresByLocationIds(locationIds, limit) {
      if (!locationIds.length) return [];
      const db = await getDatabase();
      let cursor = db
        .collection<StoreRecord>(MONGODB_COLLECTIONS.stores)
        .find({ status: "active", locationId: { $in: locationIds } })
        .sort({ order: 1 });
      if (typeof limit === "number") cursor = cursor.limit(limit);
      return cursor.toArray();
    },
  };
}
