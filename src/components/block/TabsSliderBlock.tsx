import { EmptyContent } from "@/components/empty-content/EmptyContent";
import { TabsSlider } from "@/components/slider/TabsSlider";
import type { TabsSliderBlockPayload } from "@/interfaces/page-block.interface";
import { getMediaWithFallbackByIds } from "@/lib/media.utils";
import { getTabsSliderGroups } from "@/lib/tabs-slider-source.utils";
import { resolvePageSliderSlide, resolvePageSliderTrack } from "@/variants/page-layout.variant";

export async function TabsSliderBlock({ block }: { block: TabsSliderBlockPayload }) {
  const source = block.props.source;
  const isBrandSource = source.type === "brand";
  const isFlashSaleSource = source.type === "flash-sale";
  const groups = await getTabsSliderGroups(source);

  if (!groups.some((group) => group.items.length)) {
    return <EmptyContent />;
  }

  const mediaIds = [
    block.props.titleMediaId,
    block.props.backgroundMediaId,
    ...groups.map((group) => group.mediaId),
  ].filter((mediaId): mediaId is string => Boolean(mediaId));
  const mediaById = await getMediaWithFallbackByIds(mediaIds);
  const resolvedGroups = groups.map((group) => ({
    ...group,
    media: group.mediaId ? mediaById[group.mediaId] ?? null : null,
  }));

  return (
    <TabsSlider
      title={block.props.title}
      titleMedia={block.props.titleMediaId ? mediaById[block.props.titleMediaId] ?? null : null}
      titleAlt={block.props.titleAlt}
      href={block.props.href}
      actionLabel={block.props.actionLabel}
      groups={resolvedGroups}
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
      backgroundMedia={block.props.backgroundMediaId ? mediaById[block.props.backgroundMediaId] ?? null : null}
      trackClassName={resolvePageSliderTrack(block.props.trackLayout)}
      slideClassName={resolvePageSliderSlide(block.props.slideLayout)}
    />
  );
}
