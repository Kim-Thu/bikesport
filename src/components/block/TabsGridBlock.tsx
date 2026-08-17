import { TabsGrid, type TabsGridGroup } from "@/components/grid/TabsGrid";
import type { TabsGridBlockPayload } from "@/interfaces/page-block.interface";
import { getProductSliderItems } from "@/lib/product-slider-source.utils";

export function TabsGridBlock({ block }: { block: TabsGridBlockPayload }) {
  const groups: TabsGridGroup[] = block.props.tabs.map((tab) => ({
    label: tab.label,
    value: tab.value,
    items: getProductSliderItems(tab.source),
  }));

  if (!groups.some((group) => group.items.length)) return null;

  return (
    <TabsGrid
      title={block.props.title}
      href={block.props.href}
      actionLabel={block.props.actionLabel}
      groups={groups}
      template={block.props.template}
      gridClassName={block.props.gridClassName}
    />
  );
}
