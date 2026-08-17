"use client";

import { Countdown } from "@/components/countdown/Countdown";
import type { TabTemplateProps } from "@/interfaces/tabs.interface";
import { cn } from "@/lib/classname.utils";

export function FlashSaleTemplate({ item, active, onClick }: TabTemplateProps) {
  const isActiveSession = item.status === "active";
  const isUpcoming = item.status === "upcoming";

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      data-tab-value={item.value}
      onClick={onClick}
      className={cn(
        "shrink-0 cursor-pointer rounded-lg border bg-white px-3 py-2 text-left transition-colors sm:px-4",
        active
          ? "border-red-400 text-red-600"
          : "border-gray-200 text-gray-700 hover:border-red-200 hover:text-red-600",
      )}
    >
      <span className="flex min-w-24 flex-col gap-1">
        <span className="text-sm font-bold sm:text-base">{item.label}</span>
        <span className="text-2xs font-semibold uppercase text-gray-500">
          {isActiveSession ? "Đang diễn ra" : isUpcoming ? "Sắp diễn ra" : "Đã kết thúc"}
        </span>

        {active && isActiveSession && item.endAt ? (
          <span className="mt-1 border-t border-red-100 pt-2">
            <span className="mb-1 block text-2xs font-semibold uppercase text-gray-500">Kết thúc sau</span>
            <Countdown endAt={item.endAt} variant="compact" />
          </span>
        ) : null}
      </span>
    </button>
  );
}
