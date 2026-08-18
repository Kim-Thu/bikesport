import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { Heading } from "@/components/heading/Heading";
import { Container } from "@/components/layout/Container";
import { Panel } from "@/components/panel/Panel";
import { getLatestPosts, getPublishedPostBySlugAndType } from "@/lib/post.utils";
import { resolveSeoMetadata } from "@/lib/seo.utils";

export const revalidate = 300;
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getLatestPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlugAndType(slug, "article");
  if (!post) return {};

  return resolveSeoMetadata({
    path: `/blog/${post.slug}`,
    objectType: "custom",
    objectId: post._id,
    title: post.title,
    description: post.excerpt ?? post.title,
  });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlugAndType(slug, "article");
  if (!post) notFound();

  return (
    <main aria-label={post.title}>
      <Container className="space-y-8 py-8">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        <div className="space-y-4">
          <Heading level={1} className="text-2xl font-bold text-gray-950 sm:text-3xl">
            {post.title}
          </Heading>
          <p className="text-sm text-gray-600">
            {new Intl.DateTimeFormat("vi-VN", { dateStyle: "long", timeZone: "Asia/Ho_Chi_Minh" }).format(
              new Date(post.publishedAt),
            )}
          </p>
        </div>

        <Panel className="p-8">
          {post.excerpt ? <p className="text-base leading-7 text-gray-700">{post.excerpt}</p> : null}
        </Panel>
      </Container>
    </main>
  );
}
