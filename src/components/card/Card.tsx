import { CategoryTemplate } from "@/components/card/templates/CategoryTemplate";
import { ProductTemplate } from "@/components/card/templates/ProductTemplate";
import { PromotionTemplate } from "@/components/card/templates/PromotionTemplate";
import type { CardProps, CardTemplate } from "@/interfaces/card.interface";

const CARD_TEMPLATES: Record<CardTemplate, (props: CardProps) => React.ReactNode> = {
  category: CategoryTemplate,
  product: ProductTemplate,
  promotion: PromotionTemplate,
};

export function Card({ template = "category", ...props }: CardProps) {
  const Template = CARD_TEMPLATES[template];

  return <Template template={template} {...props} />;
}
