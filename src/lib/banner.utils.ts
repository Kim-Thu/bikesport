import wpBanner from "@/data/wp-banner.json";
import type { BannerData, BannerRecord } from "@/interfaces/banner.interface";

const bannerData = wpBanner as BannerData;
const bannerIndex = new Map<string, BannerRecord>(bannerData.banners.map((banner) => [banner._id, banner]));

function isWithinSchedule(banner: BannerRecord): boolean {
  const now = Date.now();
  const start = banner.startAt ? new Date(banner.startAt).getTime() : undefined;
  const end = banner.endAt ? new Date(banner.endAt).getTime() : undefined;

  if (start !== undefined && now < start) return false;
  if (end !== undefined && now > end) return false;
  return true;
}

function isActiveBanner(banner: BannerRecord): boolean {
  return banner.status === "active" && isWithinSchedule(banner);
}

function sortByOrder(banners: BannerRecord[]): BannerRecord[] {
  return banners.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getBannerById(bannerId?: string | null): BannerRecord | null {
  if (!bannerId) return null;
  return bannerIndex.get(bannerId) ?? null;
}

export function getActiveBannerById(bannerId?: string | null): BannerRecord | null {
  const banner = getBannerById(bannerId);
  if (!banner || !isActiveBanner(banner)) return null;
  return banner;
}

export function getActiveBannersByGroup(groupId?: string | null): BannerRecord[] {
  if (!groupId) return [];

  return sortByOrder(
    bannerData.banners.filter((banner) => banner.groupId === groupId && isActiveBanner(banner)),
  );
}

export function getActiveBannersByCategory(categoryId?: string | null): BannerRecord[] {
  if (!categoryId) return [];

  return sortByOrder(
    bannerData.banners.filter(
      (banner) => banner.categoryId === categoryId && isActiveBanner(banner),
    ),
  );
}
