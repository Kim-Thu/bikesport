import { BannerBackground } from "@/components/banner/BannerBackground";
import { InfoCard } from "@/components/card/InfoCard";
import { Countdown } from "@/components/countdown/Countdown";
import { FeatureItem } from "@/components/feature/FeatureItem";
import { Heading } from "@/components/heading/Heading";
import { CLink } from "@/components/link/CLink";
import type { BannerAction, BannerRecord } from "@/interfaces/banner.interface";
import type { PromotionBenefit } from "@/interfaces/promotion.interface";
import { cn } from "@/lib/classname.utils";
import { getActivePromotionById } from "@/lib/promotion.utils";

function formatMoney(value: number) {
  return new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(value) + "đ";
}

function getBenefitValue(benefit?: PromotionBenefit): string | undefined {
  if (!benefit) return undefined;

  switch (benefit.type) {
    case "percentage_discount":
      return `-${benefit.percentage}%`;
    case "fixed_discount":
      return `-${formatMoney(benefit.amount)}`;
    case "voucher":
      return benefit.valueType === "percentage" ? `-${benefit.value}%` : `-${formatMoney(benefit.value)}`;
    case "buy_x_get_y":
      return `Mua ${benefit.buyQuantity} tặng ${benefit.getQuantity}`;
    case "gift":
      return `Tặng ${benefit.quantity} sản phẩm`;
    case "free_shipping":
      return "Miễn phí giao hàng";
  }
}

const ACTION_CLASS: Record<NonNullable<BannerAction["variant"]>, string> = {
  primary: "border-blue-600 bg-blue-600 text-white hover:bg-blue-700",
  outline: "border-blue-600 bg-white text-blue-600 hover:bg-blue-50",
};

function PromotionInfoCard({ card }: { card: NonNullable<BannerRecord["promotionCards"]>[number] }) {
  const promotion = getActivePromotionById(card.promotionId);
  if (!promotion) return null;

  const value = getBenefitValue(promotion.benefits[0]);

  return (
    <InfoCard
      icon={card.icon}
      label={card.label}
      description={card.description}
      valueClassName={card.label === "VOUCHER" ? "text-lg sm:text-xl" : undefined}
      value={
        promotion.endAt && card.label === "FLASH SALE" ? (
          <Countdown endAt={promotion.endAt} variant="compact" />
        ) : (
          value
        )
      }
    />
  );
}

export function PromoLeftBanner({ banner }: { banner: BannerRecord }) {
  const features = banner.features ?? [];
  const actions = banner.actions ?? [];
  const promotionCards = banner.promotionCards ?? [];

  return (
    <div className="w-full min-w-0">
      <div className="relative flex w-full overflow-hidden rounded-xl border border-blue-100 bg-transparent sm:aspect-hero-tablet lg:aspect-8/3">
        <BannerBackground banner={banner} imageClassName="lg:object-right" />

        <div className="relative z-20 grid w-full flex-1 gap-6 p-5 sm:p-7 lg:grid-cols-12 lg:items-stretch lg:gap-6 lg:p-8">
          <div className="order-1 flex items-center lg:col-span-10">
            <div className="max-w-xl">
              {banner.eyebrow ? (
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-800 sm:text-sm">{banner.eyebrow}</p>
              ) : null}

              {banner.title ? (
                <Heading level={1} className="text-4xl font-black uppercase leading-none tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                  <span>{banner.title}</span>
                  {banner.titleHighlight ? <span className="ml-2 text-blue-600">{banner.titleHighlight}</span> : null}
                </Heading>
              ) : null}

              {banner.description ? (
                <p className="mt-2 text-base font-bold uppercase text-gray-800 sm:text-lg">{banner.description}</p>
              ) : null}

              {features.length ? (
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {features.map((feature, index) => <FeatureItem key={`${feature.title}-${index}`} {...feature} />)}
                </div>
              ) : null}

              {actions.length ? (
                <div className="mt-6 flex flex-wrap gap-3">
                  {actions.map((action) => (
                    <CLink
                      key={`${action.label}-${action.href}`}
                      href={action.href}
                      className={cn(
                        "inline-flex items-center justify-center rounded-md border px-5 py-2.5 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                        ACTION_CLASS[action.variant ?? "primary"],
                      )}
                    >
                      {action.label}
                    </CLink>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {promotionCards.length ? (
            <div className="order-2 hidden content-center gap-3 sm:grid sm:grid-cols-3 lg:col-span-2 lg:grid-cols-1">
              {promotionCards.map((card) => (
                <PromotionInfoCard key={card.promotionId} card={card} />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {promotionCards.length ? (
        <div className="scrollbar-none mt-3 flex w-full snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain sm:hidden">
          {promotionCards.map((card) => (
            <div key={card.promotionId} className="w-5/6 shrink-0 snap-start">
              <PromotionInfoCard card={card} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
