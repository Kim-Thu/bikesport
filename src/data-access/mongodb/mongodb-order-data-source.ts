import type { OrderDataSource } from "@/data-access/contracts/order-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type { OrderRecord } from "@/interfaces/order.interface";

export function createMongoOrderDataSource(
  getDatabase: MongoDatabaseProvider,
): OrderDataSource {
  return {
    async getById(id) {
      const database = await getDatabase();
      return database
        .collection<OrderRecord>(MONGODB_COLLECTIONS.orders)
        .findOne({ _id: id });
    },

    async getByOrderNumber(orderNumber) {
      const database = await getDatabase();
      return database
        .collection<OrderRecord>(MONGODB_COLLECTIONS.orders)
        .findOne({ orderNumber });
    },

    async getByStatus(status) {
      const database = await getDatabase();
      return database
        .collection<OrderRecord>(MONGODB_COLLECTIONS.orders)
        .find({ status })
        .sort({ createdAt: -1 })
        .toArray();
    },

    async getRecent(limit = 20) {
      const database = await getDatabase();
      return database
        .collection<OrderRecord>(MONGODB_COLLECTIONS.orders)
        .find()
        .sort({ createdAt: -1 })
        .limit(Math.max(0, limit))
        .toArray();
    },
  };
}
