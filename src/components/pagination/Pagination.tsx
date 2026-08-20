import type { ComponentType } from "react";
import { DefaultTemplate } from "@/components/pagination/templates/DefaultTemplate";
import { NumberedTemplate } from "@/components/pagination/templates/NumberedTemplate";
import type { PaginationProps } from "@/interfaces/pagination.interface";
import type { PaginationVariant } from "@/variants/pagination.variant";

const PAGINATION_TEMPLATES: Record<PaginationVariant, ComponentType<PaginationProps>> = {
  default: DefaultTemplate,
  numbered: NumberedTemplate,
};

export function Pagination({ variant = "default", ...props }: PaginationProps) {
  const Template = PAGINATION_TEMPLATES[variant];
  return <Template {...props} variant={variant} />;
}
