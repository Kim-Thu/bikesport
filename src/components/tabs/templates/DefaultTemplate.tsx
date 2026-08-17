import type { TabTemplateProps } from "@/interfaces/tabs.interface";
import { cn } from "@/lib/classname.utils";

export function DefaultTemplate({ item, active, onClick }: TabTemplateProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      data-tab-value={item.value}
      className={cn(
        "shrink-0 cursor-pointer border-b-2 px-1 py-2 text-xs font-semibold transition-colors sm:text-sm",
        active
          ? "border-blue-600 text-blue-600"
          : "border-transparent text-gray-600 hover:text-blue-600",
      )}
      onClick={onClick}
    >
      {item.label}
    </button>
  );
}
