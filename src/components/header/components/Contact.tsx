import { Phone } from "lucide-react";

interface ContactProps {
  label?: string;
  value?: string;
  href?: string;
}

export function Contact({ label = "Hotline", value, href }: ContactProps) {
  if (!value) return null;

  return (
    <a href={href || `tel:${value.replace(/\s+/g, "")}`} className="flex items-center gap-2 whitespace-nowrap max-md:hidden">
      <Phone aria-hidden="true" size={27} strokeWidth={1.7} />
      <span className="flex flex-col leading-tight max-lg:hidden">
        <span className="text-xs text-blue-600">{label}</span>
        <strong className="text-sm">{value}</strong>
      </span>
    </a>
  );
}
