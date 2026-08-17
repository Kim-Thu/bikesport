import { EmptyContent } from "@/components/empty-content/EmptyContent";
import { TabsSlider } from "@/components/slider/TabsSlider";
import type { TabsSliderBlockPayload } from "@/interfaces/page-block.interface";
import { getTabsSliderGroups } from "@/lib/tabs-slider-source.utils";

export function TabsSliderBlock({ block }: { block: TabsSliderBlockPayload }) {
  const source = block.props.source;
  const isBrandSource = source.type === "brand";
  const isFlashSaleSource = source.type === "flash-sale";
  const groups = getTabsSliderGroups(source);

  if (!groups.some((group) => group.items.length)) {
    return <EmptyContent />;
  }

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
