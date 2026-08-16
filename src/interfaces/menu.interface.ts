import type { HeadingLevel } from "@/interfaces/heading.interface";

export interface CMenuProps {
  menuId: string;
  title?: string;
  headingLevel?: HeadingLevel;
  sectionClassName?: string;
  headingClassName?: string;
  listClassName?: string;
  itemClassName?: string;
  linkClassName?: string;
  includeChildren?: boolean;
}
