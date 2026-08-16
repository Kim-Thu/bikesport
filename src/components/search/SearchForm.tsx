"use client";

import { FormEvent, useState } from "react";
import { Search } from "lucide-react";
import type { SearchFormProps } from "@/interfaces/search.interface";

const VARIANT_CLASS = {
  default: "flex w-full",
  desktop: "hidden w-full max-w-xl lg:flex",
  mobile: "flex w-full lg:hidden",
} as const;

export function SearchForm({ placeholder = "Tìm kiếm...", variant = "default" }: SearchFormProps) {
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form
      className={`${VARIANT_CLASS[variant]} h-11 min-w-0 overflow-hidden rounded-md border border-gray-300 bg-white`}
      role="search"
      onSubmit={handleSubmit}
    >
      <label htmlFor={`site-search-${variant}`} className="sr-only">Tìm kiếm</label>
      <input
        id={`site-search-${variant}`}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 border-0 px-4 outline-none placeholder:text-gray-400"
      />
      <button type="submit" className="inline-flex w-12 items-center justify-center bg-blue-600 text-white" aria-label="Tìm kiếm">
        <Search aria-hidden="true" size={24} />
      </button>
    </form>
  );
}
