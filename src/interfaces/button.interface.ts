import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "icon";
  icon?: string;
  label?: string;
  children?: ReactNode;
}
