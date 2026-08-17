import wpPages from "@/data/wp-pages.json";
import type { PageRepository } from "@/data-access/contracts/page.repository";
import type { PageRecord } from "@/interfaces/page.interface";

const pages = wpPages.pages as PageRecord[];
const publishedPages = pages.filter((page) => page.status === "published");
const publishedPageByPath = new Map(publishedPages.map((page) => [page.path, page]));
const publishedPageBySlug = new Map(publishedPages.map((page) => [page.slug, page]));
const publishedSlugs = publishedPages
  .filter((page) => page.path !== "/")
  .map((page) => page.slug);

export const jsonPageRepository: PageRepository = {
  async findPublishedByPath(path) {
    return publishedPageByPath.get(path) ?? null;
  },

  async findPublishedBySlug(slug) {
    return publishedPageBySlug.get(slug) ?? null;
  },

  async listPublishedSlugs() {
    return publishedSlugs;
  },
};
