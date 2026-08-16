import Image from "next/image";
import paymentData from "@/data/wp-payment.json";
import type { PaymentMethod, PaymentProps } from "@/interfaces/payment.interface";
import { cn } from "@/lib/classname.utils";

export function Payment({ className = "", itemClassName = "", imageClassName = "" }: PaymentProps) {
  const methods = (paymentData.paymentMethods as PaymentMethod[])
    .filter((method) => method.enabled !== false)
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  if (!methods.length) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)} aria-label="Phương thức thanh toán">
      {methods.map((method) => (
        <div
          key={method._id}
          className={cn(
            "flex h-10 min-w-14 items-center justify-center rounded border border-gray-200 bg-white px-2",
            itemClassName,
          )}
          title={method.label}
        >
          <Image
            src={method.logo}
            alt={method.alt}
            width={method.width}
            height={method.height}
            className={cn("h-6 w-auto max-w-16 object-contain", imageClassName)}
          />
        </div>
      ))}
    </div>
  );
}
