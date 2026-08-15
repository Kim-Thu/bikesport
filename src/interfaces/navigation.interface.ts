export interface NavMenuItem {
  label?: string;
  href?: string;
  hasDropdown?: boolean;
  highlight?: boolean;
}

export interface NavMenuProps {
  items?: NavMenuItem[];
}
