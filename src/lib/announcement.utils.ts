import { dataSources } from "@/data-access/data-sources";
import type { AnnouncementRecord } from "@/interfaces/announcement.interface";
import { CACHE_TAG, cachedDomain } from "@/lib/cache.utils";

export async function getAnnouncementById(
  announcementId?: string | null,
): Promise<AnnouncementRecord | null> {
  if (!announcementId) return null;
  return cachedDomain(
    "announcement",
    ["id", announcementId],
    () => dataSources.announcement.getById(announcementId),
    [CACHE_TAG.entity("announcement", announcementId)],
  );
}

export async function getActiveAnnouncementById(
  announcementId?: string | null,
): Promise<AnnouncementRecord | null> {
  if (!announcementId) return null;
  return cachedDomain(
    "announcement",
    ["active-by-id", announcementId],
    () => dataSources.announcement.getActiveById(announcementId),
    [CACHE_TAG.entity("announcement", announcementId)],
  );
}
