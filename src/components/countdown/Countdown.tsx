"use client";

import { useEffect, useState } from "react";

function getRemaining(endAt: string) {
  const diff = Math.max(0, new Date(endAt).getTime() - Date.now());
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return { hours, minutes, seconds };
}

export function Countdown({ endAt }: { endAt: string }) {
  const [remaining, setRemaining] = useState(() => getRemaining(endAt));

  useEffect(() => {
    const update = () => setRemaining(getRemaining(endAt));
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [endAt]);

  const format = (value: number) => String(value).padStart(2, "0");

  return (
    <span
      suppressHydrationWarning
      aria-label={`Còn ${remaining.hours} giờ ${remaining.minutes} phút ${remaining.seconds} giây`}
      className="font-mono text-sm font-bold tracking-wide text-gray-900"
    >
      {format(remaining.hours)} : {format(remaining.minutes)} : {format(remaining.seconds)}
    </span>
  );
}
