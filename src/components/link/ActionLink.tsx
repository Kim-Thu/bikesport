import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import type { ActionLinkProps } from "@/interfaces/action-link.interface";
import { cn } from "@/lib/classname.utils";
import type { ActionLinkSize, ActionLinkTone } from "@/variants/action-link.variant";

const TONES: Record<ActionLinkTone, string> = {
  primary: "border-transparent bg-blue-700 text-white hover:bg-blue-700",
  danger: "border-transparent bg-red-700 text-white hover:bg-red-800",
  outline: "border-blue-200 bg-white text-blue-700 hover:border-blue-300 hover:bg-blue-50",
};

const SIZES: Record<ActionLinkSize, string> = {
  sm: "px-3 py-2 text-xs",
  md: "px-5 py-3 text-sm",
};

export function ActionLink({
  href,
  children,
  tone = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  className,
  showArrow = true,
}: ActionLinkProps) {
  const showDefaultArrow = showArrow && !icon;

  return (
    <CLink
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md border font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700",
        TONES[tone],
        SIZES[size],
        className,
      )}
    >
      {icon && iconPosition === "left" ? <Icon name={icon} className="h-4 w-4" /> : null}
      <span>{children}</span>
      {icon && iconPosition === "right" ? <Icon name={icon} className="h-4 w-4" /> : null}
      {showDefaultArrow ? <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} /> : null}
    </CLink>
  );
}
