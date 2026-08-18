import type { ReactNode } from "react";
import { Icon } from "@/components/icon/Icon";
import { cn } from "@/lib/classname.utils";

interface InfoCardProps {
  icon?: string;
  label: string;
  description?: string;
  value?: ReactNode;
  valueClassName?: string;
}

export function InfoCard({ icon, label, description, value, valueClassName }: InfoCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white/95 p-4">
      {icon ? <Icon name={icon} className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" /> : null}
      <div className="min-w-0 flex-1">
        <div className="text-2xs font-bold uppercase tracking-wide text-gray-900 sm:text-xs">{label}</div>
        {description ? <div className="mt-0.5 text-2xs text-gray-500 sm:text-xs">{description}</div> : null}
        {value ? <div className={cn("mt-1 text-sm font-bold text-blue-700", valueClassName)}>{value}</div> : null}
      </div>
    </div>
  );
}
