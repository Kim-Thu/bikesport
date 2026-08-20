import type { ReactNode } from "react";
import type { MediaItem } from "@/interfaces/media.interface";

export type SectionHeaderTemplate = "default" | "flash-sale" | "featured";
export type SectionHeaderAlign = "left" | "center" | "right";

export interface SectionHeaderProps {
  title?: string;
  titleMediaId?: string | null;
  titleMedia?: MediaItem | null;
  titleAlt?: string;
  href?: string;
  actionLabel?: string;
  template?: SectionHeaderTemplate;
  align?: SectionHeaderAlign;
  countdownAt?: string;
  className?: string;
  children?: ReactNode;
}
