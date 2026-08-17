"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/classname.utils";

interface RemainingTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type CountdownVariant = "default" | "compact" | "responsive" | "session";

function getRemaining(endAt: string): RemainingTime {
  const diff = Math.max(0, new Date(endAt).getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function CountdownUnit({
  value,
  label,
  variant,
}: {
  value: number | null;
  label: string;
  variant: CountdownVariant;
}) {
  if (variant === "session") {
    return (
      <span
        className="min-w-6 rounded bg-white px-1 py-0.5 text-center text-xs font-bold tabular-nums text-red-600"
        aria-label={label}
      >
        {value === null ? "--" : String(value).padStart(2, "0")}
      </span>
    );
  }

  const compactUnit = variant === "compact" || variant === "responsive";

  return (
    <span
      className={cn(
        "rounded-md bg-white py-1 text-center text-red-600",
        compactUnit ? "min-w-0 px-1 sm:px-2" : "min-w-12 px-2",
      )}
    >
      <span className="block text-sm font-bold tabular-nums sm:text-base">
        {value === null ? "--" : String(value).padStart(2, "0")}
      </span>
      <span className="block text-2xs font-medium uppercase text-gray-500">{label}</span>
    </span>
  );
}

export function Countdown({
  endAt,
  variant = "default",
}: {
  endAt: string;
  variant?: CountdownVariant;
}) {
  const [remaining, setRemaining] = useState<RemainingTime | null>(null);

  useEffect(() => {
    const update = () => setRemaining(getRemaining(endAt));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [endAt]);

  const totalHours = remaining ? remaining.days * 24 + remaining.hours : null;

  return (
    <span
      aria-label={
        remaining
          ? `Còn ${remaining.days} ngày ${remaining.hours} giờ ${remaining.minutes} phút ${remaining.seconds} giây`
          : "Đang tải thời gian Flash Sale"
      }
      className={cn(
        variant === "compact"
          ? "grid w-full grid-cols-4 gap-1"
          : variant === "responsive"
            ? "grid w-full grid-cols-4 gap-1 sm:flex sm:w-auto sm:items-center sm:gap-2"
            : variant === "session"
              ? "inline-flex items-center gap-1"
              : "flex items-center gap-2",
      )}
    >
      {variant === "session" ? (
        <>
          <CountdownUnit value={totalHours} label="Giờ" variant={variant} />
          <span className="text-xs font-bold text-current">:</span>
          <CountdownUnit value={remaining?.minutes ?? null} label="Phút" variant={variant} />
          <span className="text-xs font-bold text-current">:</span>
          <CountdownUnit value={remaining?.seconds ?? null} label="Giây" variant={variant} />
        </>
      ) : (
        <>
          <CountdownUnit value={remaining?.days ?? null} label="Ngày" variant={variant} />
          <CountdownUnit value={remaining?.hours ?? null} label="Giờ" variant={variant} />
          <CountdownUnit value={remaining?.minutes ?? null} label="Phút" variant={variant} />
          <CountdownUnit value={remaining?.seconds ?? null} label="Giây" variant={variant} />
        </>
      )}
    </span>
  );
}
