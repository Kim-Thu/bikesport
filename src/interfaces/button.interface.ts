import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "icon" | "outline";
  icon?: string;
  iconSize?: number;
  label?: string;
  children?: ReactNode;
}
