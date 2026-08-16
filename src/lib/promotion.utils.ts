import wpPromotion from "@/data/wp-promotion.json";
import type { PromotionData, PromotionRecord } from "@/interfaces/promotion.interface";

const promotionData = wpPromotion as PromotionData;
const promotionIndex = new Map<string, PromotionRecord>(
  promotionData.promotions.map((promotion) => [promotion._id, promotion]),
);

function isPromotionActive(promotion: PromotionRecord, now: Date = new Date()): boolean {
  if (promotion.status !== "active") return false;

  const timestamp = now.getTime();
  const startAt = promotion.startAt ? new Date(promotion.startAt).getTime() : null;
  const endAt = promotion.endAt ? new Date(promotion.endAt).getTime() : null;

  if (startAt !== null && Number.isFinite(startAt) && timestamp < startAt) return false;
  if (endAt !== null && Number.isFinite(endAt) && timestamp > endAt) return false;

  return true;
}

export function getPromotionById(promotionId?: string | null): PromotionRecord | null {
  if (!promotionId) return null;
  return promotionIndex.get(promotionId) ?? null;
}

export function getActivePromotionById(
  promotionId?: string | null,
  now: Date = new Date(),
): PromotionRecord | null {
  const promotion = getPromotionById(promotionId);
  return promotion && isPromotionActive(promotion, now) ? promotion : null;
}

export function getActivePromotionsForProduct(
  productId: string,
  now: Date = new Date(),
): PromotionRecord[] {
  return promotionData.promotions
    .filter((promotion) => {
      if (!isPromotionActive(promotion, now)) return false;
      if (promotion.target.excludeProductIds?.includes(productId)) return false;

      if (promotion.target.type === "cart") return true;
      return promotion.target.productIds?.includes(productId) ?? false;
    })
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
}
