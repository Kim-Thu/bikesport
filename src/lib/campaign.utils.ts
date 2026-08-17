import campaignData from "@/data/wp-campain.json";
import type { CampaignRecord } from "@/interfaces/campaign.interface";
import type { ProductRecord } from "@/interfaces/product.interface";
import { getCategoryTreeIds } from "@/lib/category.utils";
import { getActivePromotionById, getPromotionProducts } from "@/lib/promotion.utils";

export function getCampaigns() {
  return campaignData.campaigns as CampaignRecord[];
}

export function getActiveCampaignById(campaignId: string) {
  return getCampaigns().find(
    (campaign) => campaign._id === campaignId && campaign.status === "active",
  ) ?? null;
}

export function getCampaignProducts(
  campaignId: string,
  categoryId?: string,
  limit?: number,
): ProductRecord[] {
  const campaign = getActiveCampaignById(campaignId);
  if (!campaign) return [];

  const categoryIds = categoryId ? new Set(getCategoryTreeIds(categoryId)) : null;
  const productsById = new Map<string, ProductRecord>();

  campaign.promotionIds.forEach((promotionId) => {
    const promotion = getActivePromotionById(promotionId);
    if (!promotion || promotion.target.type !== "product") return;

    getPromotionProducts(promotion).forEach((product) => {
      if (categoryIds && !product.categoryIds.some((id) => categoryIds.has(id))) return;
      productsById.set(product._id, product);
    });
  });

  const products = [...productsById.values()];
  return typeof limit === "number" ? products.slice(0, limit) : products;
}
