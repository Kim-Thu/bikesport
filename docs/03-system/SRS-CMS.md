# SRS - CMS

**Phiên bản:** 0.2  
**Trạng thái:** Draft

## 1. Mục đích

CMS là hệ thống cho nhân sự nội bộ quản trị dữ liệu và nội dung phục vụ các kênh thương mại điện tử BikeSport.

## 2. Phạm vi đã xác nhận

- CMS tồn tại độc lập với Odoo.
- CMS/Commerce sử dụng MongoDB.
- CMS quản trị dữ liệu sản phẩm và nội dung web.
- CMS phải có dữ liệu người dùng/quyền truy cập riêng cho nhân sự CMS.
- CMS phải quản trị Page, Post và Settings của website.
- CMS phải hỗ trợ nhiều website/site scope.
- Nhân sự phải bị giới hạn quyền theo phần nghiệp vụ được cấp.

## 3. Functional Requirements

### Identity & Access

| ID | Requirement | Trạng thái |
| --- | --- | --- |
| CMS-FR-001 | CMS phải cho phép quản lý tài khoản nhân sự CMS. | Đã xác nhận |
| CMS-FR-002 | CMS phải hỗ trợ Role và Permission thay vì chỉ kiểm tra tên chức danh. | Đã xác nhận ở mức nhu cầu phân quyền |
| CMS-FR-003 | Quyền phải có thể giới hạn theo domain và site scope. | Giả định cần xác nhận chi tiết role matrix |
| CMS-FR-004 | Các thao tác quản trị quan trọng phải có audit trail. | Proposed - cần xác nhận NFR/audit policy |

### Page / Post / Content

| ID | Requirement | Trạng thái |
| --- | --- | --- |
| CMS-FR-010 | CMS phải cho phép tạo, sửa, xem và quản lý trạng thái Page. | Đã xác nhận |
| CMS-FR-011 | CMS phải cho phép tạo, sửa, xem và quản lý trạng thái Post/Blog. | Đã xác nhận |
| CMS-FR-012 | CMS phải hỗ trợ taxonomy nội dung như Post Category và Tag. | Proposed để hoàn chỉnh Post management |
| CMS-FR-013 | CMS phải hỗ trợ Menu theo từng website. | Proposed - cần xác nhận phạm vi menu |
| CMS-FR-014 | CMS phải hỗ trợ Banner/placement phục vụ Storefront. | Proposed - phù hợp content management, cần xác nhận |
| CMS-FR-015 | CMS phải hỗ trợ redirect/URL management cho nội dung thay đổi slug/path. | Proposed - cần xác nhận SEO requirement |
| CMS-FR-016 | Page/Post phải hỗ trợ SEO metadata. | Proposed - cần xác nhận field bắt buộc |

### Settings / Multi-site

| ID | Requirement | Trạng thái |
| --- | --- | --- |
| CMS-FR-020 | CMS phải cho phép quản lý Settings theo từng site. | Đã xác nhận |
| CMS-FR-021 | Settings phải phân namespace/key và không được lưu secret thô. | Proposed technical rule |
| CMS-FR-022 | Nội dung, menu, banner, settings phải xác định rõ site scope. | Đã xác nhận ở mức multi-site |

### Product / Catalog

| ID | Requirement | Trạng thái |
| --- | --- | --- |
| CMS-FR-030 | CMS phải hỗ trợ quản trị Product presentation thuộc phạm vi Commerce sở hữu. | Đã xác nhận ở mức khái niệm |
| CMS-FR-031 | CMS phải hỗ trợ thuộc tính sản phẩm linh hoạt theo Product Type. | Đã xác nhận |
| CMS-FR-032 | CMS phải quản trị Category, Brand, Media và Product Collection phục vụ website. | Proposed - Brand/Collection cần xác nhận business scope |
| CMS-FR-033 | CMS phải hỗ trợ product override/visibility theo website. | Đã xác nhận ở mức multi-site need; chi tiết TBD |
| CMS-FR-034 | CMS không được sửa trực tiếp stock transaction/reservation của Odoo. | Boundary rule |

### Commerce Support

| ID | Requirement | Trạng thái |
| --- | --- | --- |
| CMS-FR-040 | CMS có thể hiển thị Order/Store/Warranty data nếu business scope yêu cầu. | Câu hỏi mở |
| CMS-FR-041 | Nếu CMS có thao tác trên dữ liệu Odoo, quyền ghi và integration contract phải được xác định riêng. | Bắt buộc trước implementation |

## 4. Canonical MongoDB collections CMS liên quan

CMS agent phải dùng đúng schema trong `docs/06-engineering/database/mongodb/`.

| Domain | Collections |
| --- | --- |
| User & Permission | `admin_users`, `roles`, `permissions`, `admin_sessions`, `audit_logs` |
| Content | `sites`, `pages`, `posts`, `post_categories`, `tags`, `menus`, `banners`, `redirects`, `site_settings` |
| Catalog | `brands`, `product_types`, `categories`, `products`, `product_variants`, `media_assets`, `product_site_overrides`, `product_collections` |
| Commerce Support | `promotion_presentations`, `orders`, `store_read_models`, `warranty_read_models`, `sync_failures` theo quyền/scope |

CMS không được tự tạo collection mới như `users`, `cms_pages`, `blog_posts`, `settings_general`, `product_images` nếu đã có canonical collection tương ứng.

## 5. Boundary với Odoo

Odoo quản lý dữ liệu vận hành/back-office như stock, warehouse, stock movement, reservation, order fulfillment, warranty operational data, store operational data và các phần pricing/promotion thuộc ownership Odoo sau khi decision được chốt.

CMS quản lý dữ liệu web/CMS như Page, Post, Menu, Banner, SEO, Settings, Media, Product presentation và các dữ liệu merchandising được xác nhận.

Các domain Product, Pricing, Promotion, Order, Store, Warranty phải tuân theo `data-ownership.md` và `cross-system-mapping.md`, không dual-write tùy ý.

## 6. Authorization - cần chốt role matrix

Role cụ thể chưa được xác nhận. Permission registry tối thiểu phải bao phủ:

- User/role/permission administration.
- Product/catalog/media.
- Page/post/menu/banner.
- Settings.
- Pricing/promotion presentation.
- Order support.
- Warranty support.
- Store/location content.
- Sync/error support.

## 7. Open Questions

- Q-CMS-001: CMS được phép tạo Product mới hay chỉ enrich Product từ Odoo?
- Q-CMS-002: CMS có được sửa giá/promotion rule hay chỉ presentation?
- Q-CMS-003: CMS có màn hình order/warranty không? Read-only hay có action?
- Q-CMS-004: Danh sách role CMS và permission cụ thể là gì?
- Q-CMS-005: Page/Post có workflow `draft -> review -> publish` bắt buộc hay publish trực tiếp theo permission?
- Q-CMS-006: Menu/Banner/Redirect có nằm trong MVP không?
- Q-CMS-007: Brand và Product Collection có nằm trong catalog MVP không?
