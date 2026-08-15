import { ChevronDown, Menu, Phone, ShoppingCart, UserRound, type LucideIcon } from "lucide-react";
import type { IconProps } from "@/interfaces/icon.interface";

const ICONS: Record<string, LucideIcon> = {
  menu: Menu,
  phone: Phone,
  account: UserRound,
  cart: ShoppingCart,
  "chevron-down": ChevronDown,
};

export function Icon({ name, ...props }: IconProps) {
  const IconComponent = ICONS[name];

  if (!IconComponent) return null;

  return <IconComponent aria-hidden="true" {...props} />;
}
