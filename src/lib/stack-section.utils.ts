import type { StackVariant } from "@/interfaces/stack.interface";
import { cn } from "@/lib/classname.utils";

export function getStackRowClass(variant: StackVariant) {
  return variant === "cards" ? "gap-4" : undefined;
}

export function getStackColumnClass(variant: StackVariant) {
  return variant === "cards"
    ? "rounded-xl border border-gray-200 bg-white px-5 py-6 shadow-sm lg:px-6"
    : "px-5 py-5 lg:px-6";
}

export function getStackColumnDividerClass(index: number, variant: StackVariant) {
  if (variant === "cards" || index === 0) return "";

  const borderColor = variant === "primary" ? "border-white/25" : "border-gray-200";

  return cn(borderColor, "border-t lg:border-l lg:border-t-0");
}
