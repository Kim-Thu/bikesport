import { Badge } from "@/components/badge/Badge";
import { Button } from "@/components/button/Button";
import { CLink } from "@/components/link/CLink";
import { MediaImage } from "@/components/media/MediaImage";
import { Price } from "@/components/price/Price";
import type { CardProps } from "@/interfaces/card.interface";
import { cn } from "@/lib/classname.utils";

export function MediaActionTemplate({
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
      <CLink href={href} className="relative block p-4">
        {discountPercentage ? (
          <Badge className="absolute left-4 top-4 z-10">-{discountPercentage}%</Badge>
        ) : null}
        <div className="aspect-product w-full overflow-hidden">
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
        <CLink href={href} className="line-clamp-2 text-xs font-semibold text-gray-900 sm:text-sm">
          {title}
        </CLink>
        <div className="mt-auto flex items-end justify-between gap-2">
          {typeof price === "number" ? <Price price={price} salePrice={salePrice} /> : null}
          <Button
            variant="icon"
            icon="cart"
            iconSize={18}
            aria-label={`Thêm ${title} vào giỏ hàng`}
            className="h-9 w-9 shrink-0 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          />
        </div>
      </div>
    </article>
  );
}
