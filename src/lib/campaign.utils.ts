import { dataSources } from "@/data-access/data-sources";
import type { CampaignRecord } from "@/interfaces/campaign.interface";
import type { ProductRecord } from "@/interfaces/product.interface";
import { getCategoryTreeIds } from "@/lib/category.utils";
import { getActivePromotionById, getPromotionProducts } from "@/lib/promotion.utils";

export async function getCampaigns(): Promise<CampaignRecord[]> {
  return dataSources.campaign.getAll();
}

export async function getActiveCampaignById(
  campaignId: string,
): Promise<CampaignRecord | null> {
  const campaign = await dataSources.campaign.getById(campaignId);
  return campaign?.status === "active" ? campaign : null;
}

export async function getCampaignProducts(
  campaignId: string,
  categoryId?: string,
  limit?: number,
): Promise<ProductRecord[]> {
  const campaign = await getActiveCampaignById(campaignId);
  if (!campaign) return [];

  const categoryIds = categoryId ? new Set(await getCategoryTreeIds(categoryId)) : null;
  const promotions = await Promise.all(
    campaign.promotionIds.map((promotionId) => getActivePromotionById(promotionId)),
  );
  const productGroups = await Promise.all(
    promotions.map((promotion) =>
      promotion && promotion.target.type === "product" ? getPromotionProducts(promotion) : Promise.resolve([]),
    ),
  );
  const productsById = new Map<string, ProductRecord>();

  for (const products of productGroups) {
    for (const product of products) {
      if (categoryIds && !product.categoryIds.some((id) => categoryIds.has(id))) continue;
      productsById.set(product._id, product);
    }
  }

  const products = [...productsById.values()];
  return typeof limit === "number" ? products.slice(0, limit) : products;
}
