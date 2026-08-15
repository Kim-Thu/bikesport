import { Icon } from "@/components/icon/Icon";
import type { ButtonProps } from "@/interfaces/button.interface";

const VARIANTS = {
  default: "inline-flex items-center justify-center",
  icon: "inline-flex h-10 w-9 items-center justify-center text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
} as const;

export function Button({ variant = "default", icon, label, children, className = "", ...props }: ButtonProps) {
  return (
    <button type="button" className={`${VARIANTS[variant]} ${className}`.trim()} {...props}>
      {icon ? <Icon name={icon} size={30} strokeWidth={1.7} /> : null}
      {label ? <span>{label}</span> : null}
      {children}
    </button>
  );
}
