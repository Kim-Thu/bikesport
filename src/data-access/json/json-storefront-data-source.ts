import type { StorefrontDataSource } from "@/data-access/contracts/storefront-data-source.interface";
import { jsonPageRepository } from "@/data-access/json/json-page.repository";

export const jsonStorefrontDataSource: StorefrontDataSource = {
  pages: jsonPageRepository,
};
