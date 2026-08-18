import {
  ArrowRight,
  BadgePercent,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  CirclePlay,
  Clock,
  Flame,
  Gift,
  HandHeart,
  Headphones,
  Mail,
  MapPin,
  Menu,
  MousePointerClick,
  PackageCheck,
  Phone,
  RefreshCcw,
  Search,
  Settings,
  ShoppingCart,
  Tag,
  Target,
  TrendingUp,
  Truck,
  UserRound,
  UsersRound,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import type { IconProps } from "@/interfaces/icon.interface";
import { cn } from "@/lib/classname.utils";

const ICONS: Record<string, LucideIcon> = {
  menu: Menu,
  close: X,
  phone: Phone,
  mail: Mail,
  search: Search,
  account: UserRound,
  cart: ShoppingCart,
  tag: Tag,
  gift: Gift,
  truck: Truck,
  package: PackageCheck,
  refresh: RefreshCcw,
  payment: CircleDollarSign,
  click: MousePointerClick,
  wrench: Wrench,
  support: Headphones,
  location: MapPin,
  clock: Clock,
  users: UsersRound,
  flame: Flame,
  play: CirclePlay,
  target: Target,
  growth: TrendingUp,
  values: HandHeart,
  settings: Settings,
  "badge-percent": BadgePercent,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "arrow-right": ArrowRight,
};

export function Icon({ name, mediaUrl, size = 24, className = "", style, ...props }: IconProps) {
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
