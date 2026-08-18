import announcementData from "@/data/wp-announcement.json";
import type { AnnouncementDataSource } from "@/data-access/contracts/announcement-data-source.interface";
import type { AnnouncementData, AnnouncementRecord } from "@/interfaces/announcement.interface";

const announcements = (announcementData as AnnouncementData).announcements;
const announcementById = new Map<string, AnnouncementRecord>(
  announcements.map((announcement) => [announcement._id, announcement]),
);

export const jsonAnnouncementDataSource: AnnouncementDataSource = {
  async getById(announcementId) {
    return announcementById.get(announcementId) ?? null;
  },
  async getActiveById(announcementId) {
    const announcement = announcementById.get(announcementId) ?? null;
    return announcement?.status === "active" ? announcement : null;
  },
};
