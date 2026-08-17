import type {
  OrderDataSource,
  ProductSalesStatsRecord,
} from "@/data-access/contracts/order-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type { OrderRecord } from "@/interfaces/order.interface";

interface ProductSalesAggregationResult {
  _id: string;
  quantity: number;
  lastPurchasedAt: string;
}

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

    async getCompletedProductSalesStats(skus) {
      const database = await getDatabase();
      const pipeline: Record<string, unknown>[] = [
        { $match: { status: "completed" } },
        { $unwind: "$items" },
      ];

      if (skus?.length) {
        pipeline.push({ $match: { "items.sku": { $in: skus } } });
      }

      pipeline.push(
        {
          $group: {
            _id: "$items.sku",
            quantity: { $sum: "$items.quantity" },
            lastPurchasedAt: { $max: "$createdAt" },
          },
        },
        { $sort: { quantity: -1, lastPurchasedAt: -1 } },
      );

      const rows = await database
        .collection<OrderRecord>(MONGODB_COLLECTIONS.orders)
        .aggregate<ProductSalesAggregationResult>(pipeline)
        .toArray();

      return rows.map<ProductSalesStatsRecord>((row) => ({
        sku: row._id,
        quantity: row.quantity,
        lastPurchasedAt: row.lastPurchasedAt,
      }));
    },
  };
}
