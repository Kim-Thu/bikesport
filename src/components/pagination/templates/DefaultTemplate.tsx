import type { PaginationProps } from "@/interfaces/pagination.interface";
import { cn } from "@/lib/classname.utils";

export function DefaultTemplate({
  page,
  totalPages,
  onPageChange,
  previousLabel = "Trước",
  nextLabel = "Sau",
  ariaLabel = "Phân trang",
  className,
}: PaginationProps) {
  if (totalPages <= 1 || !onPageChange) return null;

  return (
    <nav
      className={cn("flex items-center justify-between gap-4", className)}
      aria-label={ariaLabel}
    >
      <button
        type="button"
        className="cursor-pointer rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
        disabled={page <= 0}
        onClick={() => onPageChange(Math.max(0, page - 1))}
      >
        {previousLabel}
      </button>

      <span className="text-sm font-medium text-gray-600">
        {page + 1} / {totalPages}
      </span>

      <button
        type="button"
        className="cursor-pointer rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
        disabled={page >= totalPages - 1}
        onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
      >
        {nextLabel}
      </button>
    </nav>
  );
}
