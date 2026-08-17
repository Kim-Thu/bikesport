import type { PromotionRecord } from "@/interfaces/promotion.interface";

export interface PromotionDataSource {
  getById(promotionId: string): Promise<PromotionRecord | null>;
  getActive(): Promise<PromotionRecord[]>;
}
