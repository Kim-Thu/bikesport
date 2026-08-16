import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon/Icon";
import type { PromotionProps } from "@/interfaces/promotion.interface";

export function Promotion({ type = "text", content, src, alt = "Promotion", href, ctaLabel, icon }: PromotionProps) {
  if (type === "image") {
    if (!src) return null;

    const image = <Image src={src} alt={alt} width={1920} height={120} className="h-auto w-full" />;
    return href ? <Link href={href}>{image}</Link> : image;
  }

  if (!content) return null;

  return (
    <div className="flex min-h-9 items-center justify-center gap-3 text-center text-xs text-white max-sm:text-promotion-mobile">
      {icon ? <Icon src={icon} className="h-4 w-4 text-white max-sm:h-3.5 max-sm:w-3.5" /> : null}
      <strong>{content}</strong>
      {href && ctaLabel ? (
        <Link href={href} className="inline-flex items-center gap-1 border-l border-white/40 pl-4 max-sm:hidden">
          {ctaLabel}
          <Icon name="arrow-right" className="h-3.5 w-3.5" />
        </Link>
      ) : null}
    </div>
  );
}
