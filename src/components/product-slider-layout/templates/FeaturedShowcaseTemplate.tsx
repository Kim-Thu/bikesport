import { CollectionShowcase } from "@/components/collection/CollectionShowcase";
import type { ProductSliderLayoutTemplateProps } from "@/interfaces/product-slider-layout.interface";

export function FeaturedShowcaseTemplate({
  header,
  slider,
  href,
  actionLabel = "Xem tất cả",
  tone = "primary",
}: ProductSliderLayoutTemplateProps) {
  return (
    <CollectionShowcase
      header={header}
      content={slider}
      href={href}
      actionLabel={actionLabel}
      actionTone={tone}
    />
  );
}
