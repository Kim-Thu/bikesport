import { ArrowRight, ChevronDown, Menu, Phone, ShoppingCart, UserRound, X, type LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import type { IconProps } from "@/interfaces/icon.interface";

const ICONS: Record<string, LucideIcon> = {
  menu: Menu,
  close: X,
  phone: Phone,
  account: UserRound,
  cart: ShoppingCart,
  "chevron-down": ChevronDown,
  "arrow-right": ArrowRight,
};

export function Icon({ name, src, size = 24, className = "", style, ...props }: IconProps) {
  if (src) {
    const maskStyle: CSSProperties = {
      backgroundColor: "currentColor",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      ...style,
    };

    return <span aria-hidden="true" className={`inline-block shrink-0 ${className}`.trim()} style={maskStyle} />;
  }

  if (!name) return null;

  const IconComponent = ICONS[name];
  if (!IconComponent) return null;

  return <IconComponent aria-hidden="true" size={size} className={className} style={style} {...props} />;
}
