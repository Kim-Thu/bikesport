import { CollectionShowcase } from "@/components/collection/CollectionShowcase";
import type { TabsSliderTemplateProps } from "@/interfaces/tabs-slider.interface";

export function FeaturedShowcaseTemplate({
  header,
  slider,
  href,
  actionLabel = "Xem tất cả",
  backgroundMediaId,
  containerClassName,
}: TabsSliderTemplateProps) {
  return (
    <CollectionShowcase
      header={header}
      content={slider}
      href={href}
      actionLabel={actionLabel}
      backgroundMediaId={backgroundMediaId}
      containerClassName={containerClassName}
    />
  );
}
