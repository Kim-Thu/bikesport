import type { ProductCollectionItem } from "@/interfaces/product-collection-item.interface";
import type { ProductCollectionSource } from "@/interfaces/product-source.interface";
import type { PromotionSessionStatus } from "@/interfaces/promotion.interface";
import { getCampaignProducts } from "@/lib/campaign.utils";
import { getCategoryTreeIds } from "@/lib/category.utils";
import { getComboById, getComboProducts } from "@/lib/combo.utils";
import { mapProductsToCollectionItems } from "@/lib/product-collection.utils";
import {
  getBestSellerProducts,
  getPublishedProductsByBrandId,
  getPublishedProductsByCategoryIds,
} from "@/lib/product.utils";
import { getActivePromotionById, getPromotionById, getPromotionProducts } from "@/lib/promotion.utils";

export interface PromotionSessionCollectionGroup {
  label: string;
  value: string;
  status: PromotionSessionStatus;
  startAt?: string;
  endAt?: string;
  items: ProductCollectionItem[];
}

function takeLimit<T>(items: T[], limit?: number): T[] {
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export async function getPromotionSessionCollectionGroups(
  promotionId: string,
  limit?: number,
): Promise<PromotionSessionCollectionGroup[]> {
  const promotion = await getPromotionById(promotionId);
  if (!promotion) return [];

  const promotionProducts = await getPromotionProducts(promotion);
  const sessions = promotion.sessions ?? [];

  if (!sessions.length) {
    return [
      {
        label: "Hôm nay",
        value: promotion._id,
        status: "active",
        startAt: promotion.startAt,
        endAt: promotion.endAt,
        items: await mapProductsToCollectionItems(takeLimit(promotionProducts, limit), promotion),
      },
    ];
  }

  return Promise.all(
    sessions.map(async (session) => {
      const sessionProducts = session.skus?.length
        ? promotionProducts.filter((product) => session.skus?.includes(product.sku))
        : promotionProducts;

      return {
        label: session.label,
        value: session._id,
        status: session.status,
        startAt: session.startAt,
        endAt: session.endAt,
        items: await mapProductsToCollectionItems(takeLimit(sessionProducts, limit), promotion),
      };
    }),
  );
}

async function resolveComboCollection(
  source: Extract<ProductCollectionSource, { type: "combo" }>,
): Promise<ProductCollectionItem[]> {
  const combo = await getComboById(source.comboId);
  if (!combo || combo.status !== "active") return [];

  const products = (await getComboProducts(combo)).map(({ product }) => product);
  return mapProductsToCollectionItems(products);
}

async function resolveBestSellerCollection(
  source: Extract<ProductCollectionSource, { type: "best-seller" }>,
): Promise<ProductCollectionItem[]> {
  return mapProductsToCollectionItems(await getBestSellerProducts(source.categoryId, source.limit));
}

async function resolvePromotionCollection(
  source: Extract<ProductCollectionSource, { type: "promotion" }>,
): Promise<ProductCollectionItem[]> {
  const promotion = await getActivePromotionById(source.promotionId);
  if (!promotion) return [];

  const products = await getPromotionProducts(promotion, source.limit);
  return mapProductsToCollectionItems(products, promotion);
}

async function resolveCampaignCollection(
  source: Extract<ProductCollectionSource, { type: "campaign" }>,
): Promise<ProductCollectionItem[]> {
  return mapProductsToCollectionItems(
    await getCampaignProducts(source.campaignId, source.categoryId, source.limit),
  );
}

async function resolveCategoryCollection(
  source: Extract<ProductCollectionSource, { type: "category" }>,
): Promise<ProductCollectionItem[]> {
  const categoryIds = await getCategoryTreeIds(source.categoryId);
  const products = await getPublishedProductsByCategoryIds(categoryIds, source.limit);
  return mapProductsToCollectionItems(products);
}

async function resolveBrandCollection(
  source: Extract<ProductCollectionSource, { type: "brand" }>,
): Promise<ProductCollectionItem[]> {
  return mapProductsToCollectionItems(
    await getPublishedProductsByBrandId(source.brandId, source.limit),
  );
}

export async function getProductCollectionItems(
  source: ProductCollectionSource,
): Promise<ProductCollectionItem[]> {
  switch (source.type) {
    case "combo":
      return resolveComboCollection(source);
    case "best-seller":
      return resolveBestSellerCollection(source);
    case "promotion":
      return resolvePromotionCollection(source);
    case "campaign":
      return resolveCampaignCollection(source);
    case "category":
      return resolveCategoryCollection(source);
    case "brand":
      return resolveBrandCollection(source);
  }
}
