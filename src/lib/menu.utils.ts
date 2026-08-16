import menuData from "@/data/wp-menu.json";
import type { NavMenuData, NavMenuItem } from "@/interfaces/navigation.interface";

export function sortMenuItems(items: NavMenuItem[]) {
  return items.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getMenuById(menuId: string) {
  return (menuData.menus as NavMenuData[]).find((menu) => menu._id === menuId);
}

export function getRootMenuItems(items: NavMenuItem[]) {
  return sortMenuItems(items.filter((item) => !item.parentId));
}

export function getChildMenuItems(items: NavMenuItem[], parentId: string) {
  return sortMenuItems(items.filter((item) => item.parentId === parentId));
}

export function hasMenuChildren(items: NavMenuItem[], item: NavMenuItem) {
  return item.hasDropdown === true || items.some((child) => child.parentId === item._id);
}

export function getMenuHref(item: NavMenuItem) {
  return item.href || "/";
}
