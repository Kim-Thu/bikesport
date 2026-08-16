"use client";

import { useCallback, useRef, useState } from "react";
import type { DragEvent, PointerEvent, ReactNode, UIEvent } from "react";
import { cn } from "@/lib/classname.utils";

interface CarouselProps {
  children: ReactNode[];
  className?: string;
  viewportClassName?: string;
  dotsClassName?: string;
  ariaLabel?: string;
}

const DRAG_THRESHOLD_PX = 60;

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
  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
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
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    event.preventDefault();
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartX.current = event.clientX;
    dragStartScrollLeft.current = viewport.scrollLeft;
    viewport.setPointerCapture(event.pointerId);
  }, []);

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !isDraggingRef.current) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    event.preventDefault();
    const deltaX = event.clientX - dragStartX.current;
    viewport.scrollLeft = dragStartScrollLeft.current - deltaX;
  }, []);

  const finishDragging = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !isDraggingRef.current) return;

    isDraggingRef.current = false;
    setIsDragging(false);

    const viewport = viewportRef.current;
    if (!viewport) return;

    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    if (!viewport.clientWidth) return;

    const startIndex = Math.round(dragStartScrollLeft.current / viewport.clientWidth);
    const dragDistance = event.clientX - dragStartX.current;

    if (Math.abs(dragDistance) >= DRAG_THRESHOLD_PX) {
      scrollToIndex(startIndex + (dragDistance < 0 ? 1 : -1));
      return;
    }

    scrollToIndex(startIndex);
  }, [scrollToIndex]);

  const preventNativeDrag = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  return (
    <div className={cn("relative", className)} role="region" aria-label={ariaLabel}>
      <div
        ref={viewportRef}
        className={cn(
          "touch-auto select-none overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          isDragging
            ? "cursor-grabbing scroll-auto snap-none"
            : "cursor-grab scroll-smooth snap-x snap-mandatory",
          viewportClassName,
        )}
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDragging}
        onPointerCancel={finishDragging}
        onDragStart={preventNativeDrag}
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
                className={cn(
                  "block h-1.5 rounded-full bg-white/70 transition-[width,opacity]",
                  isActive ? "w-8 bg-white" : "w-1.5",
                )}
                aria-label={`Chuyển đến slide ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => scrollToIndex(index)}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
