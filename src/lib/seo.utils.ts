import type { Metadata } from "next";
import wpOption from "@/data/wp-option.json";
import wpSeo from "@/data/wp-seo.json";
import type {
  ResolveSeoInput,
  SeoData,
  SeoGlobalSettings,
  SeoRecord,
} from "@/interfaces/seo.interface";
import { getHomeUrl } from "@/lib/link.utils";
import { getMediaUrl } from "@/lib/media.utils";

const seoData = wpSeo as SeoData;
const globalSeo = wpOption.seo as SeoGlobalSettings;

const seoByObjectId = new Map<string, SeoRecord>();
const seoByPath = new Map<string, SeoRecord>();

for (const item of seoData.seo) {
  if (item.objectId) seoByObjectId.set(`${item.objectType}:${item.objectId}`, item);
  if (item.path) seoByPath.set(normalizePath(item.path), item);
}

function normalizePath(path: string): string {
  const normalized = path.trim();
  if (!normalized) return "/";
  const withLeadingSlash = normalized.startsWith("/") ? normalized : `/${normalized}`;
  return withLeadingSlash.length > 1 ? withLeadingSlash.replace(/\/+$/, "") : withLeadingSlash;
}

function getSeoRecord(input: ResolveSeoInput): SeoRecord | undefined {
  if (input.objectType && input.objectId) {
    const byObject = seoByObjectId.get(`${input.objectType}:${input.objectId}`);
    if (byObject) return byObject;
  }

  if (input.path) return seoByPath.get(normalizePath(input.path));
  return undefined;
}

function applyTitleFormat(title: string, format?: string): string {
  const template = format?.trim() || "%title% | %siteName%";
  return template
    .replaceAll("%title%", title)
    .replaceAll("%siteName%", wpOption.site.siteTitle || "")
    .replaceAll("%tagLine%", wpOption.site.tagLine || "")
    .replace(/\s+/g, " ")
    .replace(/\s+([|\-–—])\s*$/g, "")
    .trim();
}

function resolveCanonical(input: ResolveSeoInput, record?: SeoRecord): string | undefined {
  if (record?.canonical) return record.canonical;
  if (!input.path) return undefined;

  const baseUrl = (globalSeo.canonicalBaseUrl || getHomeUrl()).trim().replace(/\/+$/, "");
  if (!baseUrl) return undefined;
  const path = normalizePath(input.path);
  return path === "/" ? `${baseUrl}/` : `${baseUrl}${path}`;
}

export function resolveSeoMetadata(input: ResolveSeoInput = {}): Metadata {
  const record = getSeoRecord(input);
  const rawTitle = record?.title || input.title || wpOption.site.siteTitle || "";
  const title = applyTitleFormat(rawTitle, record?.titleFormat || globalSeo.titleFormat);
  const description = record?.description || input.description || globalSeo.defaultDescription;
  const canonical = resolveCanonical(input, record);
  const robots = {
    index: record?.robots?.index ?? globalSeo.robots?.index ?? true,
    follow: record?.robots?.follow ?? globalSeo.robots?.follow ?? true,
  };

  const openGraphImageMediaId = record?.openGraph?.imageMediaId || globalSeo.openGraph?.defaultImageMediaId;
  const openGraphImage = getMediaUrl(openGraphImageMediaId);
  const twitterImageMediaId = record?.twitter?.imageMediaId || globalSeo.twitter?.defaultImageMediaId || openGraphImageMediaId;
  const twitterImage = getMediaUrl(twitterImageMediaId);

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
      siteName: wpOption.site.siteTitle || undefined,
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
