import type { ComponentType } from "react";
import { Carousel } from "@/components/carousel/Carousel";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/section/Section";
import { CenteredBanner } from "@/components/banner/variants/CenteredBanner";
import { ContentLeftBanner } from "@/components/banner/variants/ContentLeftBanner";
import { ImageOnlyBanner } from "@/components/banner/variants/ImageOnlyBanner";
import { PromoLeftBanner } from "@/components/banner/variants/PromoLeftBanner";
import type { BannerProps, BannerRecord } from "@/interfaces/banner.interface";
import { getActiveBannerById, getActiveBannersByGroup } from "@/lib/banner.utils";
import type { BannerVariant } from "@/variants/banner.variant";

const BANNER_VARIANT_COMPONENTS: Record<BannerVariant, ComponentType<{ banner: BannerRecord }>> = {
  "promo-left": PromoLeftBanner,
  "content-left": ContentLeftBanner,
  centered: CenteredBanner,
  "image-only": ImageOnlyBanner,
};

function BannerSlide({ banner }: { banner: BannerRecord }) {
  const VariantComponent = BANNER_VARIANT_COMPONENTS[banner.variant];
  return <VariantComponent banner={banner} />;
}

export async function Banner({ bannerId }: BannerProps) {
  const initialBanner = await getActiveBannerById(bannerId);
  if (!initialBanner) return null;

  const slides = initialBanner.groupId
    ? await getActiveBannersByGroup(initialBanner.groupId)
    : [initialBanner];

  return (
    <Section className="py-4 sm:py-8">
      <Container>
        <Carousel ariaLabel="Banner nổi bật">
          {slides.map((banner) => <BannerSlide key={banner._id} banner={banner} />)}
        </Carousel>
      </Container>
    </Section>
  );
}
