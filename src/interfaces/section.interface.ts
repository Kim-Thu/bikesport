import type { ElementType, ReactNode } from "react";

export type SectionTemplate = "default" | "flash-sale";

export interface SectionTemplateProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

export interface SectionProps extends SectionTemplateProps {
  template?: SectionTemplate;
}
