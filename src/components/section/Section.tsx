import type { ReactNode } from "react";
import { DefaultTemplate } from "@/components/section/templates/DefaultTemplate";
import { FlashSaleTemplate } from "@/components/section/templates/FlashSaleTemplate";
import type { SectionProps, SectionTemplate } from "@/interfaces/section.interface";

const SECTION_TEMPLATES: Record<SectionTemplate, (props: SectionProps) => ReactNode> = {
  default: DefaultTemplate,
  "flash-sale": FlashSaleTemplate,
};

export function Section({ template = "default", ...props }: SectionProps) {
  const Template = SECTION_TEMPLATES[template];
  return <Template template={template} {...props} />;
}
