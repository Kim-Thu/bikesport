import { BenefitPanel } from "@/components/benefit/BenefitPanel";
import { Card } from "@/components/card/Card";
import { Container } from "@/components/layout/Container";
import { MembershipCard } from "@/components/membership/MembershipCard";
import { NewsletterBox } from "@/components/newsletter/NewsletterBox";
import { BestSellerProducts, type BestSellerGroup } from "@/components/product/BestSellerProducts";
import { Section } from "@/components/section/Section";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import type { PageSectionPayload } from "@/interfaces/page.interface";
import { getFeaturedEvents } from "@/lib/event.utils";
import { getBestSellerProducts, getProductPrimaryMediaId } from "@/lib/product.utils";
import { getActivePromotionsForSku, getPromotionProductPricing } from "@/lib/promotion.utils";

export function StorefrontShowcaseSection({ section }: { section: PageSectionPayload }) {
  if (section.component !== "storefront-showcase") return null;

  const groups: BestSellerGroup[] = section.props.bestSeller.tabs.map((tab) => ({
    label: tab.label,
    value: tab.categoryId,
    products: getBestSellerProducts(tab.categoryId, section.props.bestSeller.limit).map((product) => {
      const activePromotion = getActivePromotionsForSku(product.sku)[0] ?? null;
      const pricing = activePromotion
        ? getPromotionProductPricing(product, activePromotion)
        : { salePrice: null, discountPercentage: null };

      return {
        sku: product.sku,
        name: product.name,
        slug: product.slug,
        mediaId: getProductPrimaryMediaId(product),
        price: product.price,
        salePrice: pricing.salePrice,
        discountPercentage: pricing.discountPercentage,
      };
    }),
  }));

  const events = getFeaturedEvents(section.props.events.limit);

  return (
    <Section className={section.props.sectionClassName}>
      <Container>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(16rem,1fr)]">
          <div className="min-w-0 space-y-6">
            <BestSellerProducts
              title={section.props.bestSeller.title}
              href={section.props.bestSeller.href}
              actionLabel={section.props.bestSeller.actionLabel}
              groups={groups}
            />

            <div>
              <SectionHeader
                title={section.props.events.title}
                href={section.props.events.href}
                actionLabel={section.props.events.actionLabel}
                className="mb-3"
              />
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {events.map((event) => (
                  <Card
                    key={event._id}
                    template="event"
                    title={event.title}
                    href={`/su-kien/${event.slug}`}
                    mediaId={event.mediaId}
                    startAt={event.startAt}
                    location={event.location}
                    attendees={event.attendees}
                  />
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <BenefitPanel items={section.props.benefits} />
            <MembershipCard {...section.props.membership} />
            <NewsletterBox {...section.props.newsletter} />
          </aside>
        </div>
      </Container>
    </Section>
  );
}
