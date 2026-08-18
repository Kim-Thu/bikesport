import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import { cn } from "@/lib/classname.utils";

interface PaginationLinksProps {
  page: number;
  totalPages: number;
  pathname: string;
  query?: string;
  className?: string;
}

const MAX_VISIBLE_PAGES = 5;

function buildPageHref(pathname: string, page: number, query?: string): string {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (page > 1) params.set("page", String(page));
  const search = params.toString();
  return search ? `${pathname}?${search}` : pathname;
}

function getVisiblePages(page: number, totalPages: number): number[] {
  if (totalPages <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const half = Math.floor(MAX_VISIBLE_PAGES / 2);
  let start = Math.max(1, page - half);
  const end = Math.min(totalPages, start + MAX_VISIBLE_PAGES - 1);

  start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export function PaginationLinks({
  page,
  totalPages,
  pathname,
  query,
  className,
}: PaginationLinksProps) {
  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages(page, totalPages);
  const controlClass =
    "inline-flex h-10 w-10 items-center justify-center rounded-md border text-sm font-semibold transition-colors";

  return (
    <nav
      className={cn("mt-8 flex items-center justify-center gap-2", className)}
      aria-label="Phân trang"
    >
      {page > 1 ? (
        <CLink
          href={buildPageHref(pathname, page - 1, query)}
          aria-label="Trang trước"
          className={cn(
            controlClass,
            "border-gray-200 bg-white text-gray-500 hover:border-blue-700 hover:text-blue-700",
          )}
        >
          <Icon name="chevron-left" size={18} strokeWidth={2} />
        </CLink>
      ) : (
        <span
          aria-hidden="true"
          className={cn(controlClass, "cursor-not-allowed border-gray-100 bg-white text-gray-300")}
        >
          <Icon name="chevron-left" size={18} strokeWidth={2} />
        </span>
      )}

      {visiblePages.map((pageNumber) => {
        const isCurrent = pageNumber === page;

        return isCurrent ? (
          <span
            key={pageNumber}
            aria-current="page"
            className={cn(controlClass, "border-blue-700 bg-blue-700 text-white")}
          >
            {pageNumber}
          </span>
        ) : (
          <CLink
            key={pageNumber}
            href={buildPageHref(pathname, pageNumber, query)}
            aria-label={`Trang ${pageNumber}`}
            className={cn(
              controlClass,
              "border-gray-200 bg-white text-gray-700 hover:border-blue-700 hover:text-blue-700",
            )}
          >
            {pageNumber}
          </CLink>
        );
      })}

      {page < totalPages ? (
        <CLink
          href={buildPageHref(pathname, page + 1, query)}
          aria-label="Trang sau"
          className={cn(
            controlClass,
            "border-gray-200 bg-white text-gray-500 hover:border-blue-700 hover:text-blue-700",
          )}
        >
          <Icon name="chevron-right" size={18} strokeWidth={2} />
        </CLink>
      ) : (
        <span
          aria-hidden="true"
          className={cn(controlClass, "cursor-not-allowed border-gray-100 bg-white text-gray-300")}
        >
          <Icon name="chevron-right" size={18} strokeWidth={2} />
        </span>
      )}
    </nav>
  );
}
