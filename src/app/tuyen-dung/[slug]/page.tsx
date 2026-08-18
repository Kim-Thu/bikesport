import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { CardGrid } from "@/components/grid/CardGrid";
import { Heading } from "@/components/heading/Heading";
import { Icon } from "@/components/icon/Icon";
import { ActionLink } from "@/components/link/ActionLink";
import { CLink } from "@/components/link/CLink";
import { Container } from "@/components/layout/Container";
import { PageSections } from "@/components/page/PageSections";
import { Panel } from "@/components/panel/Panel";
import { Section } from "@/components/section/Section";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import { ShareActions } from "@/components/share/ShareActions";
import { getSiteOptions } from "@/lib/options.utils";
import { getPublishedPageBySlug } from "@/lib/page.utils";
import {
  formatRecruitmentDeadline,
  getRecruitmentBySlug,
  getRelatedRecruitments,
  mapRecruitmentPostToCard,
} from "@/lib/recruitment.utils";
import { getUserById } from "@/lib/user.utils";

export const revalidate = 300;

interface RecruitmentDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: RecruitmentDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getRecruitmentBySlug(slug);

  if (!post) return {};

  return {
    title: `${post.title} | Tuyển dụng BikeSport`,
    description: post.excerpt,
  };
}

function formatPublishedDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function DetailList({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;

  return (
    <section className="flex flex-col gap-4">
      <Heading level={2} className="text-xl font-bold uppercase text-gray-950">
        {title}
      </Heading>
      <ul className="flex flex-col gap-1 text-sm leading-7 text-gray-600 sm:text-base">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-4">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-700" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function RecruitmentDetailPage({ params }: RecruitmentDetailPageProps) {
  const { slug } = await params;
  const post = await getRecruitmentBySlug(slug);

  if (!post?.recruitment) notFound();

  const [options, relatedPosts, author, recruitmentPage] = await Promise.all([
    getSiteOptions(),
    getRelatedRecruitments(post),
    getUserById(post.authorId),
    getPublishedPageBySlug("tuyen-dung"),
  ]);
  const recruitment = post.recruitment;
  const deadline = formatRecruitmentDeadline(recruitment.deadline);
  const publishedDate = formatPublishedDate(post.publishedAt);
  const relatedCards = relatedPosts.map(mapRecruitmentPostToCard);
  const recruitmentCtaSection = recruitmentPage?.payload.sections.find(
    (section) => section.name === "Recruitment CTA",
  );

  return (
    <main aria-label={post.title}>
      <Section>
        <Container>
          <div className="flex flex-col gap-8">
            <Breadcrumb
              items={[
                { label: "Trang chủ", href: "/" },
                { label: "Tuyển dụng", href: "/tuyen-dung" },
                { label: post.title },
              ]}
            />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
              <article className="flex min-w-0 flex-col gap-8 lg:col-span-3">
                <header className="flex flex-col gap-4 border-b border-gray-200 pb-4">
                  <p className="text-sm font-semibold uppercase text-blue-700">{recruitment.department}</p>
                  <Heading level={1} className="text-3xl font-bold text-gray-950 sm:text-4xl">
                    {post.title}
                  </Heading>
                  {post.excerpt ? (
                    <p className="max-w-3xl text-base leading-7 text-gray-600">{post.excerpt}</p>
                  ) : null}

                  <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:text-sm">
                      <span>
                        Người đăng: <strong className="font-semibold text-gray-700">{author?.displayName ?? options.site.siteTitle}</strong>
                      </span>
                      {publishedDate ? <span aria-hidden="true">•</span> : null}
                      {publishedDate ? <time dateTime={post.publishedAt}>{publishedDate}</time> : null}
                    </div>
                    <ShareActions title={post.title} />
                  </div>
                </header>

                <DetailList title="Mô tả công việc" items={recruitment.responsibilities} />
                <DetailList title="Yêu cầu ứng viên" items={recruitment.requirements} />
                <DetailList title="Quyền lợi" items={recruitment.benefits} />
              </article>

              <aside className="flex h-fit flex-col gap-4 lg:sticky lg:top-24">
                <Panel>
                  <div className="flex flex-col gap-4">
                    <Heading level={2} className="text-lg font-bold uppercase text-gray-950">
                      Thông tin vị trí
                    </Heading>

                    <div className="flex flex-col gap-4 text-sm text-gray-600">
                      <div className="flex items-start gap-4">
                        <Icon name="location" className="h-5 w-5 shrink-0 text-blue-700" />
                        <span>{recruitment.location}</span>
                      </div>
                      <div className="flex items-start gap-4">
                        <Icon name="clock" className="h-5 w-5 shrink-0 text-blue-700" />
                        <span>{recruitment.employmentType}</span>
                      </div>
                      {recruitment.salary ? (
                        <div className="flex items-start gap-4">
                          <Icon name="payment" className="h-5 w-5 shrink-0 text-blue-700" />
                          <span>{recruitment.salary}</span>
                        </div>
                      ) : null}
                      {deadline ? (
                        <div className="flex items-start gap-4">
                          <Icon name="clock" className="h-5 w-5 shrink-0 text-blue-700" />
                          <span>{deadline}</span>
                        </div>
                      ) : null}
                      {typeof recruitment.openings === "number" ? (
                        <div className="flex items-start gap-4">
                          <Icon name="users" className="h-5 w-5 shrink-0 text-blue-700" />
                          <span>{recruitment.openings} vị trí</span>
                        </div>
                      ) : null}
                    </div>

                    <ActionLink href={recruitment.applyUrl ?? "/lien-he"} className="mt-4 justify-center">
                      Ứng tuyển vị trí này
                    </ActionLink>
                  </div>
                </Panel>

                <Panel variant="primary-soft">
                  <div className="flex flex-col gap-4">
                    <Heading level={2} className="text-lg font-bold uppercase text-gray-950">
                      Thông tin BikeSport
                    </Heading>
                    <p className="text-sm font-semibold text-gray-950">{options.organization.legalName}</p>
                    <div className="flex flex-col gap-4 text-sm text-gray-600">
                      {options.organization.headquarters ? (
                        <div className="flex items-start gap-4">
                          <Icon name="location" className="h-5 w-5 shrink-0 text-blue-700" />
                          <span>{options.organization.headquarters}</span>
                        </div>
                      ) : null}
                      <div className="flex items-start gap-4">
                        <Icon name="mail" className="h-5 w-5 shrink-0 text-blue-700" />
                        <CLink href={options.contact.email.href ?? `mailto:${options.contact.email.value}`} className="hover:text-blue-700">
                          {options.contact.email.value}
                        </CLink>
                      </div>
                      <div className="flex items-start gap-4">
                        <Icon name="phone" className="h-5 w-5 shrink-0 text-blue-700" />
                        <CLink href={options.contact.hotline.href ?? `tel:${options.contact.hotline.value}`} className="hover:text-blue-700">
                          {options.contact.hotline.value}
                        </CLink>
                      </div>
                    </div>
                    <CLink href="/lien-he" className="text-sm font-semibold text-blue-700">
                      Xem thông tin liên hệ →
                    </CLink>
                  </div>
                </Panel>
              </aside>
            </div>
          </div>
        </Container>
      </Section>

      {relatedCards.length > 0 ? (
        <Section>
          <Container>
            <div className="flex flex-col gap-4">
              <SectionHeader title="Các vị trí khác bạn có thể quan tâm" />
              <CardGrid
                items={relatedCards}
                template="listing"
                gridClassName="grid grid-cols-1 gap-4 lg:grid-cols-3"
              />
              <CLink
                href="/tuyen-dung#vi-tri-dang-tuyen"
                className="mt-2 text-sm font-semibold text-blue-700"
              >
                Xem tất cả vị trí tuyển dụng →
              </CLink>
            </div>
          </Container>
        </Section>
      ) : null}

      {recruitmentCtaSection ? <PageSections sections={[recruitmentCtaSection]} /> : null}
    </main>
  );
}
