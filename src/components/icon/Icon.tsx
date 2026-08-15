import { Menu, type LucideIcon } from "lucide-react";
import type { IconProps } from "@/interfaces/icon.interface";

const ICONS: Record<string, LucideIcon> = {
  menu: Menu,
};

export function Icon({ name, ...props }: IconProps) {
  const IconComponent = ICONS[name];

  if (!IconComponent) return null;

  return <IconComponent aria-hidden="true" {...props} />;
}
