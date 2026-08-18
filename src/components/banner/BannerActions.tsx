import { ActionLink } from "@/components/link/ActionLink";
import type { BannerAction } from "@/interfaces/banner.interface";
import { cn } from "@/lib/classname.utils";

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
        "mt-6 flex flex-wrap gap-4",
        align === "center" && "justify-center",
        className,
      )}
    >
      {actions.map((action) => (
        <ActionLink
          key={`${action.label}-${action.href}`}
          href={action.href}
          tone={action.variant ?? "primary"}
          size="sm"
          icon={action.icon}
          iconPosition={action.iconPosition}
          showArrow={false}
        >
          {action.label}
        </ActionLink>
      ))}
    </div>
  );
}
