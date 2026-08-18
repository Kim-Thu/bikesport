import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB_NAME;

if (!uri || !databaseName) {
  throw new Error("MONGODB_URI and MONGODB_DB_NAME are required to apply MongoDB indexes.");
}

const indexManifest = {
  pages: [
    { key: { status: 1, path: 1 }, name: "pages_status_path" },
    { key: { status: 1, slug: 1 }, name: "pages_status_slug" },
  ],
  products: [
    { key: { status: 1, featured: 1 }, name: "products_status_featured" },
    { key: { status: 1, brandId: 1 }, name: "products_status_brand" },
    { key: { status: 1, categoryIds: 1 }, name: "products_status_categories" },
    { key: { status: 1, sku: 1 }, name: "products_status_sku" },
    { key: { status: 1, slug: 1 }, name: "products_status_slug" },
  ],
  categories: [
    { key: { status: 1, order: 1 }, name: "categories_status_order" },
    { key: { status: 1, type: 1, order: 1 }, name: "categories_status_type_order" },
    {
      key: { status: 1, type: 1, featured: 1, order: 1 },
      name: "categories_status_type_featured_order",
    },
  ],
  brands: [
    { key: { status: 1, order: 1 }, name: "brands_status_order" },
    { key: { status: 1, slug: 1 }, name: "brands_status_slug" },
    {
      key: { status: 1, featured: 1, order: 1 },
      name: "brands_status_featured_order",
    },
  ],
  promotions: [
    { key: { status: 1, priority: -1 }, name: "promotions_status_priority" },
  ],
  banners: [
    { key: { groupId: 1, order: 1 }, name: "banners_group_order" },
    { key: { categoryId: 1, order: 1 }, name: "banners_category_order" },
  ],
  store_regions: [
    { key: { status: 1, order: 1 }, name: "store_regions_status_order" },
  ],
  store_locations: [
    { key: { status: 1, order: 1 }, name: "store_locations_status_order" },
    {
      key: { status: 1, type: 1, order: 1 },
      name: "store_locations_status_type_order",
    },
    {
      key: { status: 1, parentId: 1, order: 1 },
      name: "store_locations_status_parent_order",
    },
  ],
  stores: [
    { key: { status: 1, order: 1 }, name: "stores_status_order" },
    {
      key: { status: 1, featured: 1, order: 1 },
      name: "stores_status_featured_order",
    },
    {
      key: { status: 1, regionId: 1, order: 1 },
      name: "stores_status_region_order",
    },
    {
      key: { status: 1, locationId: 1, order: 1 },
      name: "stores_status_location_order",
    },
  ],
  posts: [
    { key: { status: 1, publishedAt: -1 }, name: "posts_status_published_at" },
    {
      key: { status: 1, type: 1, publishedAt: -1 },
      name: "posts_status_type_published_at",
    },
    {
      key: { status: 1, type: 1, slug: 1 },
      name: "posts_status_type_slug",
    },
  ],
  events: [
    {
      key: { status: 1, featured: 1, startAt: 1 },
      name: "events_status_featured_start_at",
    },
    { key: { status: 1, slug: 1 }, name: "events_status_slug" },
  ],
  combos: [
    { key: { status: 1, order: 1 }, name: "combos_status_order" },
    {
      key: { status: 1, featured: 1, order: 1 },
      name: "combos_status_featured_order",
    },
  ],
  ads: [
    {
      key: { status: 1, placement: 1, priority: -1 },
      name: "ads_status_placement_priority",
    },
  ],
  campaigns: [
    { key: { status: 1 }, name: "campaigns_status" },
  ],
  payments: [
    { key: { order: 1 }, name: "payments_order" },
  ],
  seo: [
    { key: { objectType: 1, objectId: 1 }, name: "seo_object_type_object_id" },
    { key: { path: 1 }, name: "seo_path" },
  ],
  meta_categories: [
    {
      key: { status: 1, type: 1, name: 1 },
      name: "meta_categories_status_type_name",
    },
    {
      key: { status: 1, type: 1, slug: 1 },
      name: "meta_categories_status_type_slug",
    },
  ],
  attributes: [
    { key: { status: 1, name: 1 }, name: "attributes_status_name" },
    { key: { status: 1, slug: 1 }, name: "attributes_status_slug" },
  ],
  orders: [
    { key: { createdAt: -1 }, name: "orders_created_at" },
    { key: { status: 1, createdAt: -1 }, name: "orders_status_created_at" },
    { key: { status: 1, "items.sku": 1 }, name: "orders_status_item_sku" },
    { key: { orderNumber: 1 }, name: "orders_order_number" },
  ],
  reviews: [
    { key: { status: 1, sku: 1 }, name: "reviews_status_sku" },
  ],
};

const client = new MongoClient(uri);

try {
  await client.connect();
  const db = client.db(databaseName);

  for (const [collectionName, indexes] of Object.entries(indexManifest)) {
    if (!indexes.length) continue;
    await db.collection(collectionName).createIndexes(indexes);
    console.log(`Applied ${indexes.length} indexes to ${collectionName}.`);
  }
} finally {
  await client.close();
}