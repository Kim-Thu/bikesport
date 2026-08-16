import { DefaultTemplate } from "@/components/section-header/templates/DefaultTemplate";
import { FlashSaleTemplate } from "@/components/section-header/templates/FlashSaleTemplate";
import type { SectionHeaderProps, SectionHeaderTemplate } from "@/interfaces/section-header.interface";

const SECTION_HEADER_TEMPLATES: Record<SectionHeaderTemplate, (props: SectionHeaderProps) => React.ReactNode> = {
  default: DefaultTemplate,
  "flash-sale": FlashSaleTemplate,
};

export function SectionHeader({ template = "default", ...props }: SectionHeaderProps) {
  const Template = SECTION_HEADER_TEMPLATES[template];

  return <Template template={template} {...props} />;
}
