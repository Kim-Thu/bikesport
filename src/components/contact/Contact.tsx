import { Icon } from "@/components/icon/Icon";
import wpOption from "@/data/wp-option.json";

export function Contact() {
  const { label, value, href } = wpOption.contact.hotline;

  if (!value) return null;

  return (
    <a href={href || `tel:${value.replace(/\s+/g, "")}`} className="flex items-center gap-2 whitespace-nowrap max-md:hidden">
      <Icon name="phone" size={27} strokeWidth={1.7} />
      <span className="flex flex-col leading-tight max-lg:hidden">
        <span className="text-xs text-blue-600">{label}</span>
        <strong className="text-sm">{value}</strong>
      </span>
    </a>
  );
}
