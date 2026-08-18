import type { AnnouncementDataSource } from "@/data-access/contracts/announcement-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type { AnnouncementRecord } from "@/interfaces/announcement.interface";

export function createMongoAnnouncementDataSource(
  getDatabase: MongoDatabaseProvider,
): AnnouncementDataSource {
  return {
    async getById(announcementId) {
      const database = await getDatabase();
      return database
        .collection<AnnouncementRecord>(MONGODB_COLLECTIONS.announcements)
        .findOne({ _id: announcementId });
    },
    async getActiveById(announcementId) {
      const database = await getDatabase();
      return database
        .collection<AnnouncementRecord>(MONGODB_COLLECTIONS.announcements)
        .findOne({ _id: announcementId, status: "active" });
    },
  };
}
