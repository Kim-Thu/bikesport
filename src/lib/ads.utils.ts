import wpAds from "@/data/wp-ads.json";
import wpEvent from "@/data/wp-event.json";
import wpPromotion from "@/data/wp-promotion.json";
import type { AdsData, AdsRecord, AdsSchedule } from "@/interfaces/ads.interface";
import type { EventData } from "@/interfaces/event.interface";
import type { PromotionData } from "@/interfaces/promotion.interface";

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
    const promotion = (wpPromotion as PromotionData).promotions.find(
      (item) => item._id === schedule.promotionId,
    );

    return Boolean(
      promotion &&
        promotion.status === "active" &&
        isWithinRange(now, promotion.startAt, promotion.endAt),
    );
  }

  const event = (wpEvent as EventData).events.find((item) => item._id === schedule.eventId);
  return Boolean(
    event &&
      event.status === "published" &&
      isWithinRange(now, event.startAt, event.endAt ?? event.startAt),
  );
}

export function getActiveAdByPlacement(placement: string, now = new Date()): AdsRecord | null {
  return (
    (wpAds as AdsData).ads
      .filter(
        (ad) => ad.status === "active" && ad.placement === placement && isScheduleActive(ad.schedule, now),
      )
      .sort((a, b) => b.priority - a.priority)[0] ?? null
  );
}
