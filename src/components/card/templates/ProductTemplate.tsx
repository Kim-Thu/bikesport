import { Badge } from "@/components/badge/Badge";
import { Button } from "@/components/button/Button";
import { CLink } from "@/components/link/CLink";
import { MediaImage } from "@/components/media/MediaImage";
import { Price } from "@/components/price/Price";
import type { CardProps } from "@/interfaces/card.interface";
import { cn } from "@/lib/classname.utils";

export function ProductTemplate({
  title,
  href,
  mediaId,
  price,
  salePrice,
  discountPercentage,
  className,
}: CardProps) {
  return (
    <article className={cn("group flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white", className)}>
      <CLink href={href} className="relative block p-3">
        {discountPercentage ? (
          <Badge className="absolute left-3 top-3 z-10">-{discountPercentage}%</Badge>
        ) : null}
        <MediaImage
          mediaId={mediaId}
          alt={title}
          width={320}
          height={220}
          className="h-32 w-full object-contain transition-transform duration-300 group-hover:scale-105 sm:h-36"
        />
      </CLink>

      <div className="flex flex-1 flex-col gap-2 px-3 pb-3">
        <CLink href={href} className="line-clamp-2 text-xs font-semibold text-gray-900 sm:text-sm">
          {title}
        </CLink>
        <div className="mt-auto flex items-end justify-between gap-2">
          {typeof price === "number" ? <Price price={price} salePrice={salePrice} /> : null}
          <Button
            variant="icon"
            icon="cart"
            aria-label={`Thêm ${title} vào giỏ hàng`}
            className="shrink-0 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          />
        </div>
      </div>
    </article>
  );
}
