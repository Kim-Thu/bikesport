import type { ReactNode } from "react";
import type {
  ActionLinkIconPosition,
  ActionLinkSize,
  ActionLinkTone,
} from "@/variants/action-link.variant";

export interface ActionLinkProps {
  href: string;
  children: ReactNode;
  tone?: ActionLinkTone;
  size?: ActionLinkSize;
  icon?: string;
  iconPosition?: ActionLinkIconPosition;
  className?: string;
  showArrow?: boolean;
}
