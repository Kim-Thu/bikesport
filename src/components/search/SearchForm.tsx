import { Icon } from "@/components/icon/Icon";
import type { SearchFormProps } from "@/interfaces/search.interface";
import { cn } from "@/lib/classname.utils";

const VARIANT_CLASS = {
  default: "flex w-full",
  desktop: "hidden w-full lg:flex",
  mobile: "flex w-full lg:hidden",
} as const;

export function SearchForm({
  action = "/search",
  placeholder = "Tìm kiếm...",
  variant = "default",
  defaultValue,
  submitLabel = "Tìm kiếm",
}: SearchFormProps) {
  const inputId = `site-search-${variant}`;

  return (
    <form
      action={action}
      method="get"
      className={cn(
        VARIANT_CLASS[variant],
        "h-11 min-w-0 overflow-hidden rounded-md border border-gray-300 bg-white",
      )}
      role="search"
    >
      <label htmlFor={inputId} className="sr-only">
        {submitLabel}
      </label>
      <input
        id={inputId}
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="min-w-0 flex-1 border-0 px-4 outline-none placeholder:text-gray-400"
      />
      <button
        type="submit"
        className="inline-flex w-12 items-center justify-center bg-blue-700 text-white"
        aria-label={submitLabel}
      >
        <Icon name="search" size={24} />
      </button>
    </form>
  );
}
