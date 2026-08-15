import type { ContainerProps } from "@/interfaces/container.interface";

export function Container({ children, className = "" }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-screen-2xl px-6 ${className}`}>{children}</div>;
}
