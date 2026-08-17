import type { DataSources } from "@/data-access/contracts/data-sources.interface";
import { getMongoDatabase } from "@/data-access/mongodb/mongodb-database-provider";
import { createMongoAdsDataSource } from "@/data-access/mongodb/mongodb-ads-data-source";
import { createMongoAnnouncementDataSource } from "@/data-access/mongodb/mongodb-announcement-data-source";
import { createMongoBannerDataSource } from "@/data-access/mongodb/mongodb-banner-data-source";
import { createMongoBrandDataSource } from "@/data-access/mongodb/mongodb-brand-data-source";
import { createMongoCampaignDataSource } from "@/data-access/mongodb/mongodb-campaign-data-source";
import { createMongoCategoryDataSource } from "@/data-access/mongodb/mongodb-category-data-source";
import { createMongoComboDataSource } from "@/data-access/mongodb/mongodb-combo-data-source";
import { createMongoEventDataSource } from "@/data-access/mongodb/mongodb-event-data-source";
import { createMongoMediaDataSource } from "@/data-access/mongodb/mongodb-media-data-source";
import { createMongoMenuDataSource } from "@/data-access/mongodb/mongodb-menu-data-source";
import { createMongoOptionsDataSource } from "@/data-access/mongodb/mongodb-options-data-source";
import { createMongoOrderDataSource } from "@/data-access/mongodb/mongodb-order-data-source";
import { createMongoPageDataSource } from "@/data-access/mongodb/mongodb-page-data-source";
import { createMongoPaymentDataSource } from "@/data-access/mongodb/mongodb-payment-data-source";
import { createMongoPostDataSource } from "@/data-access/mongodb/mongodb-post-data-source";
import { createMongoProductDataSource } from "@/data-access/mongodb/mongodb-product-data-source";
import { createMongoPromotionDataSource } from "@/data-access/mongodb/mongodb-promotion-data-source";
import { createMongoReviewDataSource } from "@/data-access/mongodb/mongodb-review-data-source";
import { createMongoStoreDataSource } from "@/data-access/mongodb/mongodb-store-data-source";
import { createMongoUserDataSource } from "@/data-access/mongodb/mongodb-user-data-source";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";

export function createMongoDataSources(
  getDatabase: MongoDatabaseProvider = getMongoDatabase,
): DataSources {
  return {
    page: createMongoPageDataSource(getDatabase),
    category: createMongoCategoryDataSource(getDatabase),
    brand: createMongoBrandDataSource(getDatabase),
    product: createMongoProductDataSource(getDatabase),
    promotion: createMongoPromotionDataSource(getDatabase),
    menu: createMongoMenuDataSource(getDatabase),
    post: createMongoPostDataSource(getDatabase),
    event: createMongoEventDataSource(getDatabase),
    user: createMongoUserDataSource(getDatabase),
    store: createMongoStoreDataSource(getDatabase),
    banner: createMongoBannerDataSource(getDatabase),
    ads: createMongoAdsDataSource(getDatabase),
    combo: createMongoComboDataSource(getDatabase),
    campaign: createMongoCampaignDataSource(getDatabase),
    announcement: createMongoAnnouncementDataSource(getDatabase),
    payment: createMongoPaymentDataSource(getDatabase),
    options: createMongoOptionsDataSource(getDatabase),
    media: createMongoMediaDataSource(getDatabase),
    order: createMongoOrderDataSource(getDatabase),
    review: createMongoReviewDataSource(getDatabase),
  };
}

export const mongodbDataSources = createMongoDataSources();
