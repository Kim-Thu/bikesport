import { twMerge } from "tailwind-merge";

export function cn(...classNames: Array<string | false | null | undefined>): string | undefined {
  const merged = twMerge(classNames.filter(Boolean).join(" "));

  return merged || undefined;
}
