# MongoDB Schema Index

Database: `bikesport_commerce`

## Collection inventory

### Identity & Access
`admin_users`, `roles`, `permissions`, `admin_sessions`, `audit_logs`

### Customer
`customers`, `customer_addresses`, `wishlists`

### CMS / Content
`sites`, `pages`, `posts`, `post_categories`, `tags`, `menus`, `banners`, `redirects`, `site_settings`

### Catalog
`brands`, `product_types`, `categories`, `products`, `product_variants`, `media_assets`, `product_site_overrides`, `product_collections`

### Commerce
`promotion_presentations`, `carts`, `orders`, `order_events`, `shipping_methods`, `payment_methods`

### Odoo Read Models / Integration
`inventory_read_models`, `price_read_models`, `store_read_models`, `warranty_read_models`, `external_mappings`, `sync_checkpoints`, `sync_failures`

Tổng: **39 collections**.

## Canonical files

- `identity-access.md`
- `customer.md`
- `content-cms.md`
- `catalog.md`
- `commerce.md`
- `integration-read-models.md`

Nếu collection không có trong danh sách này, agent không được tự tạo. Mọi bổ sung phải qua `DATA-CHG-xxx`.
