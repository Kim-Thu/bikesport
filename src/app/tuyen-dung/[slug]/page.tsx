import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActionLink } from "@/components/link/ActionLink";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/section/Section";
import { Heading } from "@/components/heading/Heading";
import { Icon } from "@/components/icon/Icon";
import { formatRecruitmentDeadline, getRecruitmentBySlug } from "@/lib/recruitment.utils";

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

function DetailList({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;

  return (
    <section className="flex flex-col gap-4">
      <Heading level={2} className="text-xl font-bold uppercase text-gray-950">
        {title}
      </Heading>
      <ul className="flex flex-col gap-4 text-sm leading-7 text-gray-600 sm:text-base">
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

  const recruitment = post.recruitment;
  const deadline = formatRecruitmentDeadline(recruitment.deadline);

  return (
    <main aria-label={post.title}>
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <article className="flex min-w-0 flex-col gap-8">
              <header className="flex flex-col gap-4 border-b border-gray-200 pb-8">
                <p className="text-sm font-semibold uppercase text-blue-700">{recruitment.department}</p>
                <Heading level={1} className="text-3xl font-bold text-gray-950 sm:text-4xl">
                  {post.title}
                </Heading>
                {post.excerpt ? (
                  <p className="max-w-3xl text-base leading-7 text-gray-600">{post.excerpt}</p>
                ) : null}
              </header>

              <DetailList title="Mô tả công việc" items={recruitment.responsibilities} />
              <DetailList title="Yêu cầu ứng viên" items={recruitment.requirements} />
              <DetailList title="Quyền lợi" items={recruitment.benefits} />
            </article>

            <aside className="h-fit rounded-xl border border-gray-200 bg-white p-6 lg:sticky lg:top-24">
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
            </aside>
          </div>
        </Container>
      </Section>
    </main>
  );
}
