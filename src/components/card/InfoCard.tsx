import type { ReactNode } from "react";
import { Icon } from "@/components/icon/Icon";

interface InfoCardProps {
  icon?: string;
  label: string;
  description?: string;
  value?: ReactNode;
}

export function InfoCard({ icon, label, description, value }: InfoCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white/95 p-3">
      {icon ? <Icon name={icon} className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" /> : null}
      <div className="min-w-0">
        <div className="text-2xs font-bold uppercase tracking-wide text-gray-900 sm:text-xs">{label}</div>
        {description ? <div className="mt-0.5 text-2xs text-gray-500 sm:text-xs">{description}</div> : null}
        {value ? <div className="mt-1 text-sm font-bold text-blue-600">{value}</div> : null}
      </div>
    </div>
  );
}
