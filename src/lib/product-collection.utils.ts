import type { ProductCollectionItem } from "@/interfaces/product-collection-item.interface";
import type { ProductRecord } from "@/interfaces/product.interface";
import type { PromotionRecord } from "@/interfaces/promotion.interface";
import { getProductDiscountPercentage, getProductPrimaryMediaId } from "@/lib/product.utils";
import {
  findActivePromotionForProduct,
  getActivePromotions,
  getPromotionProductPricing,
} from "@/lib/promotion.utils";
import { getProductReviewStatsBySku } from "@/lib/review.utils";

const REVIEW_STATS_BY_SKU = getProductReviewStatsBySku();

export async function mapProductsToCollectionItems(
  products: ProductRecord[],
  explicitPromotion?: PromotionRecord | null,
): Promise<ProductCollectionItem[]> {
  const activePromotions = explicitPromotion ? [] : await getActivePromotions();

  return products.map((product) => {
    const promotion = explicitPromotion ?? findActivePromotionForProduct(product, activePromotions);
    const pricing = promotion
      ? getPromotionProductPricing(product, promotion)
      : {
          salePrice: product.salePrice,
          discountPercentage: getProductDiscountPercentage(product),
        };
    const inventory = promotion?.inventory?.find((item) => item.sku === product.sku);
    const productBadge = promotion?.productBadges?.find((item) => item.sku === product.sku);
    const reviewStats = REVIEW_STATS_BY_SKU.get(product.sku);

    return {
      _key: product.sku,
      title: product.name,
      href: `/san-pham/${product.slug}`,
      mediaId: getProductPrimaryMediaId(product),
      price: product.price,
      salePrice: pricing.salePrice,
      discountPercentage: pricing.discountPercentage,
      stockRemaining: inventory ? Math.min(product.stock, inventory.total) : undefined,
      stockTotal: inventory?.total,
      promotionBadgeMediaId: productBadge?.mediaId,
      promotionBadgeAlt: productBadge?.alt,
      rating: reviewStats?.averageRating,
      reviewCount: reviewStats?.reviewCount,
    };
  });
}
