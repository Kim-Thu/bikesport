import type { ElementType } from "react";
import type { HeadingProps } from "@/interfaces/heading.interface";
import { cn } from "@/lib/classname.utils";

export function Heading({ level = 2, children, className = "" }: HeadingProps) {
  const Tag = `h${level}` as ElementType;

  return <Tag className={cn(className)}>{children}</Tag>;
}
