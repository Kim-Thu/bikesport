import type { PaginationVariant } from "@/variants/pagination.variant";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  previousLabel?: string;
  nextLabel?: string;
  ariaLabel?: string;
  variant?: PaginationVariant;
  className?: string;
}
