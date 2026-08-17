"use client";

import { Countdown } from "@/components/countdown/Countdown";
import type { TabTemplateProps } from "@/interfaces/tabs.interface";
import { cn } from "@/lib/classname.utils";

const STATUS_LABELS = {
  active: "ĐANG",
  upcoming: "SẮP",
  ended: "XONG",
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
        "flex min-w-40 shrink-0 cursor-pointer flex-col items-center rounded-lg border bg-white px-3 py-3 text-center transition-colors sm:px-4",
        active
          ? "border-red-400 text-red-600"
          : "border-gray-200 text-gray-700 hover:border-red-200 hover:text-red-600",
      )}
    >
      <span className="text-sm font-bold sm:text-base">{item.label}</span>

      {statusLabel ? (
        <span
          className={cn(
            "mt-1 text-2xs font-semibold uppercase",
            item.status === "active"
              ? "text-red-500"
              : item.status === "upcoming"
                ? "text-gray-500"
                : "text-gray-400",
          )}
        >
          {statusLabel}
        </span>
      ) : null}

      {countdownAt ? (
        <span className="mt-2 w-full border-t border-gray-100 pt-2">
          <Countdown endAt={countdownAt} variant="compact" />
        </span>
      ) : null}
    </button>
  );
}
