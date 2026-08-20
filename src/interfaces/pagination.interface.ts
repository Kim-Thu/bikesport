import type { PaginationVariant } from "@/variants/pagination.variant";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  pathname?: string;
  query?: string;
  anchor?: string;
  previousLabel?: string;
  nextLabel?: string;
  ariaLabel?: string;
  variant?: PaginationVariant;
  className?: string;
}
