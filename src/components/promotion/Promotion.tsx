import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { PromotionProps } from "@/interfaces/promotion.interface";

export function Promotion({ type = "text", content, src, alt = "Promotion", href, ctaLabel }: PromotionProps) {
  if (type === "image") {
    if (!src) return null;

    const image = <Image src={src} alt={alt} width={1920} height={120} className="h-auto w-full" />;
    return href ? <a href={href}>{image}</a> : image;
  }

  if (!content) return null;

  return (
    <div className="flex min-h-9 items-center justify-center gap-4 text-center text-xs text-white">
      <strong>{content}</strong>
      {href && ctaLabel ? (
        <a href={href} className="inline-flex items-center gap-1 border-l border-white/40 pl-4 max-sm:hidden">
          {ctaLabel}
          <ArrowRight aria-hidden="true" size={14} />
        </a>
      ) : null}
    </div>
  );
}
