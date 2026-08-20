import type { CardProps, CardTemplate } from "@/interfaces/card.interface";
import type { SectionHeadingConfig } from "@/interfaces/section-heading.interface";

export interface CardGridItem extends CardProps {
  _key: string;
}

export interface CardGridProps extends SectionHeadingConfig {
  items: CardGridItem[];
  template: CardTemplate;
  gridClassName?: string;
  defaultGridClassName?: string;
}
