import wpPages from "@/data/wp-pages.json";
import type { PageRecord } from "@/interfaces/page.interface";
import type { PageDataSource } from "@/data-access/contracts/page-data-source.interface";

const pages = wpPages.pages as PageRecord[];
const publishedPages = pages.filter((page) => page.status === "published");
const publishedPageByPath = new Map(publishedPages.map((page) => [page.path, page]));
const publishedPageBySlug = new Map(publishedPages.map((page) => [page.slug, page]));
const publishedSlugs = publishedPages
  .filter((page) => page.path !== "/")
  .map((page) => page.slug);

export const jsonPageDataSource: PageDataSource = {
  async getPublished() {
    return publishedPages;
  },
  async getPublishedByPath(path) {
    return publishedPageByPath.get(path) ?? null;
  },
  async getPublishedBySlug(slug) {
    return publishedPageBySlug.get(slug) ?? null;
  },
  async getPublishedSlugs() {
    return publishedSlugs;
  },
};
