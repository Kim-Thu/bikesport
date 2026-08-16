import { TabsSlider, type TabsSliderGroup } from "@/components/slider/TabsSlider";
import type { TabsSliderBlockPayload } from "@/interfaces/page-block.interface";
import { getBestSellerProducts, getProductPrimaryMediaId } from "@/lib/product.utils";
import { getActivePromotionsForSku, getPromotionProductPricing } from "@/lib/promotion.utils";

export function TabsSliderBlock({ block }: { block: TabsSliderBlockPayload }) {
  const groups: TabsSliderGroup[] = block.props.source.tabs.map((tab) => ({
    label: tab.label,
    value: tab.categoryId,
    items: getBestSellerProducts(tab.categoryId, block.props.source.limit).map((product) => {
      const activePromotion = getActivePromotionsForSku(product.sku)[0] ?? null;
      const pricing = activePromotion
        ? getPromotionProductPricing(product, activePromotion)
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
    }),
  }));

  return (
    <TabsSlider
      title={block.props.title}
      href={block.props.href}
      actionLabel={block.props.actionLabel}
      groups={groups}
      template={block.props.template}
      trackClassName={block.props.trackClassName}
      slideClassName={block.props.slideClassName}
    />
  );
}
