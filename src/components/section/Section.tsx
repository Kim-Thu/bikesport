import type { SectionProps } from "@/interfaces/section.interface";

export function Section({ as: Component = "section", children, className = "" }: SectionProps) {
  return <Component className={className}>{children}</Component>;
}
