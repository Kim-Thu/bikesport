import menuData from "@/data/wp-menu.json";
import type { NavMenuData, NavMenuItem } from "@/interfaces/navigation.interface";
import { getActiveBrands, getFeaturedBrands } from "@/lib/brand.utils";

export interface MenuIndex {
  rootItems: NavMenuItem[];
  childrenByParentId: Map<string, NavMenuItem[]>;
}

export function sortMenuItems(items: NavMenuItem[]) {
  return items.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

function resolveSourceItems(item: NavMenuItem): NavMenuItem[] {
  if (item.source?.type !== "brand") return [];

  const brands = item.source.featured === true
    ? getFeaturedBrands(item.source.limit)
    : getActiveBrands().slice(0, item.source.limit);

  return brands.map((brand, index) => ({
    _id: `menu-brand-${brand._id}`,
    label: brand.name,
    href: `/thuong-hieu/${brand.slug}`,
    mediaId: brand.logoMediaId ?? undefined,
    display: item.source?.display ?? "image-text",
    parentId: item._id,
    order: brand.order ?? index + 1,
  }));
}

function resolveMenu(menu: NavMenuData): NavMenuData {
  const sourceItems = menu.items.flatMap(resolveSourceItems);
  return sourceItems.length ? { ...menu, items: [...menu.items, ...sourceItems] } : menu;
}

export function getMenuById(menuId: string) {
  const menu = (menuData.menus as NavMenuData[]).find((item) => item._id === menuId);
  return menu ? resolveMenu(menu) : undefined;
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
