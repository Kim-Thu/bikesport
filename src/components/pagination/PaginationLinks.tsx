import { CLink } from "@/components/link/CLink";

interface PaginationLinksProps {
  page: number;
  totalPages: number;
  pathname: string;
  query?: string;
  className?: string;
}

function buildPageHref(pathname: string, page: number, query?: string): string {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (page > 1) params.set("page", String(page));
  const search = params.toString();
  return search ? `${pathname}?${search}` : pathname;
}

export function PaginationLinks({
  page,
  totalPages,
  pathname,
  query,
  className,
}: PaginationLinksProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className={`mt-8 flex items-center justify-center gap-4 ${className ?? ""}`} aria-label="Phân trang">
      {page > 1 ? (
        <CLink
          href={buildPageHref(pathname, page - 1, query)}
          className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-blue-700 hover:text-blue-700"
        >
          Trước
        </CLink>
      ) : null}

      <span className="text-sm font-medium text-gray-600">
        {page} / {totalPages}
      </span>

      {page < totalPages ? (
        <CLink
          href={buildPageHref(pathname, page + 1, query)}
          className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-blue-700 hover:text-blue-700"
        >
          Sau
        </CLink>
      ) : null}
    </nav>
  );
}
