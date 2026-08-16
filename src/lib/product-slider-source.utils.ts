import type { ProductSliderItem } from "@/components/product/ProductSlider";
import type { ProductSliderBlockPayload } from "@/interfaces/page-block.interface";
import { getCategoryTreeIds } from "@/lib/category.utils";
import { getPublishedProducts, getProductPrimaryMediaId } from "@/lib/product.utils";
import {
  getActivePromotionById,
  getActivePromotionsForSku,
  getPromotionProductPricing,
  getPromotionProducts,
} from "@/lib/promotion.utils";

export function getProductSliderItems(source: ProductSliderBlockPayload["props"]["source"]): ProductSliderItem[] {
  const products =
    source.type === "promotion"
      ? (() => {
          const promotion = getActivePromotionById(source.promotionId);
          return promotion ? getPromotionProducts(promotion, source.limit) : [];
        })()
      : source.type === "category"
        ? (() => {
            const categoryIds = new Set(getCategoryTreeIds(source.categoryId));
            const items = getPublishedProducts().filter((product) =>
              product.categoryIds.some((categoryId) => categoryIds.has(categoryId)),
            );
            return typeof source.limit === "number" ? items.slice(0, source.limit) : items;
          })()
        : (() => {
            const items = getPublishedProducts().filter((product) => product.brandId === source.brandId);
            return typeof source.limit === "number" ? items.slice(0, source.limit) : items;
          })();

  return products.map((product) => {
    const promotion =
      source.type === "promotion"
        ? getActivePromotionById(source.promotionId)
        : getActivePromotionsForSku(product.sku)[0] ?? null;
    const pricing = promotion
      ? getPromotionProductPricing(product, promotion)
      : { salePrice: null, discountPercentage: null };

    return {
      _key: product.sku,
      title: product.name,
      href: `/san-pham/${product.slug}`,
      mediaId: getProductPrimaryMediaId(product),
      price: product.price,
      salePrice: pricing.salePrice,
      discountPercentage: pricing.discountPercentage,
    };
  });
}
