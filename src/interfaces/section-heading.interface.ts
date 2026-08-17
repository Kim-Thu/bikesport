import type { SectionHeaderTemplate } from "@/interfaces/section-header.interface";

export interface SectionHeadingConfig {
  title?: string;
  titleMediaId?: string | null;
  titleAlt?: string;
  href?: string;
  actionLabel?: string;
  headingTemplate?: SectionHeaderTemplate;
}
