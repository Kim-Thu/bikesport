# CMS Task Breakdown

**Status:** Active Draft  
**Rule:** mỗi task phải dùng đúng canonical collection trong `../database/mongodb/`. Không tự tạo schema mới.

| ID | Task | Collections chính | Dependency | Status | Done khi |
| --- | --- | --- | --- | --- | --- |
| CMS-001 | CMS authentication/session | `admin_users`,`admin_sessions` | DEC-006 | BLOCKED | login/logout/revoke/session expiry test pass |
| CMS-002 | Role & permission management | `roles`,`permissions`,`admin_users` | DEC-006 | BLOCKED | permission matrix implement + negative tests pass |
| CMS-003 | Audit logging | `audit_logs` | CMS-001/002 | NOT_STARTED | publish/delete/settings/permission changes có audit |
| CMS-010 | Site management | `sites` | - | READY | CRUD + domain/code uniqueness pass |
| CMS-011 | Site settings management | `site_settings` | CMS-010, CMS-002 | BLOCKED | namespace/key validation + permission + no raw secret |
| CMS-020 | Page management | `pages`,`media_assets` | CMS-001/002, CMS-010 | BLOCKED | create/edit/status/slug/SEO/site scope pass |
| CMS-021 | Post management | `posts`,`post_categories`,`tags`,`media_assets` | CMS-001/002, CMS-010 | BLOCKED | CRUD + taxonomy + publish/schedule rules pass |
| CMS-022 | Post category/tag management | `post_categories`,`tags` | CMS-010 | NOT_STARTED | hierarchy/slug uniqueness pass |
| CMS-023 | Menu management | `menus` | CMS-010 | NOT_STARTED | tree/order/internal/external target validation pass |
| CMS-024 | Banner management | `banners`,`media_assets` | CMS-010 | NOT_STARTED | placement/order/date/status pass |
| CMS-025 | Redirect management | `redirects` | CMS-010 | NOT_STARTED | source uniqueness + redirect status validation pass |
| CMS-030 | Media library | `media_assets` | CMS-001/002 | BLOCKED | upload/list/metadata/delete policy pass |
| CMS-040 | Brand management | `brands`,`media_assets` | CMS-030 | NOT_STARTED | CRUD + code/slug uniqueness pass |
| CMS-041 | Product type/attribute registry | `product_types` | DEC-005 | BLOCKED | attribute definition validation pass |
| CMS-042 | Product category management | `categories` | DEC-005 | BLOCKED | hierarchy/path/order pass |
| CMS-043 | Product presentation management | `products`,`product_variants` | DEC-001, DEC-005 | BLOCKED | chỉ sửa field CMS-owned + schema validation pass |
| CMS-044 | Product media management | `products`,`product_variants`,`media_assets` | CMS-030, CMS-043 | BLOCKED | media ordering/featured/variant media pass |
| CMS-045 | Product site override | `product_site_overrides` | CMS-010, CMS-043 | BLOCKED | visibility/slug/content override đúng site |
| CMS-046 | Product collection merchandising | `product_collections` | CMS-010, CMS-043 | NOT_STARTED | manual membership/sort/status pass |
| CMS-050 | Promotion presentation management | `promotion_presentations` | DEC-003 | BLOCKED | presentation không sửa business rule trái ownership |
| CMS-060 | Order support view | `orders`,`order_events` | DEC-004, BE-013, DEC-006 | BLOCKED | read/action đúng permission + audit |
| CMS-061 | Store support/content view | `store_read_models` | INT-005, DEC-006 | BLOCKED | không ghi đè operational Odoo data |
| CMS-062 | Warranty support view | `warranty_read_models` | INT-005, DEC-006 | BLOCKED | read/action theo contract/permission |
| CMS-070 | Sync failure support | `sync_failures`,`sync_checkpoints` | INT-006, DEC-006 | BLOCKED | xem/retry/ignore theo quyền + audit |

## Definition of Done CMS task

Một CMS task chỉ `DONE` khi:

- API/backend validation đã pass;
- UI sử dụng đúng field canonical;
- permission positive/negative case pass nếu là write task;
- site scope được test nếu dữ liệu multi-site;
- audit log có nếu task thuộc nhóm cần audit;
- không tạo collection/field ngoài schema;
- test case/evidence được liên kết vào task board.
