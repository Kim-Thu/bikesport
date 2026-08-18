import { MediaImage } from "@/components/media/MediaImage";
import type { PaymentProps } from "@/interfaces/payment.interface";
import { cn } from "@/lib/classname.utils";
import { getEnabledPaymentMethods } from "@/lib/payment.utils";

export async function Payment({ className = "", itemClassName = "", imageClassName = "" }: PaymentProps) {
  const methods = await getEnabledPaymentMethods();

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
          <MediaImage
            mediaId={method.mediaId}
            alt={method.label}
            width={64}
            height={40}
            className={cn("h-6 w-auto max-w-16 object-contain", imageClassName)}
          />
        </div>
      ))}
    </div>
  );
}
