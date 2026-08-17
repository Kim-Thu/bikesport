import { EmptyContent } from "@/components/empty-content/EmptyContent";
import { TabsGrid, type TabsGridGroup } from "@/components/grid/TabsGrid";
import type { TabsGridBlockPayload } from "@/interfaces/page-block.interface";
import { getProductCollectionItems } from "@/lib/product-collection-source.utils";

export function TabsGridBlock({ block }: { block: TabsGridBlockPayload }) {
  const groups: TabsGridGroup[] = block.props.tabs.map((tab) => ({
    label: tab.label,
    value: tab.value,
    items: getProductCollectionItems(tab.source),
  }));

  if (!groups.some((group) => group.items.length)) {
    return <EmptyContent />;
  }

  return (
    <TabsGrid
      title={block.props.title}
      titleMediaId={block.props.titleMediaId}
      titleAlt={block.props.titleAlt}
      href={block.props.href}
      actionLabel={block.props.actionLabel}
      groups={groups}
      template={block.props.template}
      headingTemplate={block.props.headingTemplate}
      tabsTemplate={block.props.tabsTemplate}
      layoutTemplate={block.props.layoutTemplate}
      backgroundMediaId={block.props.backgroundMediaId}
      gridClassName={block.props.gridClassName}
      mobilePageSize={block.props.mobilePageSize}
    />
  );
}
