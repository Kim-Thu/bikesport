import type { ElementType } from "react";
import type { HeadingProps } from "@/interfaces/heading.interface";

export function Heading({ level = 2, children, className = "" }: HeadingProps) {
  const Tag = `h${level}` as ElementType;

  return <Tag className={className}>{children}</Tag>;
}
