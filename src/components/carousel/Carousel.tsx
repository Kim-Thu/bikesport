"use client";

import { useCallback, useRef, useState } from "react";
import type { PointerEvent, ReactNode, UIEvent } from "react";
import { cn } from "@/lib/classname.utils";

interface CarouselProps {
  children: ReactNode[];
  className?: string;
  viewportClassName?: string;
  dotsClassName?: string;
  ariaLabel?: string;
}

export function Carousel({
  children,
  className,
  viewportClassName,
  dotsClassName,
  ariaLabel = "Carousel",
}: CarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);
  const isDragging = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const safeIndex = Math.max(0, Math.min(index, children.length - 1));

    viewport.scrollTo({
      left: viewport.clientWidth * safeIndex,
      behavior,
    });

    setActiveIndex(safeIndex);
  }, [children.length]);

  const handleScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    const viewport = event.currentTarget;
    if (!viewport.clientWidth) return;

    const nextIndex = Math.max(
      0,
      Math.min(children.length - 1, Math.round(viewport.scrollLeft / viewport.clientWidth)),
    );

    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  }, [children.length]);

  const handlePointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === "mouse") return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    isDragging.current = true;
    dragStartX.current = event.clientX;
    dragStartScrollLeft.current = viewport.scrollLeft;
    viewport.setPointerCapture(event.pointerId);
  }, []);

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    const deltaX = event.clientX - dragStartX.current;
    viewport.scrollLeft = dragStartScrollLeft.current - deltaX;
  }, []);

  const finishDragging = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    isDragging.current = false;

    const viewport = viewportRef.current;
    if (!viewport) return;

    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    if (!viewport.clientWidth) return;

    const nextIndex = Math.max(
      0,
      Math.min(children.length - 1, Math.round(viewport.scrollLeft / viewport.clientWidth)),
    );

    scrollToIndex(nextIndex);
  }, [children.length, scrollToIndex]);

  return (
    <div className={cn("relative", className)} role="region" aria-label={ariaLabel}>
      <div
        ref={viewportRef}
        className={cn(
          "cursor-grab touch-pan-y select-none overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          viewportClassName,
        )}
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDragging}
        onPointerCancel={finishDragging}
        onLostPointerCapture={finishDragging}
      >
        <div className="flex">
          {children.map((child, index) => (
            <div key={index} className="min-w-full shrink-0 snap-start">
              {child}
            </div>
          ))}
        </div>
      </div>

      {children.length > 1 ? (
        <div
          className={cn(
            "absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2",
            dotsClassName,
          )}
          aria-label="Chọn slide"
        >
          {children.map((_, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={index}
                type="button"
                className="flex min-h-8 min-w-8 items-center justify-center rounded-full"
                aria-label={`Chuyển đến slide ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => scrollToIndex(index)}
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full bg-white/70 transition-[width,opacity]",
                    isActive ? "w-8 bg-white" : "w-1.5",
                  )}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
