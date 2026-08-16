import type { SectionTemplateProps } from "@/interfaces/section.interface";
import { cn } from "@/lib/classname.utils";

export function DefaultTemplate({ as: Component = "section", children, className }: SectionTemplateProps) {
  return <Component className={cn("py-6 sm:py-8", className)}>{children}</Component>;
}
