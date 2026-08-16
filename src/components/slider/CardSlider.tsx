import { Card } from "@/components/card/Card";
import { Carousel } from "@/components/carousel/Carousel";
import type { CardProps } from "@/interfaces/card.interface";

export interface CardSliderItem extends CardProps {
  _key: string;
}

interface CardSliderProps {
  items: CardSliderItem[];
  ariaLabel: string;
}

export function CardSlider({ items, ariaLabel }: CardSliderProps) {
  if (!items.length) return null;

  const repeatCount = Math.max(1, Math.ceil(10 / items.length));
  const slides = Array.from({ length: repeatCount }, () => items).flat();

  return (
    <Carousel
      loop
      dragFree
      showArrows
      ariaLabel={ariaLabel}
      slideClassName="basis-48 pr-3 sm:basis-52 lg:basis-1/5"
      dotsClassName="hidden"
    >
      {slides.map(({ _key, ...item }, index) => (
        <Card key={`${_key}-${index}`} {...item} />
      ))}
    </Carousel>
  );
}
