import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/classname.utils";
import { PANEL_VARIANT_CLASS, type PanelVariant } from "@/variants/panel.variant";

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: PanelVariant;
}

export function Panel({ children, className, variant = "default", ...props }: PanelProps) {
  return (
    <div className={cn(PANEL_VARIANT_CLASS[variant], className)} {...props}>
      {children}
    </div>
  );
}
