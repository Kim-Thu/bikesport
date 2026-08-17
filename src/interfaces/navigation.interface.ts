import type { MediaItem } from "@/interfaces/media.interface";
import type {
  ContactLinkOptions,
  SiteIdentityOptions,
  SocialLinkOptions,
} from "@/interfaces/options.interface";

export type NavMenuItemDisplay = "text" | "image" | "image-text";
export type ResolvedMenuMediaMap = Record<string, MediaItem>;

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

export interface MobileMenuClientProps {
  menu: NavMenuData;
  site: SiteIdentityOptions;
  logoMedia: MediaItem | null;
  menuMediaById: ResolvedMenuMediaMap;
  hotline: ContactLinkOptions;
  socialItems: SocialLinkOptions[];
  socialMediaUrlById: Record<string, string>;
}

export interface MenuItemContentProps {
  item: NavMenuItem;
  mediaById: ResolvedMenuMediaMap;
}

export interface MenuChildrenProps {
  items: NavMenuItem[];
  mediaById: ResolvedMenuMediaMap;
  id?: string;
  listClassName?: string;
  itemClassName?: string;
  onItemClick?: () => void;
}
