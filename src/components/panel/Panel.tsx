import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/classname.utils";

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Panel({ children, className, ...props }: PanelProps) {
  return (
    <div className={cn("rounded-lg border border-gray-100 bg-white", className)} {...props}>
      {children}
    </div>
  );
}
