import { ProductSlider } from "@/components/product/ProductSlider";
import { DefaultTemplate } from "@/components/product-slider-layout/templates/DefaultTemplate";
import { FeaturedShowcaseTemplate } from "@/components/product-slider-layout/templates/FeaturedShowcaseTemplate";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import type { ProductSliderBlockPayload } from "@/interfaces/page-block.interface";
import { getProductSliderItems } from "@/lib/product-slider-source.utils";

const LAYOUT_TEMPLATES = {
  default: DefaultTemplate,
  "featured-showcase": FeaturedShowcaseTemplate,
} as const;

export function ProductSliderBlock({ block }: { block: ProductSliderBlockPayload }) {
  const items = getProductSliderItems(block.props.source);
  if (!items.length) return null;

  const hasHeader = Boolean(block.props.title) || block.props.titleMediaId !== undefined;
  const layoutTemplate =
    block.props.layoutTemplate ??
    (block.props.headerTemplate === "flash-sale" ? "featured-showcase" : "default");
  const LayoutTemplate = LAYOUT_TEMPLATES[layoutTemplate];

  const header = hasHeader ? (
    <SectionHeader
      title={block.props.title}
      titleMediaId={block.props.titleMediaId}
      titleAlt={block.props.titleAlt}
      href={layoutTemplate === "default" ? block.props.href : undefined}
      actionLabel={block.props.actionLabel}
      template={block.props.headerTemplate}
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
    />
  );
}
