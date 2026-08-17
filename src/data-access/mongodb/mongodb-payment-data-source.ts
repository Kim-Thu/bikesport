import type { PaymentDataSource } from "@/data-access/contracts/payment-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type { PaymentMethod } from "@/interfaces/payment.interface";

export function createMongoPaymentDataSource(
  getDatabase: MongoDatabaseProvider,
): PaymentDataSource {
  return {
    async getEnabled() {
      const database = await getDatabase();
      return database
        .collection<PaymentMethod>(MONGODB_COLLECTIONS.payments)
        .find({ enabled: { $ne: false } })
        .sort({ order: 1 })
        .toArray();
    },
  };
}
