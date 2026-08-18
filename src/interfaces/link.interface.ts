import type { AnchorHTMLAttributes, ReactNode } from "react";

export interface CLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href?: string;
  children: ReactNode;
  prefetch?: boolean;
}

export interface LinkInfo {
  href: string;
  isExternal: boolean;
  useNativeAnchor: boolean;
}
