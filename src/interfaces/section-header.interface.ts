import type { ReactNode } from "react";
import type { MediaItem } from "@/interfaces/media.interface";

export type SectionHeaderTemplate = "default" | "flash-sale" | "featured";

export interface SectionHeaderProps {
  title?: string;
  titleMediaId?: string | null;
  titleMedia?: MediaItem | null;
  titleAlt?: string;
  href?: string;
  actionLabel?: string;
  template?: SectionHeaderTemplate;
  countdownAt?: string;
  className?: string;
  children?: ReactNode;
}
