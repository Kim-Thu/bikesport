"use client";

import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/components/icon/Icon";
import { cn } from "@/lib/classname.utils";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(defaultValue);
  const [isPending, startTransition] = useTransition();
  const didMount = useRef(false);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const navigate = (nextValue: string) => {
    const normalizedValue = nextValue.trim();
    const currentValue = searchParams.get("q")?.trim() ?? "";

    if (normalizedValue === currentValue && !searchParams.has("page")) return;

    const params = new URLSearchParams(searchParams.toString());
    if (normalizedValue) params.set("q", normalizedValue);
    else params.delete("q");
    params.delete("page");

    const search = params.toString();
    const hash = anchor ? `#${anchor}` : "";
    const href = `${pathname}${search ? `?${search}` : ""}${hash}`;

    startTransition(() => {
      router.replace(href, { scroll: false });
    });
  };

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    const timeoutId = window.setTimeout(() => navigate(value), debounceMs);
    return () => window.clearTimeout(timeoutId);
    // searchParams is intentionally read inside navigate so each navigation preserves current URL state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, debounceMs]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex h-11 w-full min-w-0 overflow-hidden rounded-md border border-gray-300 bg-white",
        className,
      )}
      role="search"
      aria-busy={isPending}
    >
      <label htmlFor="live-site-search" className="sr-only">
        {submitLabel}
      </label>
      <input
        id="live-site-search"
        name="q"
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 border-0 px-4 outline-none placeholder:text-gray-400"
        autoComplete="off"
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
