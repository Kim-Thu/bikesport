"use client";

import { useEffect, useRef, useState } from "react";

export type ScrollDirection = "up" | "down";

interface ScrollDirectionState {
  direction: ScrollDirection;
  isAtTop: boolean;
}

const SCROLL_THRESHOLD = 8;
const TOP_OFFSET = 12;

export function useScrollDirection(): ScrollDirectionState {
  const [state, setState] = useState<ScrollDirectionState>({
    direction: "up",
    isAtTop: true,
  });
  const previousScrollY = useRef(0);

  useEffect(() => {
    previousScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - previousScrollY.current;
      const isAtTop = currentScrollY <= TOP_OFFSET;

      if (isAtTop) {
        setState({ direction: "up", isAtTop: true });
        previousScrollY.current = currentScrollY;
        return;
      }

      if (Math.abs(delta) < SCROLL_THRESHOLD) return;

      setState({
        direction: delta > 0 ? "down" : "up",
        isAtTop: false,
      });
      previousScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return state;
}
