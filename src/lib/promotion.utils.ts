import wpPromotion from "@/data/wp-promotion.json";
import type { PromotionData, PromotionRecord } from "@/interfaces/promotion.interface";

const promotionData = wpPromotion as PromotionData;
const promotionIndex = new Map<string, PromotionRecord>(
  promotionData.promotions.map((promotion) => [promotion._id, promotion]),
);

export function getPromotionById(promotionId?: string | null): PromotionRecord | null {
  if (!promotionId) return null;
  return promotionIndex.get(promotionId) ?? null;
}

export function getActivePromotionById(promotionId?: string | null): PromotionRecord | null {
  const promotion = getPromotionById(promotionId);
  if (!promotion || promotion.status !== "active") return null;
  return promotion;
}
