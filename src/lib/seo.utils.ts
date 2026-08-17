import type { Metadata } from "next";
import { dataSources } from "@/data-access/data-sources";
import type {
  ResolveSeoInput,
  SeoGlobalSettings,
  SeoRecord,
} from "@/interfaces/seo.interface";
import type { SiteIdentityOptions } from "@/interfaces/options.interface";
import { getHomeUrl } from "@/lib/link.utils";
import { getMediaUrl } from "@/lib/media.utils";
import { getSiteOptions } from "@/lib/options.utils";

function normalizePath(path: string): string {
  const normalized = path.trim();
  if (!normalized) return "/";
  const withLeadingSlash = normalized.startsWith("/") ? normalized : `/${normalized}`;
  return withLeadingSlash.length > 1 ? withLeadingSlash.replace(/\/+$/, "") : withLeadingSlash;
}

async function getSeoRecord(input: ResolveSeoInput): Promise<SeoRecord | null> {
  if (input.objectType && input.objectId) {
    const byEntity = await dataSources.seo.getByEntity(input.objectType, input.objectId);
    if (byEntity) return byEntity;
  }

  return input.path ? dataSources.seo.getByPath(input.path) : null;
}

function applyTitleFormat(
  title: string,
  site: SiteIdentityOptions,
  format?: string,
): string {
  const template = format?.trim() || "%title% | %siteName%";
  return template
    .replaceAll("%title%", title)
    .replaceAll("%siteName%", site.siteTitle || "")
    .replaceAll("%tagLine%", site.tagLine || "")
    .replace(/\s+/g, " ")
    .replace(/\s+([|\-–—])\s*$/g, "")
    .trim();
}

function resolveCanonical(
  input: ResolveSeoInput,
  globalSeo: SeoGlobalSettings,
  record?: SeoRecord | null,
): string | undefined {
  if (record?.canonical) return record.canonical;
  if (!input.path) return undefined;

  const baseUrl = (globalSeo.canonicalBaseUrl || getHomeUrl()).trim().replace(/\/+$/, "");
  if (!baseUrl) return undefined;
  const path = normalizePath(input.path);
  return path === "/" ? `${baseUrl}/` : `${baseUrl}${path}`;
}

export async function resolveSeoMetadata(input: ResolveSeoInput = {}): Promise<Metadata> {
  const [record, options] = await Promise.all([getSeoRecord(input), getSiteOptions()]);
  const { site, seo: globalSeo } = options;
  const rawTitle = record?.title || input.title || site.siteTitle || "";
  const title = applyTitleFormat(rawTitle, site, record?.titleFormat || globalSeo.titleFormat);
  const description = record?.description || input.description || globalSeo.defaultDescription;
  const canonical = resolveCanonical(input, globalSeo, record);
  const robots = {
    index: record?.robots?.index ?? globalSeo.robots?.index ?? true,
    follow: record?.robots?.follow ?? globalSeo.robots?.follow ?? true,
  };

  const openGraphImageMediaId = record?.openGraph?.imageMediaId || globalSeo.openGraph?.defaultImageMediaId;
  const twitterImageMediaId = record?.twitter?.imageMediaId || globalSeo.twitter?.defaultImageMediaId || openGraphImageMediaId;
  const [openGraphImage, twitterImage] = await Promise.all([
    getMediaUrl(openGraphImageMediaId),
    getMediaUrl(twitterImageMediaId),
  ]);

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    robots,
    openGraph: {
      title: record?.openGraph?.title || title,
      description: record?.openGraph?.description || description,
      type: record?.openGraph?.type || globalSeo.openGraph?.type || "website",
      locale: globalSeo.openGraph?.locale,
      url: canonical,
      siteName: site.siteTitle || undefined,
      images: openGraphImage ? [{ url: openGraphImage }] : undefined,
    },
    twitter: {
      card: globalSeo.twitter?.card || "summary_large_image",
      title: record?.twitter?.title || title,
      description: record?.twitter?.description || description,
      images: twitterImage ? [twitterImage] : undefined,
    },
  };
}
