import { EmptyContent } from "@/components/empty-content/EmptyContent";
import { ProductSlider } from "@/components/product/ProductSlider";
import { DefaultTemplate } from "@/components/product-slider-layout/templates/DefaultTemplate";
import { FeaturedShowcaseTemplate } from "@/components/product-slider-layout/templates/FeaturedShowcaseTemplate";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import { TabsSlider } from "@/components/slider/TabsSlider";
import type { ProductSliderBlockPayload } from "@/interfaces/page-block.interface";
import {
  getProductCollectionItems,
  getPromotionSessionCollectionGroups,
} from "@/lib/product-collection-source.utils";

const LAYOUT_TEMPLATES = {
  default: DefaultTemplate,
  "featured-showcase": FeaturedShowcaseTemplate,
} as const;

export function ProductSliderBlock({ block }: { block: ProductSliderBlockPayload }) {
  const headingTemplate = block.props.headingTemplate ?? block.props.headerTemplate;
  const isFlashSale = headingTemplate === "flash-sale";

  if (isFlashSale && block.props.source.type === "promotion") {
    const groups = getPromotionSessionCollectionGroups(
      block.props.source.promotionId,
      block.props.source.limit,
    );

    if (groups.some((group) => group.items.length)) {
      return (
        <TabsSlider
          title={block.props.title ?? "Flash Sale"}
          titleMediaId={block.props.titleMediaId}
          titleAlt={block.props.titleAlt}
          href={block.props.href}
          actionLabel={block.props.actionLabel}
          groups={groups}
          template={block.props.template}
          headingTemplate="flash-sale"
          tabTemplate="flash-sale"
          layoutTemplate="featured-showcase"
          actionTone="danger"
          trackClassName={block.props.trackClassName}
          slideClassName={block.props.slideClassName}
        />
      );
    }
  }

  const items = getProductCollectionItems(block.props.source);
  if (!items.length) return <EmptyContent />;

  const hasHeader = Boolean(block.props.title) || block.props.titleMediaId !== undefined;
  const layoutTemplate = block.props.layoutTemplate ?? (isFlashSale ? "featured-showcase" : "default");
  const LayoutTemplate = LAYOUT_TEMPLATES[layoutTemplate];

  const header = hasHeader ? (
    <SectionHeader
      title={block.props.title}
      titleMediaId={block.props.titleMediaId}
      titleAlt={block.props.titleAlt}
      href={layoutTemplate === "default" ? block.props.href : undefined}
      actionLabel={block.props.actionLabel}
      template={headingTemplate}
    />
  ) : undefined;

  const slider = (
    <ProductSlider
      items={items}
      template={block.props.template}
      ariaLabel={block.props.ariaLabel ?? block.props.title ?? "Danh sách sản phẩm"}
      trackClassName={block.props.trackClassName}
      slideClassName={block.props.slideClassName}
    />
  );

  return (
    <LayoutTemplate
      header={header}
      slider={slider}
      href={block.props.href}
      actionLabel={block.props.actionLabel}
      tone={isFlashSale ? "danger" : "primary"}
    />
  );
}
