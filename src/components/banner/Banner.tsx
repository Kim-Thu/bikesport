import { InfoCard } from "@/components/card/InfoCard";
import { Carousel } from "@/components/carousel/Carousel";
import { Countdown } from "@/components/countdown/Countdown";
import { FeatureItem } from "@/components/feature/FeatureItem";
import { Heading } from "@/components/heading/Heading";
import { Container } from "@/components/layout/Container";
import { CLink } from "@/components/link/CLink";
import { MediaImage } from "@/components/media/MediaImage";
import { Section } from "@/components/section/Section";
import type { BannerAction, BannerProps, BannerRecord } from "@/interfaces/banner.interface";
import type { PromotionBenefit } from "@/interfaces/promotion.interface";
import { getActiveBannerById, getActiveBannersByGroup } from "@/lib/banner.utils";
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

function BannerSlide({ banner }: { banner: BannerRecord }) {
  const features = banner.features ?? [];
  const actions = banner.actions ?? [];
  const promotionCards = banner.promotionCards ?? [];

  return (
    <div className="relative flex min-h-88 w-full overflow-hidden rounded-xl border border-blue-100 bg-blue-200">
      <MediaImage
        mediaId={banner.backgroundMediaId}
        alt=""
        width={1920}
        height={820}
        priority={banner.order === 1}
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover object-center lg:object-contain lg:object-right"
      />

      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 bg-gradient-to-r from-blue-200 via-blue-200/80 via-55% to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-20 grid min-h-88 w-full flex-1 gap-6 p-5 sm:p-7 lg:grid-cols-12 lg:items-stretch lg:gap-6 lg:p-8">
        <div className="order-1 flex items-center lg:col-span-10">
          <div className="max-w-xl">
            {banner.eyebrow ? (
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-800 sm:text-sm">{banner.eyebrow}</p>
            ) : null}

            <Heading level={1} className="text-4xl font-black uppercase leading-none tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              <span>{banner.title}</span>
              {banner.titleHighlight ? <span className="ml-2 text-blue-600">{banner.titleHighlight}</span> : null}
            </Heading>

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
                      "inline-flex min-h-10 items-center justify-center rounded-md border px-5 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
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
          <div className="order-2 grid content-center gap-3 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-1">
            {promotionCards.map((card) => {
              const promotion = getActivePromotionById(card.promotionId);
              if (!promotion) return null;
              const value = getBenefitValue(promotion.benefits[0]);

              return (
                <InfoCard
                  key={card.promotionId}
                  icon={card.icon}
                  label={card.label}
                  description={card.description}
                  value={promotion.endAt && card.label === "FLASH SALE" ? <Countdown endAt={promotion.endAt} /> : value}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function Banner({ bannerId }: BannerProps) {
  const initialBanner = getActiveBannerById(bannerId);
  if (!initialBanner) return null;

  const slides = initialBanner.groupId ? getActiveBannersByGroup(initialBanner.groupId) : [initialBanner];

  return (
    <Section className="py-4 sm:py-6">
      <Container>
        <Carousel ariaLabel="Banner nổi bật">
          {slides.map((banner) => <BannerSlide key={banner._id} banner={banner} />)}
        </Carousel>
      </Container>
    </Section>
  );
}
