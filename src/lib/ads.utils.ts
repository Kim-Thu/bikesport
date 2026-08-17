import wpAds from "@/data/wp-ads.json";
import type { AdsData, AdsRecord, AdsSchedule } from "@/interfaces/ads.interface";
import { getEventById } from "@/lib/event.utils";
import { getPromotionById } from "@/lib/promotion.utils";

const adsByPlacement = new Map<string, AdsRecord[]>();

for (const ad of (wpAds as AdsData).ads) {
  if (ad.status !== "active") continue;
  const placementAds = adsByPlacement.get(ad.placement) ?? [];
  placementAds.push(ad);
  adsByPlacement.set(ad.placement, placementAds);
}

for (const placementAds of adsByPlacement.values()) {
  placementAds.sort((a, b) => b.priority - a.priority);
}

function isWithinRange(now: Date, startAt?: string, endAt?: string): boolean {
  if (startAt && now < new Date(startAt)) return false;
  if (endAt && now > new Date(endAt)) return false;
  return true;
}

function isScheduleActive(schedule: AdsSchedule, now: Date): boolean {
  if (schedule.type === "always") return true;

  if (schedule.type === "fixed") {
    return isWithinRange(now, schedule.startAt, schedule.endAt);
  }

  if (schedule.type === "promotion") {
    const promotion = getPromotionById(schedule.promotionId);
    return Boolean(
      promotion &&
        promotion.status === "active" &&
        isWithinRange(now, promotion.startAt, promotion.endAt),
    );
  }

  const event = getEventById(schedule.eventId);
  return Boolean(
    event &&
      event.status === "published" &&
      isWithinRange(now, event.startAt, event.endAt ?? event.startAt),
  );
}

export function getActiveAdByPlacement(placement: string, now = new Date()): AdsRecord | null {
  return (adsByPlacement.get(placement) ?? []).find((ad) => isScheduleActive(ad.schedule, now)) ?? null;
}
