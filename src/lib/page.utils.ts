import wpPages from "@/data/wp-pages.json";
import type { PageRecord } from "@/interfaces/page.interface";

const pages = wpPages.pages as PageRecord[];
const publishedPages = pages.filter((page) => page.status === "published");
const publishedPageByPath = new Map(publishedPages.map((page) => [page.path, page]));
const publishedPageBySlug = new Map(publishedPages.map((page) => [page.slug, page]));

export function getPublishedPageByPath(path: string): PageRecord | null {
  return publishedPageByPath.get(path) ?? null;
}

export function getPublishedPageBySlug(slug: string): PageRecord | null {
  return publishedPageBySlug.get(slug) ?? null;
}

export function getPublishedPageSlugs(): string[] {
  return publishedPages
    .filter((page) => page.path !== "/")
    .map((page) => page.slug);
}
