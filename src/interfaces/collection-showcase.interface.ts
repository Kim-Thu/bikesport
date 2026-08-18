import type { ReactNode } from "react";
import type { MediaItem } from "@/interfaces/media.interface";
import type { ActionLinkTone } from "@/variants/action-link.variant";

export interface CollectionShowcaseConfig {
  header?: ReactNode;
  href?: string;
  actionLabel?: string;
  actionTone?: ActionLinkTone;
  backgroundMediaId?: string | null;
  backgroundMedia?: MediaItem | null;
  containerClassName?: string;
}
