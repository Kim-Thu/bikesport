import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { Heading } from "@/components/heading/Heading";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getCategoriesByType, getCategoryTreeIds } from "@/lib/category.utils";
import { mapProductsToCollectionItems } from "@/lib/product-collection.utils";
import { getPublishedProductsByCategoryIds } from "@/lib/product.utils";
import { resolveSeoMetadata } from "@/lib/seo.utils";

export const revalidate = 300;
export const dynamicParams = false;

async function getProductCategoryBySlug(slug: string) {
  const categories = await getCategoriesByType("product");
  return categories.find((category) => category.slug === slug) ?? null;
}

export async function generateStaticParams() {
  const categories = await getCategoriesByType("product");
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = await getProductCategoryBySlug(slug);
  if (!category) return {};

  return resolveSeoMetadata({
    path: `/danh-muc/${category.slug}`,
    objectType: "category",
    objectId: category._id,
    title: category.name,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getProductCategoryBySlug(slug);
  if (!category) notFound();

  const categoryIds = await getCategoryTreeIds(category._id);
  const products = await getPublishedProductsByCategoryIds(categoryIds);
  const items = await mapProductsToCollectionItems(products);

  return (
    <main aria-label={`Danh mục ${category.name}`}>
      <Container className="space-y-8 py-8">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Danh mục", href: "/" },
            { label: category.name },
          ]}
        />

        <Heading level={1} className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {category.name}
        </Heading>

        <ProductGrid items={items} template="media-action" />
      </Container>
    </main>
  );
}
