import { EmptyContent } from "@/components/empty-content/EmptyContent";
import { TabsGrid, type TabsGridGroup } from "@/components/grid/TabsGrid";
import type { TabsGridBlockPayload } from "@/interfaces/page-block.interface";
import { getMediaWithFallbackByIds } from "@/lib/media.utils";
import { getProductCollectionItems } from "@/lib/product-collection-source.utils";
import { resolvePageGridLayout } from "@/variants/page-layout.variant";

export async function TabsGridBlock({ block }: { block: TabsGridBlockPayload }) {
  const mediaIds = [block.props.titleMediaId, block.props.backgroundMediaId].filter(
    (mediaId): mediaId is string => Boolean(mediaId),
  );

  const [mediaById, groups] = await Promise.all([
    getMediaWithFallbackByIds(mediaIds),
    Promise.all(
      block.props.tabs.map(async (tab) => ({
        label: tab.label,
        value: tab.value,
        items: await getProductCollectionItems(tab.source),
      })),
    ),
  ]);

  const resolvedGroups: TabsGridGroup[] = groups;

  if (!resolvedGroups.some((group) => group.items.length)) {
    return <EmptyContent />;
  }

  return (
    <TabsGrid
      title={block.props.title}
      titleMediaId={block.props.titleMediaId}
      titleMedia={block.props.titleMediaId ? mediaById[block.props.titleMediaId] ?? null : null}
      titleAlt={block.props.titleAlt}
      href={block.props.href}
      actionLabel={block.props.actionLabel}
      groups={resolvedGroups}
      template={block.props.template}
      headingTemplate={block.props.headingTemplate}
      tabsTemplate={block.props.tabsTemplate}
      layoutTemplate={block.props.layoutTemplate}
      backgroundMediaId={block.props.backgroundMediaId}
      backgroundMedia={block.props.backgroundMediaId ? mediaById[block.props.backgroundMediaId] ?? null : null}
      gridClassName={resolvePageGridLayout(block.props.gridLayout)}
      mobilePageSize={block.props.mobilePageSize}
    />
  );
}
