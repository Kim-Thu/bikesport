import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PromotionProps } from "@/interfaces/promotion.interface";

export function Promotion({ type = "text", content, src, alt = "Promotion", href, ctaLabel }: PromotionProps) {
  if (type === "image") {
    if (!src) return null;

    const image = <Image src={src} alt={alt} width={1920} height={120} className="h-auto w-full" />;
    return href ? <Link href={href}>{image}</Link> : image;
  }

  if (!content) return null;

  return (
    <div className="flex min-h-9 items-center justify-center gap-4 text-center text-xs text-white">
      <strong>{content}</strong>
      {href && ctaLabel ? (
        <Link href={href} className="inline-flex items-center gap-1 border-l border-white/40 pl-4 max-sm:hidden">
          {ctaLabel}
          <ArrowRight aria-hidden="true" size={14} />
        </Link>
      ) : null}
    </div>
  );
}
