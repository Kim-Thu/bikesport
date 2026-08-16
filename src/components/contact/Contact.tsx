import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import wpOption from "@/data/wp-option.json";

type ContactProps = {
  variant?: "desktop" | "mobile";
};

export function Contact({ variant = "desktop" }: ContactProps) {
  const { label, value, href } = wpOption.contact.hotline;

  if (!value) return null;

  const hotlineHref = href || `tel:${value.replace(/\s+/g, "")}`;

  if (variant === "mobile") {
    return (
      <CLink
        href={hotlineHref}
        className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3 text-gray-900"
      >
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
          <Icon name="phone" className="h-4 w-4" strokeWidth={1.8} />
        </span>
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="text-xs text-gray-500">{label}</span>
          <strong className="text-sm">{value}</strong>
        </span>
      </CLink>
    );
  }

  return (
    <CLink href={hotlineHref} className="hidden items-center gap-2 whitespace-nowrap md:flex">
      <Icon name="phone" size={27} strokeWidth={1.7} />
      <span className="hidden flex-col leading-tight lg:flex">
        <span className="text-xs text-blue-600">{label}</span>
        <strong className="text-sm">{value}</strong>
      </span>
    </CLink>
  );
}
