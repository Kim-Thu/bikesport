"use client";

import { Countdown } from "@/components/countdown/Countdown";
import type { TabTemplateProps } from "@/interfaces/tabs.interface";
import { cn } from "@/lib/classname.utils";

const STATUS_LABELS = {
  active: "Còn",
  upcoming: "Sắp",
  ended: "Xong",
} as const;

export function FlashSaleTemplate({ item, active, onClick }: TabTemplateProps) {
  const countdownAt =
    item.status === "active"
      ? item.endAt
      : item.status === "upcoming"
        ? item.startAt
        : undefined;

  const statusLabel = item.status ? STATUS_LABELS[item.status] : undefined;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      data-tab-value={item.value}
      onClick={onClick}
      className={cn(
        "flex min-w-32 shrink-0 cursor-pointer flex-col items-center justify-center rounded-lg px-3 py-2 text-center transition-colors sm:min-w-36 sm:px-4",
        active
          ? "bg-red-500 text-white"
          : "text-gray-700 hover:bg-red-50 hover:text-red-600",
      )}
    >
      <span className={cn("text-xs font-medium", active ? "text-white/90" : "text-gray-500")}>{statusLabel}</span>

      {item.status === "upcoming" ? (
        <span className="mt-0.5 text-sm font-semibold sm:text-base">{item.label}</span>
      ) : item.status === "ended" ? (
        <span className="mt-0.5 text-sm font-semibold text-gray-400 sm:text-base">{item.label}</span>
      ) : null}

      {countdownAt ? (
        <span className="mt-1">
          <Countdown endAt={countdownAt} variant="session" />
        </span>
      ) : null}
    </button>
  );
}
