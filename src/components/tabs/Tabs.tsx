"use client";

import { useEffect, useRef, useState } from "react";
import { MediaImage } from "@/components/media/MediaImage";
import { cn } from "@/lib/classname.utils";
import type { TabsTemplate } from "@/variants/tabs.variant";

export interface TabItem {
  label: string;
  value: string;
  mediaId?: string | null;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  template?: TabsTemplate;
}

const DRAG_THRESHOLD = 4;
const SCROLL_PADDING = 12;

export function Tabs({ items, value, onChange, className, template = "default" }: TabsProps) {
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
    const container = containerRef.current;
    const activeTab = container?.querySelector<HTMLElement>(`[data-tab-value="${CSS.escape(value)}"]`);
    if (!container || !activeTab) return;

    const tabLeft = activeTab.offsetLeft;
    const tabRight = tabLeft + activeTab.offsetWidth;
    const visibleLeft = container.scrollLeft;
    const visibleRight = visibleLeft + container.clientWidth;

    if (tabLeft < visibleLeft + SCROLL_PADDING) {
      container.scrollTo({
        left: Math.max(0, tabLeft - SCROLL_PADDING),
        behavior: "smooth",
      });
    } else if (tabRight > visibleRight - SCROLL_PADDING) {
      container.scrollTo({
        left: tabRight - container.clientWidth + SCROLL_PADDING,
        behavior: "smooth",
      });
    }
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
        "scrollbar-none flex min-w-0 items-center overflow-x-auto overscroll-x-contain scroll-smooth select-none",
        template === "image" ? "gap-3" : "gap-5",
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
              "shrink-0 cursor-pointer transition-colors",
              template === "image"
                ? cn(
                    "overflow-hidden rounded-lg border bg-white p-2",
                    active ? "border-blue-600 ring-1 ring-blue-600" : "border-gray-200 hover:border-blue-300",
                  )
                : cn(
                    "border-b-2 px-1 py-2 text-xs font-semibold sm:text-sm",
                    active
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-blue-600",
                  ),
            )}
            onClick={() => handleTabClick(item.value)}
          >
            {template === "image" ? (
              <span className="flex h-10 w-20 items-center justify-center sm:h-12 sm:w-24">
                <MediaImage
                  mediaId={item.mediaId}
                  alt={item.label}
                  width={96}
                  height={48}
                  className="h-full w-full object-contain"
                />
                <span className="sr-only">{item.label}</span>
              </span>
            ) : (
              item.label
            )}
          </button>
        );
      })}
    </div>
  );
}
