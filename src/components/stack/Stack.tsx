import type { StackProps, StackVariant } from "@/interfaces/stack.interface";
import { cn } from "@/lib/classname.utils";

const STACK_VARIANT_CLASS: Record<StackVariant, string> = {
  surface: "border border-gray-200 bg-white text-gray-900",
  primary: "border border-blue-700 bg-blue-700 text-white",
  cards: "bg-transparent text-gray-900",
};

export function Stack({ children, variant = "surface", className }: StackProps) {
  return (
    <div className={cn(variant === "cards" ? "" : "overflow-hidden rounded-xl", STACK_VARIANT_CLASS[variant], className)}>
      {children}
    </div>
  );
}
