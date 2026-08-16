import { BoxIcon } from "@/components/box/BoxIcon";
import { Panel } from "@/components/panel/Panel";

export interface IconListItem {
  icon?: string;
  mediaId?: string;
  title: string;
  description?: string;
}

interface IconListProps {
  items: IconListItem[];
}

export function IconList({ items }: IconListProps) {
  return (
    <Panel className="divide-y divide-gray-100 p-4">
      {items.map((item, index) => (
        <div key={`${item.title}-${index}`} className="py-3 first:pt-0 last:pb-0">
          <BoxIcon
            icon={item.icon}
            iconMediaId={item.mediaId}
            title={item.title}
            description={item.description}
            iconClassName="h-8 w-8 text-blue-600"
            titleClassName="text-xs normal-case text-gray-900"
            descriptionClassName="text-2xs text-gray-500 opacity-100"
          />
        </div>
      ))}
    </Panel>
  );
}
