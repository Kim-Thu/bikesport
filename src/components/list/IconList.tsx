import { BoxIcon } from "@/components/box/BoxIcon";
import { Panel } from "@/components/panel/Panel";
import type { IconListItem, IconListProps } from "@/interfaces/icon-list.interface";

function IconListItemContent({ item, mediaUrlById }: { item: IconListItem; mediaUrlById: Record<string, string> }) {
  return (
    <BoxIcon
      icon={item.icon}
      iconMediaUrl={item.mediaId ? mediaUrlById[item.mediaId] : undefined}
      title={item.title}
      description={item.description}
      iconClassName="h-8 w-8 text-blue-600"
      titleClassName="text-sm normal-case text-gray-900"
      descriptionClassName="text-sm text-gray-500 opacity-100"
    />
  );
}

export function IconList({ items, layout = "list", mediaUrlById = {} }: IconListProps) {
  if (layout === "grid") {
    return (
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {items.map((item, index) => (
          <div key={`${item.title}-${index}`} className="min-w-0">
            <IconListItemContent item={item} mediaUrlById={mediaUrlById} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <Panel className="divide-y divide-gray-100 p-4">
      {items.map((item, index) => (
        <div key={`${item.title}-${index}`} className="py-3 first:pt-0 last:pb-0">
          <IconListItemContent item={item} mediaUrlById={mediaUrlById} />
        </div>
      ))}
    </Panel>
  );
}
