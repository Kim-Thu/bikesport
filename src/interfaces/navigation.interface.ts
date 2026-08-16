export type NavMenuItemDisplay = "text" | "image" | "image-text";

export interface NavMenuItemSource {
  type: "brand";
  featured?: boolean;
  display?: NavMenuItemDisplay;
  limit?: number;
}

export interface NavMenuItem {
  _id: string;
  label?: string;
  href?: string;
  mediaId?: string;
  display?: NavMenuItemDisplay;
  source?: NavMenuItemSource;
  hasDropdown?: boolean;
  highlight?: boolean;
  parentId?: string | null;
  order?: number;
}

export interface NavMenuData {
  _id: string;
  name: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  items: NavMenuItem[];
}

export interface NavMenuProps {
  menuId: string;
}

export interface MenuChildrenProps {
  items: NavMenuItem[];
  id?: string;
  listClassName?: string;
  itemClassName?: string;
  onItemClick?: () => void;
}
