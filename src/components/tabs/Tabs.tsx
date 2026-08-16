"use client";

import { cn } from "@/lib/classname.utils";

export interface TabItem {
  label: string;
  value: string;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Tabs({ items, value, onChange, className }: TabsProps) {
  return (
    <div className={cn("flex items-center gap-5 overflow-x-auto", className)} role="tablist">
      {items.map((item) => {
        const active = item.value === value;

        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            className={cn(
              "shrink-0 cursor-pointer border-b-2 px-1 py-2 text-xs font-semibold transition-colors sm:text-sm",
              active
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-blue-600",
            )}
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
