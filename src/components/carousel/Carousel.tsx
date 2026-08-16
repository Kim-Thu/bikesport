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

  const scrollToIndex = useCallback((index: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    viewport.scrollTo({
      left: viewport.clientWidth * index,
      behavior: "smooth",
    });
  }, []);

  const handleScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    const viewport = event.currentTarget;
    if (!viewport.clientWidth) return;

    const nextIndex = Math.round(viewport.scrollLeft / viewport.clientWidth);
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  }, []);

  const handlePointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    isDragging.current = true;
    dragStartX.current = event.clientX;
    dragStartScrollLeft.current = viewport.scrollLeft;
    viewport.setPointerCapture(event.pointerId);
  }, []);

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || event.pointerType === "touch") return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    const deltaX = event.clientX - dragStartX.current;
    viewport.scrollLeft = dragStartScrollLeft.current - deltaX;
  }, []);

  const stopDragging = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || event.pointerType === "touch") return;

    isDragging.current = false;
    const viewport = viewportRef.current;
    if (viewport?.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }
  }, []);

  return (
    <div className={cn("relative", className)} role="region" aria-label={ariaLabel}>
      <div
        ref={viewportRef}
        className={cn(
          "overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          viewportClassName,
        )}
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
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
            "absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5",
            dotsClassName,
          )}
          aria-label="Chọn slide"
        >
          {children.map((_, index) => (
            <button
              key={index}
              type="button"
              className={cn(
                "h-1.5 rounded-full bg-white/70 transition-[width,opacity]",
                activeIndex === index ? "w-8 bg-white" : "w-1.5",
              )}
              aria-label={`Chuyển đến slide ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              onClick={() => scrollToIndex(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
