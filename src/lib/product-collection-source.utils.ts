import type { ProductCollectionItem } from "@/interfaces/product-collection-item.interface";
import type { ProductCollectionSource } from "@/interfaces/product-source.interface";
import type { PromotionSession, PromotionSessionStatus } from "@/interfaces/promotion.interface";
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

function getPromotionSessionStatus(session: PromotionSession, now = Date.now()): PromotionSessionStatus {
  const startAt = new Date(session.startAt).getTime();
  const endAt = new Date(session.endAt).getTime();

  if (!Number.isFinite(startAt) || !Number.isFinite(endAt)) return session.status;
  if (now < startAt) return "upcoming";
  if (now > endAt) return "ended";
  return "active";
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
        items: mapProductsToCollectionItems(
          typeof limit === "number" ? promotionProducts.slice(0, limit) : promotionProducts,
          promotion,
        ),
      },
    ];
  }

  const now = Date.now();

  return sessions.map((session) => {
    const sessionProducts = session.skus?.length
      ? promotionProducts.filter((product) => session.skus?.includes(product.sku))
      : promotionProducts;

    return {
      label: session.label,
      value: session._id,
      status: getPromotionSessionStatus(session, now),
      startAt: session.startAt,
      endAt: session.endAt,
      items: mapProductsToCollectionItems(
        typeof limit === "number" ? sessionProducts.slice(0, limit) : sessionProducts,
        promotion,
      ),
    };
  });
}

export function getProductCollectionItems(source: ProductCollectionSource): ProductCollectionItem[] {
  if (source.type === "combo") {
    const combo = getActiveCombos().find((item) => item._id === source.comboId);
    return mapProductsToCollectionItems(combo ? getComboProducts(combo).map(({ product }) => product) : []);
  }

  if (source.type === "best-seller") {
    return mapProductsToCollectionItems(getBestSellerProducts(source.categoryId, source.limit));
  }

  const promotion = source.type === "promotion" ? getActivePromotionById(source.promotionId) : null;
  const products =
    source.type === "promotion"
      ? promotion
        ? getPromotionProducts(promotion)
        : []
      : source.type === "campaign"
        ? getCampaignProducts(source.campaignId, source.categoryId, source.limit)
        : source.type === "category"
          ? (() => {
              const categoryIds = new Set(getCategoryTreeIds(source.categoryId));
              return getPublishedProducts().filter((product) =>
                product.categoryIds.some((categoryId) => categoryIds.has(categoryId)),
              );
            })()
          : getPublishedProducts().filter((product) => product.brandId === source.brandId);

  const limitedProducts =
    source.type === "campaign" || typeof source.limit !== "number" ? products : products.slice(0, source.limit);

  return mapProductsToCollectionItems(limitedProducts, promotion);
}
