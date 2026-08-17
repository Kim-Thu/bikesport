import { dataSources } from "@/data-access/data-sources";
import type { AdsRecord, AdsSchedule } from "@/interfaces/ads.interface";
import { getEventById } from "@/lib/event.utils";
import { getPromotionById } from "@/lib/promotion.utils";

function isWithinRange(now: Date, startAt?: string, endAt?: string): boolean {
  if (startAt && now < new Date(startAt)) return false;
  if (endAt && now > new Date(endAt)) return false;
  return true;
}

async function isScheduleActive(schedule: AdsSchedule, now: Date): Promise<boolean> {
  if (schedule.type === "always") return true;

  if (schedule.type === "fixed") {
    return isWithinRange(now, schedule.startAt, schedule.endAt);
  }

  if (schedule.type === "promotion") {
    const promotion = await getPromotionById(schedule.promotionId);
    return Boolean(
      promotion &&
        promotion.status === "active" &&
        isWithinRange(now, promotion.startAt, promotion.endAt),
    );
  }

  const event = await getEventById(schedule.eventId);
  return Boolean(
    event &&
      event.status === "published" &&
      isWithinRange(now, event.startAt, event.endAt ?? event.startAt),
  );
}

export async function getActiveAdByPlacement(
  placement: string,
  now = new Date(),
): Promise<AdsRecord | null> {
  const ads = await dataSources.ads.getActiveByPlacement(placement);

  for (const ad of ads) {
    if (await isScheduleActive(ad.schedule, now)) return ad;
  }

  return null;
}
