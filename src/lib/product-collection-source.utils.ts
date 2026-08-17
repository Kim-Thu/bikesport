import type { ProductCollectionItem } from "@/interfaces/product-collection-item.interface";
import type { ProductCollectionSource } from "@/interfaces/product-source.interface";
import type { PromotionSessionStatus } from "@/interfaces/promotion.interface";
import { getCampaignProducts } from "@/lib/campaign.utils";
import { getCategoryTreeIds } from "@/lib/category.utils";
import { getActiveCombos, getComboProducts } from "@/lib/combo.utils";
import { mapProductsToCollectionItems } from "@/lib/product-collection.utils";
import { getBestSellerProducts, getPublishedProducts } from "@/lib/product.utils";
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

export function getPromotionSessionCollectionGroups(
  promotionId: string,
  limit?: number,
): PromotionSessionCollectionGroup[] {
  const promotion = getPromotionById(promotionId);
  if (!promotion) return [];

  const promotionProducts = getPromotionProducts(promotion);
  const sessions = promotion.sessions ?? [];

  if (!sessions.length) {
    return [
      {
        label: "Hôm nay",
        value: promotion._id,
        status: "active",
        startAt: promotion.startAt,
        endAt: promotion.endAt,
        items: mapProductsToCollectionItems(takeLimit(promotionProducts, limit), promotion),
      },
    ];
  }

  return sessions.map((session) => {
    const sessionProducts = session.skus?.length
      ? promotionProducts.filter((product) => session.skus?.includes(product.sku))
      : promotionProducts;

    return {
      label: session.label,
      value: session._id,
      status: session.status,
      startAt: session.startAt,
      endAt: session.endAt,
      items: mapProductsToCollectionItems(takeLimit(sessionProducts, limit), promotion),
    };
  });
}

function resolveComboCollection(source: Extract<ProductCollectionSource, { type: "combo" }>): ProductCollectionItem[] {
  const combo = getActiveCombos().find((item) => item._id === source.comboId);
  const products = combo ? getComboProducts(combo).map(({ product }) => product) : [];
  return mapProductsToCollectionItems(products);
}

function resolveBestSellerCollection(
  source: Extract<ProductCollectionSource, { type: "best-seller" }>,
): ProductCollectionItem[] {
  return mapProductsToCollectionItems(getBestSellerProducts(source.categoryId, source.limit));
}

function resolvePromotionCollection(
  source: Extract<ProductCollectionSource, { type: "promotion" }>,
): ProductCollectionItem[] {
  const promotion = getActivePromotionById(source.promotionId);
  if (!promotion) return [];

  return mapProductsToCollectionItems(takeLimit(getPromotionProducts(promotion), source.limit), promotion);
}

function resolveCampaignCollection(
  source: Extract<ProductCollectionSource, { type: "campaign" }>,
): ProductCollectionItem[] {
  return mapProductsToCollectionItems(
    getCampaignProducts(source.campaignId, source.categoryId, source.limit),
  );
}

function resolveCategoryCollection(
  source: Extract<ProductCollectionSource, { type: "category" }>,
): ProductCollectionItem[] {
  const categoryIds = new Set(getCategoryTreeIds(source.categoryId));
  const products = getPublishedProducts().filter((product) =>
    product.categoryIds.some((categoryId) => categoryIds.has(categoryId)),
  );

  return mapProductsToCollectionItems(takeLimit(products, source.limit));
}

function resolveBrandCollection(
  source: Extract<ProductCollectionSource, { type: "brand" }>,
): ProductCollectionItem[] {
  const products = getPublishedProducts().filter((product) => product.brandId === source.brandId);
  return mapProductsToCollectionItems(takeLimit(products, source.limit));
}

export function getProductCollectionItems(source: ProductCollectionSource): ProductCollectionItem[] {
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
