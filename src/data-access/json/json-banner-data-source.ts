import bannerData from "@/data/wp-banner.json";
import type { BannerDataSource } from "@/data-access/contracts/banner-data-source.interface";
import type { BannerData, BannerRecord } from "@/interfaces/banner.interface";

const banners = (bannerData as BannerData).banners;
const bannerById = new Map(banners.map((banner) => [banner._id, banner]));

function sortByOrder(items: BannerRecord[]): BannerRecord[] {
  return items.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export const jsonBannerDataSource: BannerDataSource = {
  async getById(bannerId) {
    return bannerById.get(bannerId) ?? null;
  },
  async getByGroup(groupId) {
    return sortByOrder(banners.filter((banner) => banner.groupId === groupId));
  },
  async getByCategory(categoryId) {
    return sortByOrder(banners.filter((banner) => banner.categoryId === categoryId));
  },
};
