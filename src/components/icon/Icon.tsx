import { ArrowRight, BadgePercent, ChevronDown, Gift, Menu, Phone, Search, ShoppingCart, Tag, UserRound, X, type LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import type { IconProps } from "@/interfaces/icon.interface";
import { cn } from "@/lib/classname.utils";
import { getMediaUrl } from "@/lib/media.utils";

const ICONS: Record<string, LucideIcon> = {
  menu: Menu,
  close: X,
  phone: Phone,
  search: Search,
  account: UserRound,
  cart: ShoppingCart,
  tag: Tag,
  gift: Gift,
  "badge-percent": BadgePercent,
  "chevron-down": ChevronDown,
  "arrow-right": ArrowRight,
};

export function Icon({ name, mediaId, size = 24, className = "", style, ...props }: IconProps) {
  const mediaUrl = getMediaUrl(mediaId);

  if (mediaUrl) {
    const maskStyle: CSSProperties = {
      backgroundColor: "currentColor",
      WebkitMaskImage: `url(${mediaUrl})`,
      maskImage: `url(${mediaUrl})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      ...style,
    };

    return <span aria-hidden="true" className={cn("inline-block shrink-0", className)} style={maskStyle} />;
  }

  if (!name) return null;

  const IconComponent = ICONS[name];
  if (!IconComponent) return null;

  return <IconComponent aria-hidden="true" size={size} className={cn(className)} style={style} {...props} />;
}
