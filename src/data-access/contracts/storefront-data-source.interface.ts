import type { PageRepository } from "@/data-access/contracts/page.repository";

export interface StorefrontDataSource {
  pages: PageRepository;
}
