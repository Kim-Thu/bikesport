"use client";

import { FormEvent, useState } from "react";
import { Search } from "lucide-react";

interface SearchFormProps {
  placeholder?: string;
}

export function SearchForm({ placeholder = "Tìm kiếm..." }: SearchFormProps) {
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form className="flex h-11 min-w-0 flex-1 overflow-hidden rounded-md border border-gray-300 bg-white" role="search" onSubmit={handleSubmit}>
      <label htmlFor="header-search" className="sr-only">Tìm kiếm</label>
      <input id="header-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={placeholder} className="min-w-0 flex-1 border-0 px-4 outline-none placeholder:text-gray-400" />
      <button type="submit" className="inline-flex w-12 items-center justify-center bg-blue-600 text-white" aria-label="Tìm kiếm">
        <Search aria-hidden="true" size={24} />
      </button>
    </form>
  );
}
