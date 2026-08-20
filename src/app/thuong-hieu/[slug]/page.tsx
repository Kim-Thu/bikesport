import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { Heading } from "@/components/heading/Heading";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getActiveBrandBySlug, getActiveBrands } from "@/lib/brand.utils";
import { mapProductsToCollectionItems } from "@/lib/product-collection.utils";
import { getPublishedProductsByBrandId } from "@/lib/product.utils";
import { resolveSeoMetadata } from "@/lib/seo.utils";

export const revalidate = 300;
export const dynamicParams = false;

export async function generateStaticParams() {
  const brands = await getActiveBrands();
  return brands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getActiveBrandBySlug(slug);
  if (!brand) return {};

  return resolveSeoMetadata({
    path: `/thuong-hieu/${brand.slug}`,
    objectType: "custom",
    objectId: brand._id,
    title: brand.name,
    description: brand.description ?? `Khám phá sản phẩm ${brand.name} tại BikeSport.`,
  });
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = await getActiveBrandBySlug(slug);
  if (!brand) notFound();

  const products = await getPublishedProductsByBrandId(brand._id);
  const items = await mapProductsToCollectionItems(products);

  return (
    <main aria-label={`Thương hiệu ${brand.name}`}>
      <Container className="space-y-8 py-8">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Thương hiệu", href: "/san-pham" },
            { label: brand.name },
          ]}
        />

        <header className="space-y-4">
          <Heading level={1} className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {brand.name}
          </Heading>
          {brand.description ? <p className="max-w-3xl text-gray-600">{brand.description}</p> : null}
        </header>

        <ProductGrid items={items} template="media-action" />
      </Container>
    </main>
  );
}
