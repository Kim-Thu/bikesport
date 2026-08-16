import { Card } from "@/components/card/Card";
import { Container } from "@/components/layout/Container";
import { ProductSlider } from "@/components/product/ProductSlider";
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

  const sliderItems = products.map((product) => {
    const pricing = getPromotionProductPricing(product, promotion);

    return {
      sku: product.sku,
      name: product.name,
      slug: product.slug,
      mediaId: getProductPrimaryMediaId(product),
      price: product.price,
      salePrice: pricing.salePrice,
      discountPercentage: pricing.discountPercentage,
    };
  });

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

          <ProductSlider items={sliderItems} ariaLabel={`Sản phẩm ${promotion.name}`} />
        </div>
      </Container>
    </Section>
  );
}
