import type { ProductCollectionItem } from "@/interfaces/product-collection-item.interface";
import type { ProductSliderBlockPayload } from "@/interfaces/page-block.interface";
import { getCampaignProducts } from "@/lib/campaign.utils";
import { getCategoryTreeIds } from "@/lib/category.utils";
import { mapProductsToCollectionItems } from "@/lib/product-collection.utils";
import { getPublishedProducts } from "@/lib/product.utils";
import { getActivePromotionById, getPromotionProducts } from "@/lib/promotion.utils";

export function getProductSliderItems(
  source: ProductSliderBlockPayload["props"]["source"],
): ProductCollectionItem[] {
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
