import { Badge } from "@/components/badge/Badge";
import { Button } from "@/components/button/Button";
import { CLink } from "@/components/link/CLink";
import { MediaImageView } from "@/components/media/MediaImageView";
import { Price } from "@/components/price/Price";
import type { CardProps } from "@/interfaces/card.interface";
import { cn } from "@/lib/classname.utils";

export function FlashSaleTemplate({
  title,
  href,
  media,
  price,
  salePrice,
  discountPercentage,
  stockRemaining,
  stockTotal,
  promotionBadgeMedia,
  promotionBadgeAlt,
  className,
}: CardProps) {
  const hasStockProgress =
    typeof stockRemaining === "number" && typeof stockTotal === "number" && stockTotal > 0;
  const stockPercentage = hasStockProgress
    ? Math.max(0, Math.min(100, Math.round((stockRemaining / stockTotal) * 100)))
    : 0;

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg border border-red-200 bg-white transition-colors hover:border-red-400",
        className,
      )}
    >
      <CLink href={href} className="relative block p-4">
        <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
          <Badge className="bg-red-700 text-white">HOT</Badge>
          {discountPercentage ? (
            <Badge className="bg-red-700 text-white">-{discountPercentage}%</Badge>
          ) : null}
        </div>

        {promotionBadgeMedia ? (
          <div className="absolute bottom-4 left-4 z-10 h-10 w-24 overflow-hidden rounded-md bg-white/90 p-1">
            <MediaImageView
              media={promotionBadgeMedia}
              alt={promotionBadgeAlt ?? "Nhãn khuyến mãi"}
              width={96}
              height={40}
              className="h-full w-full object-contain"
            />
          </div>
        ) : null}

        <div className="aspect-product w-full overflow-hidden rounded-md bg-red-50">
          <MediaImageView
            media={media ?? null}
            alt={title}
            width={320}
            height={240}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </CLink>

      <div className="flex flex-1 flex-col gap-2 px-4 pb-4">
        <h3 className="line-clamp-2 text-xs font-semibold text-gray-900 sm:text-sm">
          <CLink href={href}>{title}</CLink>
        </h3>

        {hasStockProgress ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-medium text-red-700">Còn {stockRemaining} sản phẩm</span>
              <span className="text-gray-600">{stockRemaining}/{stockTotal}</span>
            </div>
            <div
              className="h-2 overflow-hidden rounded-full bg-red-100"
              role="progressbar"
              aria-label={`Còn ${stockRemaining} trên ${stockTotal} sản phẩm Flash Sale`}
              aria-valuemin={0}
              aria-valuemax={stockTotal}
              aria-valuenow={stockRemaining}
            >
              <div
                className={cn(
                  "h-full rounded-full bg-red-700",
                  stockPercentage >= 75
                    ? "w-full"
                    : stockPercentage >= 50
                      ? "w-3/4"
                      : stockPercentage >= 25
                        ? "w-1/2"
                        : stockPercentage > 0
                          ? "w-1/4"
                          : "w-0",
                )}
              />
            </div>
          </div>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-2">
          {typeof price === "number" ? <Price price={price} salePrice={salePrice} /> : null}
          <Button
            variant="icon"
            icon="cart"
            iconSize={18}
            aria-label={`Thêm ${title} vào giỏ hàng`}
            className="h-8 w-8 shrink-0 rounded-md bg-red-700 text-white hover:bg-red-800"
          />
        </div>
      </div>
    </article>
  );
}
