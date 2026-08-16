import { Icon } from "@/components/icon/Icon";
import type { ButtonProps } from "@/interfaces/button.interface";
import { cn } from "@/lib/classname.utils";

const VARIANTS = {
  default: "inline-flex cursor-pointer items-center justify-center disabled:cursor-not-allowed",
  icon: "inline-flex h-10 w-9 cursor-pointer items-center justify-center text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed",
  outline: "inline-flex cursor-pointer items-center justify-center border border-blue-200 bg-blue-200 text-blue-700 disabled:cursor-not-allowed",
} as const;

export function Button({ variant = "default", icon, iconSize = 30, label, children, className = "", ...props }: ButtonProps) {
  return (
    <button type="button" className={cn(VARIANTS[variant], className)} {...props}>
      {icon ? <Icon name={icon} size={iconSize} strokeWidth={1.7} /> : null}
      {label ? <span>{label}</span> : null}
      {children}
    </button>
  );
}
