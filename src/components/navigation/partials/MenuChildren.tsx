import { CLink } from "@/components/link/CLink";
import { MenuItemContent } from "@/components/navigation/partials/MenuItemContent";
import type { MenuChildrenProps } from "@/interfaces/navigation.interface";
import { getMenuHref } from "@/lib/menu-presentation.utils";

export function MenuChildren({
  items,
  mediaById,
  id,
  listClassName = "",
  itemClassName = "",
  onItemClick,
}: MenuChildrenProps) {
  if (!items.length) return null;

  return (
    <ul id={id} className={listClassName}>
      {items.map((item) => (
        <li key={item._id}>
          <CLink href={getMenuHref(item)} className={itemClassName} onClick={onItemClick}>
            <MenuItemContent item={item} mediaById={mediaById} />
          </CLink>
        </li>
      ))}
    </ul>
  );
}
