import type { ReactNode } from "react";

export interface CollectionShowcaseConfig {
  header?: ReactNode;
  href?: string;
  actionLabel?: string;
  backgroundMediaId?: string | null;
  containerClassName?: string;
}
