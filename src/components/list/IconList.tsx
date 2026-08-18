import { BoxIcon } from "@/components/box/BoxIcon";
import { Panel } from "@/components/panel/Panel";
import type { IconListItem, IconListProps } from "@/interfaces/icon-list.interface";
import { ICON_LIST_CLASS } from "@/variants/icon-list.variant";

function IconListItemContent({ item, mediaUrlById }: { item: IconListItem; mediaUrlById: Record<string, string> }) {
  return (
    <BoxIcon
      icon={item.icon}
      iconMediaUrl={item.mediaId ? mediaUrlById[item.mediaId] : undefined}
      title={item.title}
      description={item.description}
      iconClassName="h-8 w-8 text-blue-700"
      titleClassName="text-sm normal-case text-gray-900"
      descriptionClassName="text-sm text-gray-500 opacity-100"
    />
  );
}

export function IconList({ items, layout = "list", mediaUrlById = {} }: IconListProps) {
  const styles = ICON_LIST_CLASS[layout];
  const content = items.map((item, index) => (
    <div key={`${item.title}-${index}`} className={styles.item}>
      <IconListItemContent item={item} mediaUrlById={mediaUrlById} />
    </div>
  ));

  if (layout === "list") {
    return <Panel className={styles.root}>{content}</Panel>;
  }

  return <div className={styles.root}>{content}</div>;
}
