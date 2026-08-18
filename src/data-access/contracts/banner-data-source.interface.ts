import type { BannerRecord } from "@/interfaces/banner.interface";

export interface BannerDataSource {
  getById(bannerId: string): Promise<BannerRecord | null>;
  getByGroup(groupId: string): Promise<BannerRecord[]>;
  getByCategory(categoryId: string): Promise<BannerRecord[]>;
}
