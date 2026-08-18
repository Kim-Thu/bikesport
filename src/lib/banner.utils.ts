import { dataSources } from "@/data-access/data-sources";
import type { BannerRecord } from "@/interfaces/banner.interface";
import { CACHE_TAG, cachedDomain } from "@/lib/cache.utils";

function isWithinSchedule(banner: BannerRecord, now = new Date()): boolean {
  const start = banner.startAt ? new Date(banner.startAt) : null;
  const end = banner.endAt ? new Date(banner.endAt) : null;

  if (start && now < start) return false;
  if (end && now > end) return false;
  return true;
}

function isActiveBanner(banner: BannerRecord, now = new Date()): boolean {
  return banner.status === "active" && isWithinSchedule(banner, now);
}

export async function getBannerById(bannerId?: string | null): Promise<BannerRecord | null> {
  if (!bannerId) return null;
  return cachedDomain(
    "banner",
    ["id", bannerId],
    () => dataSources.banner.getById(bannerId),
    [CACHE_TAG.entity("banner", bannerId)],
  );
}

export async function getActiveBannerById(
  bannerId?: string | null,
  now = new Date(),
): Promise<BannerRecord | null> {
  const banner = await getBannerById(bannerId);
  return banner && isActiveBanner(banner, now) ? banner : null;
}

export async function getActiveBannersByGroup(
  groupId?: string | null,
  now = new Date(),
): Promise<BannerRecord[]> {
  if (!groupId) return [];
  const banners = await cachedDomain(
    "banner",
    ["group", groupId],
    () => dataSources.banner.getByGroup(groupId),
  );
  return banners.filter((banner) => isActiveBanner(banner, now));
}

export async function getActiveBannersByCategory(
  categoryId?: string | null,
  now = new Date(),
): Promise<BannerRecord[]> {
  if (!categoryId) return [];
  const banners = await cachedDomain(
    "banner",
    ["category", categoryId],
    () => dataSources.banner.getByCategory(categoryId),
    [CACHE_TAG.entity("category", categoryId)],
  );
  return banners.filter((banner) => isActiveBanner(banner, now));
}
