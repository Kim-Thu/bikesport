import { EmptyContent } from "@/components/empty-content/EmptyContent";
import { ProductSlider } from "@/components/product/ProductSlider";
import { DefaultTemplate } from "@/components/product-slider-layout/templates/DefaultTemplate";
import { FeaturedShowcaseTemplate } from "@/components/product-slider-layout/templates/FeaturedShowcaseTemplate";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import { TabsSlider } from "@/components/slider/TabsSlider";
import type { ProductSliderBlockPayload } from "@/interfaces/page-block.interface";
import { resolveProductSliderBlock } from "@/lib/product-slider-block.utils";
import { resolvePageSliderSlide, resolvePageSliderTrack } from "@/variants/page-layout.variant";

const LAYOUT_TEMPLATES = {
  default: DefaultTemplate,
  "featured-showcase": FeaturedShowcaseTemplate,
} as const;

export async function ProductSliderBlock({ block }: { block: ProductSliderBlockPayload }) {
  const viewModel = await resolveProductSliderBlock(block);
  const trackClassName = resolvePageSliderTrack(block.props.trackLayout);
  const slideClassName = resolvePageSliderSlide(block.props.slideLayout);

  if (viewModel.kind === "tabs") {
    return (
      <TabsSlider
        title={viewModel.title}
        titleMediaId={block.props.titleMediaId}
        titleAlt={block.props.titleAlt}
        href={block.props.href}
        actionLabel={block.props.actionLabel}
        groups={viewModel.groups}
        template={block.props.template}
        headingTemplate={viewModel.headingTemplate}
        tabTemplate={viewModel.tabTemplate}
        layoutTemplate={viewModel.layoutTemplate}
        actionTone={viewModel.actionTone}
        trackClassName={trackClassName}
        slideClassName={slideClassName}
      />
    );
  }

  if (!viewModel.items.length) return <EmptyContent />;

  const hasHeader = Boolean(block.props.title) || block.props.titleMediaId !== undefined;
  const LayoutTemplate = LAYOUT_TEMPLATES[viewModel.layoutTemplate];

  const header = hasHeader ? (
    <SectionHeader
      title={block.props.title}
      titleMediaId={block.props.titleMediaId}
      titleAlt={block.props.titleAlt}
      href={viewModel.layoutTemplate === "default" ? block.props.href : undefined}
      actionLabel={block.props.actionLabel}
      template={viewModel.headingTemplate}
    />
  ) : undefined;

  const slider = (
    <ProductSlider
      items={viewModel.items}
      template={block.props.template}
      ariaLabel={block.props.ariaLabel ?? block.props.title ?? "Danh sách sản phẩm"}
      trackClassName={trackClassName}
      slideClassName={slideClassName}
    />
  );

  return (
    <LayoutTemplate
      header={header}
      slider={slider}
      href={block.props.href}
      actionLabel={block.props.actionLabel}
      tone={viewModel.actionTone}
    />
  );
}
