import { CollectionShowcase } from "@/components/collection/CollectionShowcase";
import type { TabsGridTemplateProps } from "@/interfaces/tabs-grid.interface";

export function FeaturedDealsTemplate({
  header,
  grid,
  pagination,
  href,
  actionLabel = "Xem thêm ưu đãi",
  backgroundMediaId,
}: TabsGridTemplateProps) {
  return (
    <CollectionShowcase
      header={header}
      content={grid}
      footer={pagination}
      href={href}
      actionLabel={actionLabel}
      backgroundMediaId={backgroundMediaId}
      containerClassName="rounded-xl bg-blue-50 p-4 sm:p-6"
    />
  );
}
