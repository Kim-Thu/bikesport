import type { ReactNode } from "react";

export interface BoxIconProps {
  icon?: string;
  iconMediaId?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  iconClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}
