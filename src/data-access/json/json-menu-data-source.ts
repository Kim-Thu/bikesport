import menuData from "@/data/wp-menu.json";
import type { MenuDataSource } from "@/data-access/contracts/menu-data-source.interface";
import type { NavMenuData } from "@/interfaces/navigation.interface";

const menus = menuData.menus as NavMenuData[];
const menuById = new Map(menus.map((menu) => [menu._id, menu]));

export const jsonMenuDataSource: MenuDataSource = {
  async getById(menuId) {
    return menuById.get(menuId) ?? null;
  },
};
