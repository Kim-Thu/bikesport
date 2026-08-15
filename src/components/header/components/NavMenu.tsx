import { ChevronDown } from "lucide-react";

interface NavMenuItem {
  label?: string;
  href?: string;
  hasDropdown?: boolean;
  highlight?: boolean;
}

interface NavMenuProps {
  items?: NavMenuItem[];
}

export function NavMenu({ items = [] }: NavMenuProps) {
  if (!items.length) return null;

  return (
    <nav className="overflow-x-auto bg-white" aria-label="Điều hướng chính">
      <ul className="flex min-h-12 w-max list-none items-center gap-10 p-0">
        {items.map((item, index) => {
          if (!item.label) return null;

          return (
            <li key={`${item.label}-${index}`}>
              <a href={item.href || "#"} className={`inline-flex min-h-12 items-center gap-1 text-xs font-bold tracking-wide ${item.highlight ? "text-red-500" : "text-gray-900"}`}>
                <span>{item.label}</span>
                {item.hasDropdown ? <ChevronDown aria-hidden="true" size={13} strokeWidth={2} /> : null}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
