import { cn } from "@/lib/classname.utils";

export function getStackColumnDividerClass(index: number, variant: "surface" | "primary") {
  const borderColor = variant === "primary" ? "border-white/25" : "border-gray-200";

  return cn(
    borderColor,
    index === 1 && "border-t sm:border-l sm:border-t-0",
    index === 2 && "border-t lg:border-l lg:border-t-0",
    index === 3 && "border-t sm:border-l lg:border-t-0",
  );
}
