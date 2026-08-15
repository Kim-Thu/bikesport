import { ChevronDown } from "lucide-react";
import { HEADER_NAV_ITEMS } from "@/config/header";

export function HeaderNavigation() {
  return (
    <nav className="overflow-x-auto bg-white" aria-label="Điều hướng chính">
      <div className="mx-auto max-w-screen-2xl px-6">
        <ul className="flex min-h-12 w-max list-none items-center gap-10 p-0">
          {HEADER_NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`inline-flex min-h-12 items-center gap-1 text-xs font-bold tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  item.highlight ? "text-red-500" : "text-gray-900"
                }`}
              >
                <span>{item.label}</span>
                {item.hasDropdown ? <ChevronDown aria-hidden="true" size={13} strokeWidth={2} /> : null}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
