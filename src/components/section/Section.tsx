import type { SectionProps } from "@/interfaces/section.interface";
import { cn } from "@/lib/classname.utils";

export function Section({ as: Component = "section", children, className = "" }: SectionProps) {
  return <Component className={cn(className)}>{children}</Component>;
}
