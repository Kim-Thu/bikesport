import type { ReactNode } from "react";
import { DefaultTemplate } from "@/components/section-header/templates/DefaultTemplate";
import { FeaturedTemplate } from "@/components/section-header/templates/FeaturedTemplate";
import { FlashSaleTemplate } from "@/components/section-header/templates/FlashSaleTemplate";
import type { SectionHeaderProps, SectionHeaderTemplate } from "@/interfaces/section-header.interface";

const SECTION_HEADER_TEMPLATES: Record<SectionHeaderTemplate, (props: SectionHeaderProps) => ReactNode> = {
  default: DefaultTemplate,
  featured: FeaturedTemplate,
  "flash-sale": FlashSaleTemplate,
};

export function SectionHeader({ template = "default", ...props }: SectionHeaderProps) {
  const Template = SECTION_HEADER_TEMPLATES[template];

  return <Template template={template} {...props} />;
}
