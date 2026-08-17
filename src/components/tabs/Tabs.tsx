"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/classname.utils";

export interface TabItem {
  label: string;
  value: string;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const DRAG_THRESHOLD = 4;

export function Tabs({ items, value, onChange, className }: TabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });
  const suppressClickRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const activeTab = containerRef.current?.querySelector<HTMLElement>(`[data-tab-value="${CSS.escape(value)}"]`);
    activeTab?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, [value]);

  function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
    const container = containerRef.current;
    if (!container || container.scrollWidth <= container.clientWidth) return;

    const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
    if (!delta) return;

    event.preventDefault();
    container.scrollLeft += delta;
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" || event.button !== 0) return;

    const container = containerRef.current;
    if (!container || container.scrollWidth <= container.clientWidth) return;

    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: container.scrollLeft,
      moved: false,
    };
    container.setPointerCapture(event.pointerId);
    setIsDragging(true);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const container = containerRef.current;
    const drag = dragRef.current;
    if (!container || !drag.active || drag.pointerId !== event.pointerId) return;

    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > DRAG_THRESHOLD) drag.moved = true;
    container.scrollLeft = drag.startScrollLeft - distance;
  }

  function endDrag(event: React.PointerEvent<HTMLDivElement>) {
    const container = containerRef.current;
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) return;

    suppressClickRef.current = drag.moved;
    drag.active = false;
    setIsDragging(false);

    if (container?.hasPointerCapture(event.pointerId)) {
      container.releasePointerCapture(event.pointerId);
    }
  }

  function handleTabClick(itemValue: string) {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    onChange(itemValue);
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex min-w-0 items-center gap-5 overflow-x-auto overscroll-x-contain scroll-smooth select-none",
        isDragging ? "cursor-grabbing" : "cursor-grab",
        className,
      )}
      role="tablist"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {items.map((item) => {
        const active = item.value === value;

        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            data-tab-value={item.value}
            className={cn(
              "shrink-0 cursor-pointer border-b-2 px-1 py-2 text-xs font-semibold transition-colors sm:text-sm",
              active
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-blue-600",
            )}
            onClick={() => handleTabClick(item.value)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
