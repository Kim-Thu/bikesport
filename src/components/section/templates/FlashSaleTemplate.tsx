import type { SectionTemplateProps } from "@/interfaces/section.interface";
import { cn } from "@/lib/classname.utils";

export function FlashSaleTemplate({ as: Component = "section", children, className }: SectionTemplateProps) {
  return (
    <Component className={cn("border-y border-red-100 bg-red-50 py-6 sm:py-8", className)}>
      {children}
    </Component>
  );
}
