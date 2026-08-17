import { ProductSlider } from "@/components/product/ProductSlider";
import { DefaultTemplate } from "@/components/product-slider-layout/templates/DefaultTemplate";
import { FeaturedShowcaseTemplate } from "@/components/product-slider-layout/templates/FeaturedShowcaseTemplate";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import type { ProductSliderBlockPayload } from "@/interfaces/page-block.interface";
import { getProductCollectionItems } from "@/lib/product-collection-source.utils";

const LAYOUT_TEMPLATES = {
  default: DefaultTemplate,
  "featured-showcase": FeaturedShowcaseTemplate,
} as const;

export function ProductSliderBlock({ block }: { block: ProductSliderBlockPayload }) {
  const items = getProductCollectionItems(block.props.source);
  if (!items.length) return null;

  const hasHeader = Boolean(block.props.title) || block.props.titleMediaId !== undefined;
  const headingTemplate = block.props.headingTemplate ?? block.props.headerTemplate;
  const isFlashSale = headingTemplate === "flash-sale";
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
      countdownAt={block.props.countdownAt}
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
