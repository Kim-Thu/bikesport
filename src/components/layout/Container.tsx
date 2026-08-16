import type { ContainerProps } from "@/interfaces/container.interface";
import { cn } from "@/lib/classname.utils";

export function Container({ children, className = "" }: ContainerProps) {
  return <div className={cn("mx-auto w-full max-w-screen-2xl px-6", className)}>{children}</div>;
}
