"use client";

import { useCallback, useEffect, useId, useRef, useState, useTransition } from "react";
import type { FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchFormView } from "@/components/search/SearchFormView";

interface LiveSearchFormProps {
  defaultValue?: string;
  placeholder?: string;
  submitLabel?: string;
  anchor?: string;
  debounceMs?: number;
  className?: string;
}

export function LiveSearchForm({
  defaultValue = "",
  placeholder = "Tìm kiếm...",
  submitLabel = "Tìm kiếm",
  anchor,
  debounceMs = 300,
  className,
}: LiveSearchFormProps) {
  const inputId = useId();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(defaultValue);
  const [isPending, startTransition] = useTransition();
  const didMount = useRef(false);
  const searchParamsValue = searchParams.toString();

  const navigate = useCallback((nextValue: string) => {
    const normalizedValue = nextValue.trim();
    const params = new URLSearchParams(searchParamsValue);
    const currentValue = params.get("q")?.trim() ?? "";

    if (normalizedValue === currentValue && !params.has("page")) return;

    if (normalizedValue) params.set("q", normalizedValue);
    else params.delete("q");
    params.delete("page");

    const search = params.toString();
    const hash = anchor ? `#${anchor}` : "";
    const href = `${pathname}${search ? `?${search}` : ""}${hash}`;

    startTransition(() => {
      router.replace(href, { scroll: false });
    });
  }, [anchor, pathname, router, searchParamsValue]);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    const timeoutId = window.setTimeout(() => navigate(value), debounceMs);
    return () => window.clearTimeout(timeoutId);
  }, [debounceMs, navigate, value]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(value);
  };

  return (
    <SearchFormView
      onSubmit={handleSubmit}
      inputId={inputId}
      submitLabel={submitLabel}
      className={className}
      aria-busy={isPending}
      inputProps={{
        value,
        onChange: (event) => setValue(event.target.value),
        placeholder,
        autoComplete: "off",
      }}
    />
  );
}
