import { BannerActions } from "@/components/banner/BannerActions";
import { BannerBackground } from "@/components/banner/BannerBackground";
import { InfoCard } from "@/components/card/InfoCard";
import { Countdown } from "@/components/countdown/Countdown";
import { FeatureItem } from "@/components/feature/FeatureItem";
import { Heading } from "@/components/heading/Heading";
import type { BannerRecord } from "@/interfaces/banner.interface";
import { cn } from "@/lib/classname.utils";
import { getMediaWithFallbackByIds } from "@/lib/media.utils";
import { getPromotionBenefitLabel } from "@/lib/promotion-presentation.utils";
import { getActivePromotionById } from "@/lib/promotion.utils";
import { resolveBannerSizeClass } from "@/variants/banner.variant";

async function PromotionInfoCard({ card }: { card: NonNullable<BannerRecord["promotionCards"]>[number] }) {
  const promotion = await getActivePromotionById(card.promotionId);
  if (!promotion) return null;

  const value = getPromotionBenefitLabel(promotion.benefits[0]);

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

export async function PromoLeftBanner({ banner }: { banner: BannerRecord }) {
  const features = banner.features ?? [];
  const actions = banner.actions ?? [];
  const promotionCards = banner.promotionCards ?? [];
  const featureMediaIds = features.flatMap((feature) => (feature.iconMediaId ? [feature.iconMediaId] : []));
  const featureMediaById = await getMediaWithFallbackByIds(featureMediaIds);

  return (
    <div className="w-full min-w-0">
      <div
        className={cn(
          "relative flex w-full overflow-hidden rounded-xl border border-blue-100 bg-transparent",
          resolveBannerSizeClass(banner.size),
        )}
      >
        <BannerBackground banner={banner} imageClassName="lg:object-right" />

        <div className="relative z-20 grid w-full flex-1 gap-8 p-4 sm:p-8 lg:grid-cols-12 lg:items-stretch lg:p-8">
          <div className="order-1 flex items-center lg:col-span-10">
            <div className="max-w-xl">
              {banner.eyebrow ? (
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-800 sm:text-sm">{banner.eyebrow}</p>
              ) : null}

              {banner.title ? (
                <Heading level={1} className="text-4xl font-black uppercase leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                  <span>{banner.title}</span>
                  {banner.titleHighlight ? <span className="ml-2 text-blue-700">{banner.titleHighlight}</span> : null}
                </Heading>
              ) : null}

              {banner.description ? (
                <p className="mt-4 max-w-lg text-base leading-7 text-gray-700">{banner.description}</p>
              ) : null}

              {features.length ? (
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {features.map((feature, index) => (
                    <FeatureItem
                      key={`${feature.title}-${index}`}
                      title={feature.title}
                      description={feature.description}
                      iconMediaUrl={feature.iconMediaId ? featureMediaById[feature.iconMediaId]?.src : undefined}
                    />
                  ))}
                </div>
              ) : null}

              <BannerActions actions={actions} />
            </div>
          </div>

          {promotionCards.length ? (
            <div className="order-2 hidden content-center gap-4 sm:grid sm:grid-cols-3 lg:col-span-2 lg:grid-cols-1">
              {promotionCards.map((card) => (
                <PromotionInfoCard key={card.promotionId} card={card} />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {promotionCards.length ? (
        <div className="mt-4 grid gap-2 sm:hidden">
          {promotionCards.map((card) => (
            <PromotionInfoCard key={card.promotionId} card={card} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
