export interface NavMenuItem {
  _id: string;
  label?: string;
  href?: string;
  hasDropdown?: boolean;
  highlight?: boolean;
  parentId?: string | null;
  order?: number;
}

export interface NavMenuData {
  _id: string;
  name: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  items: NavMenuItem[];
}

export interface NavMenuProps {
  menuId: string;
}
