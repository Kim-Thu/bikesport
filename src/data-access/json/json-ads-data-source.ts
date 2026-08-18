import wpAds from "@/data/wp-ads.json";
import type { AdsDataSource } from "@/data-access/contracts/ads-data-source.interface";
import type { AdsData, AdsRecord } from "@/interfaces/ads.interface";

const activeAdsByPlacement = new Map<string, AdsRecord[]>();

for (const ad of (wpAds as AdsData).ads) {
  if (ad.status !== "active") continue;
  const placementAds = activeAdsByPlacement.get(ad.placement) ?? [];
  placementAds.push(ad);
  activeAdsByPlacement.set(ad.placement, placementAds);
}

for (const placementAds of activeAdsByPlacement.values()) {
  placementAds.sort((a, b) => b.priority - a.priority);
}

export const jsonAdsDataSource: AdsDataSource = {
  async getActiveByPlacement(placement) {
    return activeAdsByPlacement.get(placement) ?? [];
  },
};
