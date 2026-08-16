"use client";

import { useEffect, useState } from "react";

interface RemainingTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

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

function CountdownUnit({ value, label }: { value: number | null; label: string }) {
  return (
    <span className="min-w-12 rounded-md bg-white px-2 py-1 text-center text-red-600">
      <span className="block text-sm font-bold tabular-nums sm:text-base">
        {value === null ? "--" : String(value).padStart(2, "0")}
      </span>
      <span className="block text-2xs font-medium uppercase text-gray-500">{label}</span>
    </span>
  );
}

export function Countdown({ endAt }: { endAt: string }) {
  const [remaining, setRemaining] = useState<RemainingTime | null>(null);

  useEffect(() => {
    const update = () => setRemaining(getRemaining(endAt));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [endAt]);

  return (
    <span
      aria-label={
        remaining
          ? `Còn ${remaining.days} ngày ${remaining.hours} giờ ${remaining.minutes} phút ${remaining.seconds} giây`
          : "Đang tải thời gian Flash Sale"
      }
      className="flex items-center gap-2"
    >
      <CountdownUnit value={remaining?.days ?? null} label="Ngày" />
      <CountdownUnit value={remaining?.hours ?? null} label="Giờ" />
      <CountdownUnit value={remaining?.minutes ?? null} label="Phút" />
      <CountdownUnit value={remaining?.seconds ?? null} label="Giây" />
    </span>
  );
}
