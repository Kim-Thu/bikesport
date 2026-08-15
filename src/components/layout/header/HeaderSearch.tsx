"use client";

import { FormEvent, useState } from "react";
import { Search } from "lucide-react";

export function HeaderSearch() {
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form
      className="flex h-11 min-w-0 flex-1 overflow-hidden rounded-md border border-gray-300 bg-white max-md:order-3 max-md:w-full max-md:basis-full"
      role="search"
      onSubmit={handleSubmit}
    >
      <label htmlFor="header-search" className="sr-only">
        Tìm kiếm sản phẩm
      </label>
      <input
        id="header-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Tìm kiếm xe đạp, phụ kiện..."
        className="min-w-0 flex-1 border-0 px-4 text-gray-900 outline-none placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600"
      />
      <button
        type="submit"
        className="inline-flex w-12 cursor-pointer items-center justify-center bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        aria-label="Tìm kiếm"
      >
        <Search aria-hidden="true" size={24} strokeWidth={2} />
      </button>
    </form>
  );
}
