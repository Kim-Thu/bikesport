import type { AnnouncementRecord } from "@/interfaces/announcement.interface";

export interface AnnouncementDataSource {
  getById(announcementId: string): Promise<AnnouncementRecord | null>;
  getActiveById(announcementId: string): Promise<AnnouncementRecord | null>;
}
