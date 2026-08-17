import type { TabsSliderTemplateProps } from "@/interfaces/tabs-slider.interface";

export function DefaultTemplate({ header, slider }: TabsSliderTemplateProps) {
  return (
    <>
      <div className="mb-3">{header}</div>
      {slider}
    </>
  );
}
