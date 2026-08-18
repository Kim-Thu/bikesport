import type { NavMenuData } from "@/interfaces/navigation.interface";

export interface MenuDataSource {
  getById(menuId: string): Promise<NavMenuData | null>;
}
