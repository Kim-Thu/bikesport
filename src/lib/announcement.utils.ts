import wpAnnouncement from "@/data/wp-announcement.json";
import type { AnnouncementData, AnnouncementRecord } from "@/interfaces/announcement.interface";

const announcementData = wpAnnouncement as AnnouncementData;
const announcementIndex = new Map<string, AnnouncementRecord>(
  announcementData.announcements.map((announcement) => [announcement._id, announcement]),
);

export function getAnnouncementById(announcementId?: string | null): AnnouncementRecord | null {
  if (!announcementId) return null;
  return announcementIndex.get(announcementId) ?? null;
}

export function getActiveAnnouncementById(announcementId?: string | null): AnnouncementRecord | null {
  const announcement = getAnnouncementById(announcementId);
  if (!announcement || announcement.status !== "active") return null;
  return announcement;
}
