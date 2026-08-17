import { Card } from "@/components/card/Card";
import { Carousel } from "@/components/carousel/Carousel";
import type { CardProps, CardTemplate } from "@/interfaces/card.interface";
import { cn } from "@/lib/classname.utils";

export interface ProductSliderItem extends Omit<CardProps, "template"> {
  _key: string;
}

interface ProductSliderProps {
  items: ProductSliderItem[];
  template: CardTemplate;
  ariaLabel: string;
  trackClassName?: string;
  slideClassName?: string;
}

export function ProductSlider({
  items,
  template,
  ariaLabel,
  trackClassName,
  slideClassName,
}: ProductSliderProps) {
  if (!items.length) return null;

  return (
    <Carousel
      loop
      dragFree
      showArrows
      stretchSlides
      ariaLabel={ariaLabel}
      trackClassName={trackClassName}
      slideClassName={cn("max-sm:basis-full", slideClassName)}
      dotsClassName="hidden"
    >
      {items.map(({ _key, ...item }) => (
        <Card key={_key} template={template} {...item} />
      ))}
    </Carousel>
  );
}
