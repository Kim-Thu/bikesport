import type { TabTemplateProps } from "@/interfaces/tabs.interface";
import { cn } from "@/lib/classname.utils";

export function FeaturedTemplate({ item, active, onClick }: TabTemplateProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      data-tab-value={item.value}
      className={cn(
        "shrink-0 cursor-pointer rounded-md border px-3 py-2 text-xs font-semibold transition-colors sm:px-4 sm:text-sm",
        active
          ? "border-blue-700 bg-blue-700 text-white"
          : "border-gray-200 bg-white text-gray-700 hover:border-blue-200 hover:text-blue-700",
      )}
      onClick={onClick}
    >
      {item.label}
    </button>
  );
}
