import { TabsSlider, type TabsSliderGroup } from "@/components/slider/TabsSlider";
import type { TabsSliderBlockPayload } from "@/interfaces/page-block.interface";
import { getActiveBrands } from "@/lib/brand.utils";
import { getProductCollectionItems } from "@/lib/product-collection-source.utils";
import { mapProductsToCollectionItems } from "@/lib/product-collection.utils";
import { getPromotionById, getPromotionProducts } from "@/lib/promotion.utils";

export function TabsSliderBlock({ block }: { block: TabsSliderBlockPayload }) {
  const activeBrands = getActiveBrands();
  const source = block.props.source;
  const isBrandSource = source.type === "brand";
  const isFlashSaleSource = source.type === "flash-sale";
  let groups: TabsSliderGroup[];

  if (source.type === "combo") {
    groups = source.tabs.map((tab) => ({
      label: tab.label,
      value: tab.comboId,
      items: getProductCollectionItems({ type: "combo", comboId: tab.comboId }),
    }));
  } else if (source.type === "brand") {
    groups = source.tabs.map((tab) => {
      const brand = activeBrands.find((item) => item._id === tab.brandId);
      return {
        label: tab.label,
        value: tab.brandId,
        mediaId: brand?.logoMediaId ?? null,
        items: getProductCollectionItems({ type: "brand", brandId: tab.brandId, limit: source.limit }),
      };
    });
  } else if (source.type === "flash-sale") {
    const promotion = getPromotionById(source.promotionId);
    if (!promotion) return null;

    const promotionProducts = getPromotionProducts(promotion);
    const sessions = promotion.sessions ?? [];

    groups = sessions.length
      ? sessions.map((session) => {
          const sessionProducts = session.skus?.length
            ? promotionProducts.filter((product) => session.skus?.includes(product.sku))
            : promotionProducts;

          return {
            label: session.label,
            value: session._id,
            status: session.status,
            startAt: session.startAt,
            endAt: session.endAt,
            items: mapProductsToCollectionItems(
              typeof source.limit === "number" ? sessionProducts.slice(0, source.limit) : sessionProducts,
              promotion,
            ),
          };
        })
      : [
          {
            label: "Hôm nay",
            value: promotion._id,
            status: "active",
            startAt: promotion.startAt,
            endAt: promotion.endAt,
            items: mapProductsToCollectionItems(
              typeof source.limit === "number" ? promotionProducts.slice(0, source.limit) : promotionProducts,
              promotion,
            ),
          },
        ];
  } else {
    groups = source.tabs.map((tab) => ({
      label: tab.label,
      value: tab.categoryId,
      items: getProductCollectionItems({
        type: "best-seller",
        categoryId: tab.categoryId,
        limit: source.limit,
      }),
    }));
  }

  if (!groups.some((group) => group.items.length)) return null;

  return (
    <TabsSlider
      title={block.props.title}
      titleMediaId={block.props.titleMediaId}
      titleAlt={block.props.titleAlt}
      href={block.props.href}
      actionLabel={block.props.actionLabel}
      groups={groups}
      template={block.props.template}
      headingTemplate={
        block.props.headingTemplate ?? (isFlashSaleSource ? "flash-sale" : isBrandSource ? "featured" : "default")
      }
      tabTemplate={
        block.props.tabTemplate ?? (isFlashSaleSource ? "flash-sale" : isBrandSource ? "image" : "default")
      }
      layoutTemplate={
        block.props.layoutTemplate ?? (isFlashSaleSource || isBrandSource ? "featured-showcase" : "default")
      }
      actionTone={block.props.actionTone ?? (isFlashSaleSource ? "danger" : "primary")}
      backgroundMediaId={block.props.backgroundMediaId}
      containerClassName={block.props.containerClassName}
      trackClassName={block.props.trackClassName}
      slideClassName={block.props.slideClassName}
    />
  );
}
