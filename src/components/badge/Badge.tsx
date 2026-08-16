import type { ReactNode } from "react";
import { cn } from "@/lib/classname.utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center rounded bg-red-500 px-2 py-1 text-2xs font-bold text-white", className)}>
      {children}
    </span>
  );
}
