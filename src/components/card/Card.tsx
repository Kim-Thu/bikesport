import { CategoryTemplate } from "@/components/card/templates/CategoryTemplate";
import type { CardProps, CardTemplate } from "@/interfaces/card.interface";

const CARD_TEMPLATES: Record<CardTemplate, typeof CategoryTemplate> = {
  category: CategoryTemplate,
};

export function Card({ template = "category", ...props }: CardProps) {
  const Template = CARD_TEMPLATES[template];

  return <Template template={template} {...props} />;
}
