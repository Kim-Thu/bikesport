"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Icon } from "@/components/icon/Icon";
import { cn } from "@/lib/classname.utils";

interface CarouselProps {
  children: ReactNode[];
  className?: string;
  viewportClassName?: string;
  trackClassName?: string;
  slideClassName?: string;
  dotsClassName?: string;
  arrowsClassName?: string;
  ariaLabel?: string;
  loop?: boolean;
  dragFree?: boolean;
  showArrows?: boolean;
  autoHeight?: boolean;
}

export function Carousel({
  children,
  className,
  viewportClassName,
  trackClassName,
  slideClassName,
  dotsClassName,
  arrowsClassName,
  ariaLabel = "Carousel",
  loop = false,
  dragFree = false,
  showArrows = false,
  autoHeight = false,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    dragFree,
    align: "start",
    containScroll: "trimSnaps",
    skipSnaps: false,
  });
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScroll, setCanScroll] = useState(false);
  const [viewportHeight, setViewportHeight] = useState<number>();

  const syncHeight = useCallback(
    (index: number) => {
      if (!autoHeight) return;
      window.requestAnimationFrame(() => {
        const slide = slideRefs.current[index];
        if (slide) setViewportHeight(slide.offsetHeight);
      });
    },
    [autoHeight],
  );

  const syncCarouselState = useCallback(() => {
    if (!emblaApi) return;

    const index = emblaApi.selectedScrollSnap();
    setActiveIndex(index);
    setCanScroll(emblaApi.scrollSnapList().length > 1);
    syncHeight(index);
  }, [emblaApi, syncHeight]);

  useEffect(() => {
    if (!emblaApi) return;

    syncCarouselState();
    emblaApi.on("select", syncCarouselState);
    emblaApi.on("reInit", syncCarouselState);

    return () => {
      emblaApi.off("select", syncCarouselState);
      emblaApi.off("reInit", syncCarouselState);
    };
  }, [emblaApi, syncCarouselState]);

  useEffect(() => {
    if (!autoHeight) return;

    const activeSlide = slideRefs.current[activeIndex];
    if (!activeSlide) return;

    const observer = new ResizeObserver(() => syncHeight(activeIndex));
    observer.observe(activeSlide);
    return () => observer.disconnect();
  }, [activeIndex, autoHeight, syncHeight]);

  const scrollToIndex = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <div className={cn("relative", className)} role="region" aria-label={ariaLabel}>
      <div
        ref={emblaRef}
        style={autoHeight && viewportHeight ? { height: viewportHeight } : undefined}
        className={cn(
          "overflow-hidden",
          autoHeight && "transition-[height] duration-300 ease-out",
          canScroll && "cursor-grab active:cursor-grabbing",
          viewportClassName,
        )}
      >
        <div className={cn("flex touch-pan-y items-start", trackClassName)}>
          {children.map((child, index) => (
            <div
              key={index}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              className={cn("flex min-w-0 grow-0 shrink-0 basis-full self-start", slideClassName)}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {showArrows && canScroll ? (
        <div className={cn("pointer-events-none absolute inset-y-0 left-0 right-0 z-30 flex items-center justify-between", arrowsClassName)}>
          <button
            type="button"
            className="pointer-events-auto ml-2 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:border-blue-200 hover:text-blue-600"
            aria-label="Sản phẩm trước"
            onClick={scrollPrev}
          >
            <Icon name="chevron-left" size={18} strokeWidth={2} />
          </button>
          <button
            type="button"
            className="pointer-events-auto mr-2 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:border-blue-200 hover:text-blue-600"
            aria-label="Sản phẩm tiếp theo"
            onClick={scrollNext}
          >
            <Icon name="chevron-right" size={18} strokeWidth={2} />
          </button>
        </div>
      ) : null}

      {canScroll ? (
        <div
          className={cn(
            "absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2",
            dotsClassName,
          )}
          aria-label="Chọn slide"
        >
          {emblaApi?.scrollSnapList().map((_, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={index}
                type="button"
                className={cn(
                  "block h-1.5 cursor-pointer rounded-full bg-white/70 transition-all",
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
