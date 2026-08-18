import { SearchFormView } from "@/components/search/SearchFormView";
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
    <SearchFormView
      action={action}
      method="get"
      inputId={inputId}
      submitLabel={submitLabel}
      className={cn(VARIANT_CLASS[variant])}
      inputProps={{
        defaultValue,
        placeholder,
      }}
    />
  );
}
