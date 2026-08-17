import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import type { ProductSliderLayoutTemplateProps } from "@/interfaces/product-slider-layout.interface";
import { cn } from "@/lib/classname.utils";

export function FeaturedShowcaseTemplate({
  header,
  slider,
  href,
  actionLabel = "Xem tất cả",
  tone = "primary",
}: ProductSliderLayoutTemplateProps) {
  return (
    <div>
      {header ? <div className="mb-5">{header}</div> : null}
      {slider}

      {href ? (
        <div className="mt-6 flex justify-center">
          <CLink
            href={href}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-white",
              tone === "danger"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-600 hover:bg-blue-700",
            )}
          >
            <span>{actionLabel}</span>
            <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
          </CLink>
        </div>
      ) : null}
    </div>
  );
}
