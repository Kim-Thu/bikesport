import { Card } from "@/components/card/Card";
import { Carousel } from "@/components/carousel/Carousel";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/section/Section";
import type { PageSectionPayload } from "@/interfaces/page.interface";
import { getProductPrimaryMediaId } from "@/lib/product.utils";
import {
  getActivePromotionById,
  getPromotionDescription,
  getPromotionProductPricing,
  getPromotionProducts,
  getPromotionTitle,
} from "@/lib/promotion.utils";

export function ProductSaleSection({ section }: { section: PageSectionPayload }) {
  if (section.component !== "product-sale") return null;

  const promotion = getActivePromotionById(section.props.promotionId);
  if (!promotion) return null;

  const products = getPromotionProducts(promotion, section.props.limit);
  if (!products.length) return null;

  return (
    <Section className={section.props.sectionClassName}>
      <Container>
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,5fr)]">
          <Card
            template="promotion"
            title={getPromotionTitle(promotion)}
            description={getPromotionDescription(promotion)}
            href={promotion.display?.href ?? `/khuyen-mai/${promotion.slug}`}
            actionLabel={promotion.display?.actionLabel ?? "Xem tất cả"}
          />

          <Carousel
            loop
            dragFree
            ariaLabel={`Sản phẩm ${promotion.name}`}
            slideClassName="basis-48 pr-3 sm:basis-52 lg:basis-1/4"
            dotsClassName="hidden"
          >
            {products.map((product) => {
              const pricing = getPromotionProductPricing(product, promotion);

              return (
                <Card
                  key={product.sku}
                  template="product"
                  title={product.name}
                  href={`/san-pham/${product.slug}`}
                  mediaId={getProductPrimaryMediaId(product)}
                  price={product.price}
                  salePrice={pricing.salePrice}
                  discountPercentage={pricing.discountPercentage}
                />
              );
            })}
          </Carousel>
        </div>
      </Container>
    </Section>
  );
}
