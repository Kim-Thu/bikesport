import { ProductSlider } from "@/components/product/ProductSlider";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import type { ProductSliderBlockPayload } from "@/interfaces/page-block.interface";
import { getProductSliderItems } from "@/lib/product-slider-source.utils";

export function ProductSliderBlock({ block }: { block: ProductSliderBlockPayload }) {
  const items = getProductSliderItems(block.props.source);
  if (!items.length) return null;

  const hasHeader = Boolean(block.props.title) || block.props.titleMediaId !== undefined;

  return (
    <div>
      {hasHeader ? (
        <SectionHeader
          title={block.props.title}
          titleMediaId={block.props.titleMediaId}
          titleAlt={block.props.titleAlt}
          href={block.props.href}
          actionLabel={block.props.actionLabel}
          template={block.props.headerTemplate}
          countdownAt={block.props.countdownAt}
          className="mb-4"
        />
      ) : null}

      <ProductSlider
        items={items}
        template={block.props.template}
        ariaLabel={block.props.ariaLabel ?? block.props.title ?? "Danh sách sản phẩm"}
        trackClassName={block.props.trackClassName}
        slideClassName={block.props.slideClassName}
      />
    </div>
  );
}
