import type { ReactNode } from "react";
import { Icon } from "@/components/icon/Icon";
import { cn } from "@/lib/classname.utils";

interface InfoCardProps {
  icon?: string;
  label: string;
  description?: string;
  value?: ReactNode;
  size?: "default" | "lg";
}

export function InfoCard({ icon, label, description, value, size = "default" }: InfoCardProps) {
  const isLarge = size === "lg";

  return (
    <div className={cn("flex items-start rounded-lg border border-gray-200 bg-white/95", isLarge ? "gap-4 p-4" : "gap-3 p-3")}>
      {icon ? (
        <Icon
          name={icon}
          className={cn("mt-0.5 shrink-0 text-blue-600", isLarge ? "h-6 w-6" : "h-5 w-5")}
        />
      ) : null}
      <div className="min-w-0">
        <div className={cn("font-bold uppercase tracking-wide text-gray-900", isLarge ? "text-sm sm:text-base" : "text-2xs sm:text-xs")}>{label}</div>
        {description ? (
          <div className={cn("mt-0.5 text-gray-500", isLarge ? "text-xs sm:text-sm" : "text-2xs sm:text-xs")}>{description}</div>
        ) : null}
        {value ? <div className={cn("mt-1 font-bold text-blue-600", isLarge ? "text-lg sm:text-xl" : "text-sm")}>{value}</div> : null}
      </div>
    </div>
  );
}
