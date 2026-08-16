import { Badge } from "@/components/badge/Badge";
import { Button } from "@/components/button/Button";
import { CLink } from "@/components/link/CLink";
import { MediaImage } from "@/components/media/MediaImage";
import { Price } from "@/components/price/Price";
import type { CardProps } from "@/interfaces/card.interface";
import { cn } from "@/lib/classname.utils";

export function FlashSaleTemplate({
  title,
  href,
  mediaId,
  price,
  salePrice,
  discountPercentage,
  className,
}: CardProps) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg border border-red-200 bg-white transition-colors hover:border-red-400",
        className,
      )}
    >
      <CLink href={href} className="relative block p-4">
        {discountPercentage ? (
          <Badge className="absolute left-4 top-4 z-10 bg-red-500 text-white">-{discountPercentage}%</Badge>
        ) : null}
        <div className="aspect-product w-full overflow-hidden rounded-md bg-red-50">
          <MediaImage
            mediaId={mediaId}
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

        <div className="mt-auto flex items-end justify-between gap-2">
          {typeof price === "number" ? <Price price={price} salePrice={salePrice} /> : null}
          <Button
            variant="icon"
            icon="cart"
            iconSize={18}
            aria-label={`Thêm ${title} vào giỏ hàng`}
            className="h-9 w-9 shrink-0 rounded-md bg-red-500 text-white hover:bg-red-600"
          />
        </div>
      </div>
    </article>
  );
}
