import type { ReactNode } from "react";
import { CategoryTemplate } from "@/components/card/templates/CategoryTemplate";
import { EventTemplate } from "@/components/card/templates/EventTemplate";
import { ProductTemplate } from "@/components/card/templates/ProductTemplate";
import { PromotionTemplate } from "@/components/card/templates/PromotionTemplate";
import type { CardProps, CardTemplate } from "@/interfaces/card.interface";

const CARD_TEMPLATES: Record<CardTemplate, (props: CardProps) => ReactNode> = {
  category: CategoryTemplate,
  event: EventTemplate,
  product: ProductTemplate,
  promotion: PromotionTemplate,
};

export function Card({ template = "category", ...props }: CardProps) {
  const Template = CARD_TEMPLATES[template];

  return <Template template={template} {...props} />;
}
