import type { StackProps, StackVariant } from "@/interfaces/stack.interface";
import { cn } from "@/lib/classname.utils";

const STACK_VARIANT_CLASS: Record<StackVariant, string> = {
  surface: "border border-gray-200 bg-white text-gray-900",
  primary: "border border-blue-600 bg-blue-600 text-white",
};

export function Stack({ children, variant = "surface", className }: StackProps) {
  return (
    <div className={cn("overflow-hidden rounded-xl", STACK_VARIANT_CLASS[variant], className)}>
      {children}
    </div>
  );
}
