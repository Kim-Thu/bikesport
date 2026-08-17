import type { EventDataSource } from "@/data-access/contracts/event-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type { EventRecord } from "@/interfaces/event.interface";

export function createMongoEventDataSource(getDatabase: MongoDatabaseProvider): EventDataSource {
  return {
    async getById(eventId) {
      const db = await getDatabase();
      return db.collection<EventRecord>(MONGODB_COLLECTIONS.events).findOne({ _id: eventId });
    },
    async getFeaturedPublished(limit) {
      const db = await getDatabase();
      let cursor = db
        .collection<EventRecord>(MONGODB_COLLECTIONS.events)
        .find({ status: "published", featured: true })
        .sort({ startAt: 1 });
      if (typeof limit === "number") cursor = cursor.limit(limit);
      return cursor.toArray();
    },
  };
}
