import { ArrowRight } from "lucide-react";
import { HEADER_PROMOTION } from "@/config/header";

export function PromotionBar() {
  return (
    <div className="flex min-h-9 items-center bg-blue-600 text-xs text-white">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-center gap-4 px-6 text-center">
        <strong>{HEADER_PROMOTION.message}</strong>
        <a
          href={HEADER_PROMOTION.href}
          className="inline-flex items-center gap-1 whitespace-nowrap border-l border-white/40 pl-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white max-md:hidden"
        >
          {HEADER_PROMOTION.ctaLabel}
          <ArrowRight aria-hidden="true" size={14} strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}
