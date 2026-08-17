import type { BrandDataSource } from "@/data-access/contracts/brand-data-source.interface";
import type { CategoryDataSource } from "@/data-access/contracts/category-data-source.interface";
import type { EventDataSource } from "@/data-access/contracts/event-data-source.interface";
import type { MenuDataSource } from "@/data-access/contracts/menu-data-source.interface";
import type { PageDataSource } from "@/data-access/contracts/page-data-source.interface";
import type { PostDataSource } from "@/data-access/contracts/post-data-source.interface";
import type { ProductDataSource } from "@/data-access/contracts/product-data-source.interface";
import type { PromotionDataSource } from "@/data-access/contracts/promotion-data-source.interface";
import type { UserDataSource } from "@/data-access/contracts/user-data-source.interface";

export interface DataSources {
  page: PageDataSource;
  category: CategoryDataSource;
  brand: BrandDataSource;
  product: ProductDataSource;
  promotion: PromotionDataSource;
  menu: MenuDataSource;
  post: PostDataSource;
  event: EventDataSource;
  user: UserDataSource;
}
