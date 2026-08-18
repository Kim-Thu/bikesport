import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { Heading } from "@/components/heading/Heading";
import { Container } from "@/components/layout/Container";
import { Panel } from "@/components/panel/Panel";
import { getPublishedEventBySlug, getPublishedEvents } from "@/lib/event.utils";
import { resolveSeoMetadata } from "@/lib/seo.utils";

export const revalidate = 300;
export const dynamicParams = false;

function formatEventDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(value));
}

export async function generateStaticParams() {
  const events = await getPublishedEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await getPublishedEventBySlug(slug);
  if (!event) return {};

  const description = event.location
    ? `${event.title} tại ${event.location}. Bắt đầu ${formatEventDate(event.startAt)}.`
    : `${event.title}. Bắt đầu ${formatEventDate(event.startAt)}.`;

  return resolveSeoMetadata({
    path: `/su-kien/${event.slug}`,
    objectType: "custom",
    objectId: event._id,
    title: event.title,
    description,
  });
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getPublishedEventBySlug(slug);
  if (!event) notFound();

  return (
    <main aria-label={`Sự kiện ${event.title}`}>
      <Container className="space-y-8 py-8">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Sự kiện", href: "/su-kien" },
            { label: event.title },
          ]}
        />

        <div className="space-y-4">
          <Heading level={1} className="text-2xl font-bold text-gray-950 sm:text-3xl">
            {event.title}
          </Heading>
          <p className="text-base text-gray-700">
            {event.location ? `${event.location} - ` : ""}{formatEventDate(event.startAt)}
          </p>
        </div>

        <Panel className="p-8">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <dt className="font-semibold text-gray-950">Bắt đầu</dt>
              <dd className="text-gray-700">{formatEventDate(event.startAt)}</dd>
            </div>
            {event.endAt ? (
              <div className="space-y-2">
                <dt className="font-semibold text-gray-950">Kết thúc</dt>
                <dd className="text-gray-700">{formatEventDate(event.endAt)}</dd>
              </div>
            ) : null}
            {event.location ? (
              <div className="space-y-2">
                <dt className="font-semibold text-gray-950">Địa điểm</dt>
                <dd className="text-gray-700">{event.location}</dd>
              </div>
            ) : null}
            {typeof event.attendees === "number" ? (
              <div className="space-y-2">
                <dt className="font-semibold text-gray-950">Người tham gia</dt>
                <dd className="text-gray-700">{event.attendees}</dd>
              </div>
            ) : null}
          </dl>
        </Panel>
      </Container>
    </main>
  );
}
