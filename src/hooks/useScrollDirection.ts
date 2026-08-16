"use client";

import { useEffect, useRef, useState } from "react";

export type ScrollDirection = "up" | "down";

interface ScrollDirectionState {
  direction: ScrollDirection;
  isAtTop: boolean;
}

const SCROLL_THRESHOLD = 8;
const TOP_OFFSET = 12;

const INITIAL_STATE: ScrollDirectionState = {
  direction: "up",
  isAtTop: true,
};

export function useScrollDirection(): ScrollDirectionState {
  const [state, setState] = useState<ScrollDirectionState>(INITIAL_STATE);
  const stateRef = useRef<ScrollDirectionState>(INITIAL_STATE);
  const previousScrollY = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    previousScrollY.current = window.scrollY;

    const updateState = (nextState: ScrollDirectionState) => {
      const currentState = stateRef.current;

      if (
        currentState.direction === nextState.direction &&
        currentState.isAtTop === nextState.isAtTop
      ) {
        return;
      }

      stateRef.current = nextState;
      setState(nextState);
    };

    const readScrollPosition = () => {
      frameRef.current = null;

      const currentScrollY = window.scrollY;
      const isAtTop = currentScrollY <= TOP_OFFSET;

      if (isAtTop) {
        previousScrollY.current = currentScrollY;
        updateState({ direction: "up", isAtTop: true });
        return;
      }

      const delta = currentScrollY - previousScrollY.current;
      if (Math.abs(delta) < SCROLL_THRESHOLD) return;

      previousScrollY.current = currentScrollY;
      updateState({
        direction: delta > 0 ? "down" : "up",
        isAtTop: false,
      });
    };

    const handleScroll = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(readScrollPosition);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return state;
}
