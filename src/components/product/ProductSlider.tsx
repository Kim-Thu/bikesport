import { Card } from "@/components/card/Card";
import { Carousel } from "@/components/carousel/Carousel";

export interface ProductSliderItem {
  sku: string;
  name: string;
  slug: string;
  mediaId?: string | null;
  price: number;
  salePrice?: number | null;
  discountPercentage?: number | null;
}

interface ProductSliderProps {
  items: ProductSliderItem[];
  ariaLabel: string;
}

export function ProductSlider({ items, ariaLabel }: ProductSliderProps) {
  if (!items.length) return null;

  const slides = items.length <= 5 ? [...items, ...items] : items;

  return (
    <Carousel
      loop
      dragFree
      showArrows
      ariaLabel={ariaLabel}
      slideClassName="basis-48 pr-3 sm:basis-52 lg:basis-1/5"
      dotsClassName="hidden"
    >
      {slides.map((product, index) => (
        <Card
          key={`${product.sku}-${index}`}
          template="product"
          title={product.name}
          href={`/san-pham/${product.slug}`}
          mediaId={product.mediaId}
          price={product.price}
          salePrice={product.salePrice}
          discountPercentage={product.discountPercentage}
        />
      ))}
    </Carousel>
  );
}
