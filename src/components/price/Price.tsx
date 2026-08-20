import { cn } from "@/lib/classname.utils";

interface PriceProps {
  price: number;
  salePrice?: number | null;
  className?: string;
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(value) + "đ";
}

export function Price({ price, salePrice, className }: PriceProps) {
  const hasSale = typeof salePrice === "number" && salePrice < price;

  return (
    <div className={cn("flex flex-col", className)}>
      <span className={cn("text-base font-bold sm:text-lg", hasSale ? "text-red-700" : "text-gray-950")}>
        {formatPrice(hasSale ? salePrice : price)}
      </span>
      {hasSale ? <span className="text-sm text-gray-600 line-through">{formatPrice(price)}</span> : null}
    </div>
  );
}
