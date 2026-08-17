import promotionData from "@/data/wp-promotion.json";
import type { PromotionDataSource } from "@/data-access/contracts/promotion-data-source.interface";
import type { PromotionData, PromotionRecord } from "@/interfaces/promotion.interface";

const promotions = (promotionData as PromotionData).promotions;
const promotionById = new Map(promotions.map((promotion) => [promotion._id, promotion]));
const activePromotions = promotions
  .filter((promotion) => promotion.status === "active")
  .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

export const jsonPromotionDataSource: PromotionDataSource = {
  async getById(promotionId) {
    return promotionById.get(promotionId) ?? null;
  },
  async getActive() {
    return activePromotions;
  },
};
