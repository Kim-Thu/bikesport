import { dataSources } from "@/data-access/data-sources";
import type { AnnouncementRecord } from "@/interfaces/announcement.interface";

export async function getAnnouncementById(
  announcementId?: string | null,
): Promise<AnnouncementRecord | null> {
  if (!announcementId) return null;
  return dataSources.announcement.getById(announcementId);
}

export async function getActiveAnnouncementById(
  announcementId?: string | null,
): Promise<AnnouncementRecord | null> {
  if (!announcementId) return null;
  return dataSources.announcement.getActiveById(announcementId);
}
