import type { ProductSliderLayoutTemplateProps } from "@/interfaces/product-slider-layout.interface";

export function DefaultTemplate({ header, slider }: ProductSliderLayoutTemplateProps) {
  return (
    <>
      {header ? <div className="mb-4">{header}</div> : null}
      {slider}
    </>
  );
}
