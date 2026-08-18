import type { NavMenuItem } from "@/interfaces/navigation.interface";

export interface MenuIndex {
  rootItems: NavMenuItem[];
  childrenByParentId: Map<string, NavMenuItem[]>;
}

export function sortMenuItems(items: NavMenuItem[]) {
  return items.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function createMenuIndex(items: NavMenuItem[]): MenuIndex {
  const rootItems: NavMenuItem[] = [];
  const childrenByParentId = new Map<string, NavMenuItem[]>();

  for (const item of sortMenuItems(items)) {
    if (!item.parentId) {
      rootItems.push(item);
      continue;
    }

    const children = childrenByParentId.get(item.parentId);
    if (children) {
      children.push(item);
    } else {
      childrenByParentId.set(item.parentId, [item]);
    }
  }

  return { rootItems, childrenByParentId };
}

export function getMenuHref(item: NavMenuItem) {
  return item.href || "/";
}
