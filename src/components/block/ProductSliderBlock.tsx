import { ProductSlider, type ProductSliderItem } from "@/components/product/ProductSlider";
import type { ProductSliderBlockPayload } from "@/interfaces/page-block.interface";
import { getProductPrimaryMediaId } from "@/lib/product.utils";
import {
  getActivePromotionById,
  getPromotionProductPricing,
  getPromotionProducts,
} from "@/lib/promotion.utils";

export function ProductSliderBlock({ block }: { block: ProductSliderBlockPayload }) {
  if (block.props.source.type !== "promotion") return null;

  const promotion = getActivePromotionById(block.props.source.promotionId);
  if (!promotion) return null;

  const items: ProductSliderItem[] = getPromotionProducts(promotion, block.props.source.limit).map((product) => {
    const pricing = getPromotionProductPricing(product, promotion);

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

  return (
    <ProductSlider
      items={items}
      template={block.props.template}
      ariaLabel={block.props.ariaLabel ?? `Sản phẩm ${promotion.name}`}
      trackClassName={block.props.trackClassName}
      slideClassName={block.props.slideClassName}
    />
  );
}
