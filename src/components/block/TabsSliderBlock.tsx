import { TabsSlider, type TabsSliderGroup } from "@/components/slider/TabsSlider";
import type { TabsSliderBlockPayload } from "@/interfaces/page-block.interface";
import { getActiveBrands } from "@/lib/brand.utils";
import { getProductCollectionItems } from "@/lib/product-collection-source.utils";

export function TabsSliderBlock({ block }: { block: TabsSliderBlockPayload }) {
  const activeBrands = getActiveBrands();
  const isBrandSource = block.props.source.type === "brand";

  const groups: TabsSliderGroup[] =
    block.props.source.type === "combo"
      ? block.props.source.tabs.map((tab) => ({
          label: tab.label,
          value: tab.comboId,
          items: getProductCollectionItems({ type: "combo", comboId: tab.comboId }),
        }))
      : block.props.source.type === "brand"
        ? block.props.source.tabs.map((tab) => {
            const brand = activeBrands.find((item) => item._id === tab.brandId);
            return {
              label: tab.label,
              value: tab.brandId,
              mediaId: brand?.logoMediaId ?? null,
              items: getProductCollectionItems({
                type: "brand",
                brandId: tab.brandId,
                limit: block.props.source.limit,
              }),
            };
          })
        : block.props.source.tabs.map((tab) => ({
            label: tab.label,
            value: tab.categoryId,
            items: getProductCollectionItems({
              type: "best-seller",
              categoryId: tab.categoryId,
              limit: block.props.source.limit,
            }),
          }));

  return (
    <TabsSlider
      title={block.props.title}
      titleMediaId={block.props.titleMediaId}
      titleAlt={block.props.titleAlt}
      href={block.props.href}
      actionLabel={block.props.actionLabel}
      groups={groups}
      template={block.props.template}
      headingTemplate={block.props.headingTemplate ?? (isBrandSource ? "featured" : "default")}
      tabTemplate={block.props.tabTemplate ?? (isBrandSource ? "image" : "default")}
      layoutTemplate={block.props.layoutTemplate ?? (isBrandSource ? "featured-showcase" : "default")}
      backgroundMediaId={block.props.backgroundMediaId}
      containerClassName={block.props.containerClassName}
      trackClassName={block.props.trackClassName}
      slideClassName={block.props.slideClassName}
    />
  );
}
