import type { UserDataSource } from "@/data-access/contracts/user-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type { UserRecord } from "@/interfaces/user.interface";

export function createMongoUserDataSource(getDatabase: MongoDatabaseProvider): UserDataSource {
  return {
    async getActiveById(userId) {
      const db = await getDatabase();
      return db.collection<UserRecord>(MONGODB_COLLECTIONS.users).findOne({
        _id: userId,
        status: "active",
      });
    },
  };
}
