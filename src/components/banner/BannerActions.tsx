import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import type { BannerAction } from "@/interfaces/banner.interface";
import { cn } from "@/lib/classname.utils";

const ACTION_CLASS: Record<NonNullable<BannerAction["variant"]>, string> = {
  primary: "border-blue-600 bg-blue-600 text-white hover:bg-blue-700",
  outline: "border-blue-600 bg-white text-blue-600 hover:bg-blue-50",
};

interface BannerActionsProps {
  actions: BannerAction[];
  align?: "left" | "center";
  className?: string;
}

export function BannerActions({ actions, align = "left", className }: BannerActionsProps) {
  if (!actions.length) return null;

  return (
    <div
      className={cn(
        "mt-6 flex flex-wrap gap-3",
        align === "center" && "justify-center",
        className,
      )}
    >
      {actions.map((action) => {
        const iconPosition = action.iconPosition ?? "left";

        return (
          <CLink
            key={`${action.label}-${action.href}`}
            href={action.href}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-md border px-5 py-2.5 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
              ACTION_CLASS[action.variant ?? "primary"],
            )}
          >
            {action.icon && iconPosition === "left" ? <Icon name={action.icon} className="h-4 w-4" /> : null}
            <span>{action.label}</span>
            {action.icon && iconPosition === "right" ? <Icon name={action.icon} className="h-4 w-4" /> : null}
          </CLink>
        );
      })}
    </div>
  );
}
