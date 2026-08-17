import { CLink } from "@/components/link/CLink";
import { CList } from "@/components/list/CList";
import { MenuItemContent } from "@/components/navigation/partials/MenuItemContent";
import type { CMenuProps } from "@/interfaces/menu.interface";
import { createMenuIndex, getMenuHref, sortMenuItems } from "@/lib/menu-presentation.utils";

export function CMenu({
  menu,
  listClassName = "",
  itemClassName = "",
  linkClassName = "",
  includeChildren = false,
}: CMenuProps) {
  const items = includeChildren ? sortMenuItems(menu.items) : createMenuIndex(menu.items).rootItems;

  return (
    <CList
      className={listClassName}
      itemClassName={itemClassName}
      items={items.map((item) => ({
        key: item._id,
        content: (
          <CLink href={getMenuHref(item)} className={linkClassName}>
            <MenuItemContent item={item} />
          </CLink>
        ),
      }))}
    />
  );
}
