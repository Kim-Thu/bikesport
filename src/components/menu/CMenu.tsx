import { CLink } from "@/components/link/CLink";
import { CList } from "@/components/list/CList";
import { MenuItemContent } from "@/components/navigation/partials/MenuItemContent";
import type { CMenuProps } from "@/interfaces/menu.interface";
import { createMenuIndex, getMenuById, getMenuHref, sortMenuItems } from "@/lib/menu.utils";

export function CMenu({
  menuId,
  listClassName = "",
  itemClassName = "",
  linkClassName = "",
  includeChildren = false,
}: CMenuProps) {
  const menu = getMenuById(menuId);

  if (!menu) return null;

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
