import type { NavMenuData, ResolvedMenuMediaMap } from "@/interfaces/navigation.interface";

export interface CMenuProps {
  menu: NavMenuData;
  mediaById: ResolvedMenuMediaMap;
  listClassName?: string;
  itemClassName?: string;
  linkClassName?: string;
  includeChildren?: boolean;
}
