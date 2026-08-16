import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import wpOption from "@/data/wp-option.json";

export function Social() {
  const items = wpOption.contact.social ?? [];

  if (!items.length) return null;

  return (
    <div className="flex items-center gap-3" aria-label="Mạng xã hội">
      {items.map((item) => (
        <CLink
          key={item.name}
          href={item.href}
          aria-label={item.label}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
        >
          <Icon src={item.icon} className="h-4 w-4" />
        </CLink>
      ))}
    </div>
  );
}
