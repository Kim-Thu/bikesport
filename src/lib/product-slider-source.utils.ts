import type { ProductSliderItem } from "@/components/product/ProductSlider";
import type { ProductSliderBlockPayload } from "@/interfaces/page-block.interface";
import { getCategoryTreeIds } from "@/lib/category.utils";
import {
  getProductDiscountPercentage,
  getPublishedProducts,
  getProductPrimaryMediaId,
} from "@/lib/product.utils";
import {
  getActivePromotionById,
  getActivePromotionsForSku,
  getPromotionProductPricing,
  getPromotionProducts,
} from "@/lib/promotion.utils";

export function getProductSliderItems(source: ProductSliderBlockPayload["props"]["source"]): ProductSliderItem[] {
  const promotion = source.type === "promotion" ? getActivePromotionById(source.promotionId) : null;

  const products =
    source.type === "promotion"
      ? promotion
        ? getPromotionProducts(promotion)
        : []
      : source.type === "category"
        ? (() => {
            const categoryIds = new Set(getCategoryTreeIds(source.categoryId));
            return getPublishedProducts().filter((product) =>
              product.categoryIds.some((categoryId) => categoryIds.has(categoryId)),
            );
          })()
        : getPublishedProducts().filter((product) => product.brandId === source.brandId);

  const limitedProducts =
    typeof source.limit === "number" ? products.slice(0, source.limit) : products;

  return limitedProducts.map((product) => {
    const activePromotion = getActivePromotionsForSku(product.sku)[0] ?? null;
    const pricing = activePromotion
      ? getPromotionProductPricing(product, activePromotion)
      : {
          salePrice: product.salePrice,
          discountPercentage: getProductDiscountPercentage(product),
        };
    const inventory = promotion?.inventory?.find((item) => item.sku === product.sku);
    const productBadge = promotion?.productBadges?.find((item) => item.sku === product.sku);

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
    };
  });
}
