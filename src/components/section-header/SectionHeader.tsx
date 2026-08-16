import { DefaultTemplate } from "@/components/section-header/templates/DefaultTemplate";
import type { SectionHeaderProps } from "@/interfaces/section-header.interface";

const SECTION_HEADER_TEMPLATES = {
  default: DefaultTemplate,
};

export function SectionHeader({ template = "default", ...props }: SectionHeaderProps) {
  const Template = SECTION_HEADER_TEMPLATES[template];

  return <Template template={template} {...props} />;
}
