import type { StackVariant } from "@/interfaces/stack.interface";
import { cn } from "@/lib/classname.utils";

export function getStackColumnDividerClass(index: number, variant: StackVariant) {
  if (index === 0) return "";

  const borderColor = variant === "primary" ? "border-white/25" : "border-gray-200";

  return cn(borderColor, "border-t lg:border-l lg:border-t-0");
}
