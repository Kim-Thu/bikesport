import { ProductSlider } from "@/components/product/ProductSlider";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import type { ProductSliderBlockPayload } from "@/interfaces/page-block.interface";
import { getProductSliderItems } from "@/lib/product-slider-source.utils";

export function ProductSliderBlock({ block }: { block: ProductSliderBlockPayload }) {
  const items = getProductSliderItems(block.props.source);
  if (!items.length) return null;

  return (
    <div>
      {block.props.title ? (
        <SectionHeader
          title={block.props.title}
          href={block.props.href}
          actionLabel={block.props.actionLabel}
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
