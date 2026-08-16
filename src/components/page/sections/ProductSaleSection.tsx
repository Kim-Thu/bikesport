import { Card } from "@/components/card/Card";
import { Carousel } from "@/components/carousel/Carousel";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/section/Section";
import type { PageSectionPayload } from "@/interfaces/page.interface";
import { getFeaturedProducts, getProductDiscountPercentage, getProductPrimaryMediaId } from "@/lib/product.utils";

export function ProductSaleSection({ section }: { section: PageSectionPayload }) {
  if (section.component !== "product-sale") return null;

  const products = getFeaturedProducts(section.props.limit);

  return (
    <Section className={section.props.sectionClassName}>
      <Container>
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,5fr)]">
          <Card
            template="promotion"
            title={section.props.title}
            description={section.props.description}
            href={section.props.href}
            actionLabel={section.props.actionLabel}
          />

          <Carousel
            loop
            dragFree
            ariaLabel="Sản phẩm ưu đãi"
            slideClassName="basis-48 pr-3 sm:basis-52 lg:basis-1/5"
            dotsClassName="hidden"
          >
            {products.map((product) => (
              <Card
                key={product._id}
                template="product"
                title={product.name}
                href={`/san-pham/${product.slug}`}
                mediaId={getProductPrimaryMediaId(product)}
                price={product.price}
                salePrice={product.salePrice}
                discountPercentage={getProductDiscountPercentage(product)}
              />
            ))}
          </Carousel>
        </div>
      </Container>
    </Section>
  );
}
