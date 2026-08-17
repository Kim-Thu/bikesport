import type { CardProps, CardTemplate } from "@/interfaces/card.interface";
import type { SectionHeadingConfig } from "@/interfaces/section-heading.interface";

export interface CardGridProps extends SectionHeadingConfig {
  items: CardProps[];
  template: CardTemplate;
  gridClassName?: string;
  defaultGridClassName?: string;
}
