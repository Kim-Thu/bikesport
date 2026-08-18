"use client";

import type { ReactNode } from "react";
import { useScrollDirection } from "@/hooks/useScrollDirection";

interface StickyHeaderProps {
  children: ReactNode;
}

export function StickyHeader({ children }: StickyHeaderProps) {
  const { direction, isAtTop } = useScrollDirection();
  const isHidden = !isAtTop && direction === "down";

  return (
    <header
      id="home"
      className={`sticky top-0 z-40 w-full border-b border-gray-200 bg-white transition-transform duration-300 ease-out ${isHidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      {children}
    </header>
  );
}
