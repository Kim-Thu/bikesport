import type { NavMenuData } from "@/interfaces/navigation.interface";

export interface CMenuProps {
  menu: NavMenuData;
  listClassName?: string;
  itemClassName?: string;
  linkClassName?: string;
  includeChildren?: boolean;
}
