# BikeSport Project Task Board

**Branch:** `docs/T001-requirements-20260815-0955`  
**Trạng thái tài liệu:** Draft  
**Mục đích:** chia việc cụ thể cho từng subsystem, theo dõi dependency, trạng thái hoàn thành và bằng chứng kiểm chứng.

## 1. Quy ước trạng thái

| Trạng thái | Ý nghĩa |
| --- | --- |
| `BLOCKED` | Chưa thể làm vì còn quyết định/yêu cầu bắt buộc chưa chốt |
| `READY` | Đủ đầu vào, có thể nhận task |
| `IN_PROGRESS` | Đang thực hiện |
| `REVIEW` | Đã có output/baseline, đang chờ review/chốt |
| `DONE` | Đã có bằng chứng hoàn thành |
| `NOT_STARTED` | Chưa bắt đầu nhưng không bị block trực tiếp |

**Quy tắc:** agent chỉ được đổi task sang `DONE` khi cột `Evidence` có link/commit/test/result tương ứng.

**Schema rule:** `docs/06-engineering/database-architecture.md` là schema baseline canonical. Dù `DATA-001`/`DATA-002` đang ở `REVIEW`, agent không được tự tạo tên collection/table/field khác. Nếu cần thay đổi phải tạo task `DATA-CHG-xxx` và sửa schema baseline trước.

## 2. Trạng thái tổng thể hiện tại

Repository hiện mới có tài liệu yêu cầu và chưa có implementation. Vì vậy các task code đều chưa hoàn thành.

| Nhóm | Trạng thái hiện tại |
| --- | --- |
| Requirements | `REVIEW` |
| Data ownership | `BLOCKED` - còn Q-001 đến Q-008 |
| Database schema baseline | `REVIEW` - đã có collection/table/field/index canonical, chờ review các quyết định ownership |
| Odoo implementation | `NOT_STARTED` |
| Commerce Backend | `NOT_STARTED` |
| CMS | `NOT_STARTED` |
| Storefront | `NOT_STARTED` |
| Storefront Design System | `NOT_STARTED` |
| Security verification | `NOT_STARTED` |
| Performance verification | `NOT_STARTED` |
| End-to-end test | `NOT_STARTED` |

## 3. Phase 0 - Chốt các quyết định đang khóa business behavior/write path

Các task này phải được giải quyết trước khi khóa ownership và integration contract. Chúng **không cho phép agent tạo schema khác** với database baseline hiện tại.

| ID | Task | Owner/Sub-system | Dependency | Status | Evidence/Output |
| --- | --- | --- | --- | --- | --- |
| DEC-001 | Chốt source of truth cho Product Master/SKU | Product + Odoo + Commerce | Q-001 | `BLOCKED` | Quyết định cập nhật vào `data-ownership.md` |
| DEC-002 | Chốt nguồn giá cơ sở/price list | Pricing | Q-002 | `BLOCKED` | Ownership + write path |
| DEC-003 | Chốt nơi tính Promotion Rule | Promotion | Q-003 | `BLOCKED` | Rule ownership + calculation path |
| DEC-004 | Chốt Order system of record và thời điểm tạo đơn chính thức | Order | Q-004 | `BLOCKED` | Order lifecycle |
| DEC-005 | Chốt CMS được sửa trường Product nào | CMS/Product | Q-005 | `BLOCKED` | Field ownership matrix |
| DEC-006 | Chốt role/permission nhân sự | CMS + Odoo | Q-006 | `BLOCKED` | Role-permission matrix |
| DEC-007 | Chốt warranty key: order line/serial/lot/product | Warranty | Q-007 | `BLOCKED` | Warranty data model |
| DEC-008 | Chốt mapping Store với Warehouse | Store + Inventory | Q-008 | `BLOCKED` | Store-Warehouse relationship |
| DEC-009 | Chốt identifier dùng để liên kết MongoDB ↔ Odoo | Integration | DEC-001 | `BLOCKED` | External key/ID contract |
| DEC-010 | Chốt cơ chế sync: realtime/event/scheduled theo từng domain | Integration | DEC-001..009 | `BLOCKED` | Sync matrix Product/Stock/Price/Order/... |

## 4. Phase 1 - Database & Integration Foundation

| ID | Task | Sub-system | Dependency | Status | Output cần có |
| --- | --- | --- | --- | --- | --- |
| DATA-001 | Review/chốt canonical MongoDB schema | Backend/MongoDB | - | `REVIEW` | 15 collections, exact field/type/index trong `database-architecture.md` |
| DATA-002 | Review/chốt canonical Odoo model/table mapping | Odoo/PostgreSQL | - | `REVIEW` | Standard Odoo models + custom `bikesport_*` models/tables/fields |
| DATA-003 | Khóa cross-system identifiers | Integration | DEC-009 | `BLOCKED` | Mapping key cho Product/Variant/Store/Warehouse/Order/Warranty |
| DATA-004 | Chốt authoritative writer/read model theo domain | Architecture | DEC-001..010 | `BLOCKED` | Data ownership/write-path table |
| DATA-005 | Chốt schema change/migration governance | Architecture | DATA-001, DATA-002 | `REVIEW` | `DATA-CHG-xxx` protocol + migration/index/compatibility rule |
| INT-001 | Contract đồng bộ Product/Variant Odoo → Commerce | Integration | DATA-001..004 | `BLOCKED` | Payload + field mapping + error behavior |
| INT-002 | Contract Inventory/Availability Odoo → Commerce | Integration | DEC-008, DATA-003 | `BLOCKED` | Inventory payload/read model |
| INT-003 | Contract Pricing/Promotion | Integration | DEC-002,003 | `BLOCKED` | Price/promotion contract |
| INT-004 | Contract Order Commerce ↔ Odoo | Integration | DEC-004 | `BLOCKED` | Create/update/status contract |
| INT-005 | Contract Store/Warranty | Integration | DEC-007,008 | `BLOCKED` | Store + warranty contract |
| INT-006 | Thiết kế sync error/retry/reconciliation behavior | Integration | DEC-010 | `BLOCKED` | Dùng `sync_checkpoints` + `sync_failures` theo schema baseline |

## 5. Phase 2 - Odoo Back-office

| ID | Task | Dependency | Status | Done khi |
| --- | --- | --- | --- | --- |
| ODOO-001 | Cấu trúc role/group và quyền truy cập module | DEC-006 | `BLOCKED` | Role matrix được implement + test quyền |
| ODOO-002 | Store/Location management bằng `bikesport.store` | DEC-008, DATA-002 | `BLOCKED` | CRUD + relationship theo canonical table + validation |
| ODOO-003 | Warehouse/Location structure bằng standard Odoo stock models | DEC-008, DATA-002 | `BLOCKED` | Warehouse/location model + validation |
| ODOO-004 | Product/Variant master phía ERP | DEC-001, DATA-002 | `BLOCKED` | `product.template`/`product.product` + identifier ổn định |
| ODOO-005 | Custom stock workflow | ODOO-003,004 | `NOT_STARTED` | State flow + transition rules + test |
| ODOO-006 | Nhập kho | ODOO-003,004,005 | `NOT_STARTED` | Receipt flow dùng `stock.picking/move/move.line` pass |
| ODOO-007 | Xuất kho | ODOO-003,004,005 | `NOT_STARTED` | Delivery/issue flow pass |
| ODOO-008 | Điều chuyển kho | ODOO-003,004,005 | `NOT_STARTED` | Internal transfer flow pass |
| ODOO-009 | Reservation hàng bằng `bikesport.stock.reservation` + Odoo stock | ODOO-004,005, DATA-002 | `NOT_STARTED` | Reserve/release/insufficient stock cases pass |
| ODOO-010 | Order back-office lifecycle | DEC-004, ODOO-009 | `BLOCKED` | `sale.order` state model + stock interaction |
| ODOO-011 | Pricing/Price list | DEC-002 | `BLOCKED` | `product.pricelist`/`product.pricelist.item` theo ownership |
| ODOO-012 | Promotion rule phần thuộc Odoo | DEC-003, DATA-002 | `BLOCKED` | `bikesport.promotion.rule` nếu Odoo là owner + tests |
| ODOO-013 | Warranty bằng `bikesport.warranty.case` | DEC-007, DATA-002 | `BLOCKED` | Create/update/lookup warranty case |
| ODOO-014 | Multi-site/channel mapping bằng `bikesport.channel` | DEC-010, DATA-002 | `BLOCKED` | Website/channel mapping config |
| ODOO-015 | Integration export/event/outbox cần thiết | INT-001..005 | `BLOCKED` | Data được phát ra đúng contract; không tự thêm table ngoài schema nếu chưa có DATA-CHG |

## 6. Phase 3 - Commerce Backend + MongoDB

| ID | Task | Dependency | Status | Done khi |
| --- | --- | --- | --- | --- |
| BE-001 | Khởi tạo Commerce Backend structure/config | - | `READY` | App chạy được + config env tách biệt |
| BE-002 | Kết nối MongoDB + schema validation/index migration theo canonical schema | DATA-001 | `BLOCKED` | 15 collections validation/index migration chạy được |
| BE-003 | Product Catalog read API | BE-002, INT-001 | `BLOCKED` | `products` + `product_variants` list/detail contract pass |
| BE-004 | Flexible Product Attributes | DATA-001 | `BLOCKED` | `product_types.attribute_definitions` kiểm soát `products.attributes` |
| BE-005 | Category/Navigation data | DATA-001 | `BLOCKED` | `categories` tree/query pass |
| BE-006 | Multi-site catalog visibility/override | ODOO-014, DATA-001 | `BLOCKED` | `sites` + `product_site_overrides` shared/override đúng rule |
| BE-007 | Product sync consumer/import | INT-001 | `BLOCKED` | Upsert/idempotency/error case pass, không tạo schema mới |
| BE-008 | Inventory availability read model | INT-002 | `BLOCKED` | `inventory_read_models` cập nhật theo variant/warehouse/store |
| BE-009 | Price/Promotion read model hoặc calculation | INT-003 | `BLOCKED` | `price_read_models`/`promotion_presentations` đúng ownership/rule |
| BE-010 | Cart service | BE-003,008,009 | `BLOCKED` | `carts` add/update/remove/revalidate pass |
| BE-011 | Checkout validation | BE-010 | `BLOCKED` | Stock/price/order input được revalidate |
| BE-012 | Create Order + Odoo integration | INT-004, BE-011 | `BLOCKED` | `orders` + integration happy/failure path pass |
| BE-013 | Order status read API | INT-004 | `BLOCKED` | Customer/CMS đọc trạng thái đúng từ canonical order representation |
| BE-014 | Store API | INT-005 | `BLOCKED` | Store list/detail/availability data pass |
| BE-015 | Warranty API nếu customer/CMS cần dùng | INT-005 | `BLOCKED` | Warranty lookup/update theo scope |
| BE-016 | CMS authentication/authorization enforcement | DEC-006 | `BLOCKED` | API từ chối thao tác trái quyền |
| BE-017 | Sync error/reconciliation management | INT-006 | `BLOCKED` | `sync_checkpoints` + `sync_failures` dùng đúng schema |

## 7. Phase 4 - CMS

| ID | Task | Dependency | Status | Done khi |
| --- | --- | --- | --- | --- |
| CMS-001 | Login/session + role access | BE-016 | `BLOCKED` | Role không thấy/không gọi được chức năng cấm |
| CMS-002 | Product presentation editor | DEC-005, BE-003 | `BLOCKED` | Chỉ sửa field Commerce sở hữu trong `products`/`product_site_overrides` |
| CMS-003 | Flexible attribute editor | BE-004 | `BLOCKED` | Quản lý definition trong `product_types`, value trong `products.attributes` |
| CMS-004 | Category/navigation management | BE-005 | `BLOCKED` | CRUD `categories` + order/hierarchy pass |
| CMS-005 | Media/gallery management | DATA-001 | `BLOCKED` | Dùng `media_assets` + `products.media_ids`, không tạo collection riêng |
| CMS-006 | SEO/slug/content fields | DATA-001 | `BLOCKED` | Dùng field canonical + validation + preview/output đúng |
| CMS-007 | Multi-site content/visibility | BE-006 | `BLOCKED` | Dùng `product_site_overrides` đúng rule |
| CMS-008 | Order support view | BE-013, DEC-006 | `BLOCKED` | Nhân sự chỉ xem/thao tác theo quyền |
| CMS-009 | Store content/enrichment | BE-014 | `BLOCKED` | Không ghi đè operational fields của Odoo |
| CMS-010 | Sync error/support screen nếu cần | BE-017 | `BLOCKED` | Có thể xem lỗi và retry theo quyền |

## 8. Phase 5 - Storefront + Design System

### 8.1 Design System

| ID | Task | Dependency | Status | Done khi |
| --- | --- | --- | --- | --- |
| DS-001 | Chốt cấu trúc token Primitive/Semantic/Component | Design input | `BLOCKED` | Token schema được phê duyệt |
| DS-002 | Khai báo color/typography/spacing/radius/breakpoint tokens | DS-001 | `BLOCKED` | Không còn giá trị nền tảng nằm rải rác trong page |
| DS-003 | Base components: Button/Input/Select/Checkbox/Link/Icon | DS-002 | `BLOCKED` | State default/hover/focus/disabled/loading pass |
| DS-004 | Layout primitives: Container/Grid/Stack/Section | DS-002 | `BLOCKED` | Responsive contract dùng chung |
| DS-005 | Commerce components: ProductCard/Price/Stock/Badge/Quantity | DS-003, BE-003,008,009 | `BLOCKED` | Component contracts ổn định |

### 8.2 Storefront Features

| ID | Task | Dependency | Status | Done khi |
| --- | --- | --- | --- | --- |
| SF-001 | Storefront app shell/layout | DS-003,004 | `BLOCKED` | Header/content/footer/responsive shell pass |
| SF-002 | Product Listing/Catalog | BE-003, DS-005 | `BLOCKED` | List, pagination/filter state theo API |
| SF-003 | Product Detail | BE-003,004,008,009, DS-005 | `BLOCKED` | Attributes/price/availability hiển thị đúng |
| SF-004 | Store/location display | BE-014 | `BLOCKED` | Store info hiển thị đúng data source |
| SF-005 | Cart | BE-010 | `BLOCKED` | Add/update/remove/revalidation UI pass |
| SF-006 | Checkout | BE-011,012 | `BLOCKED` | Success + validation + integration failure states pass |
| SF-007 | Order confirmation/status | BE-013 | `BLOCKED` | Order data/status hiển thị đúng |
| SF-008 | Loading/empty/error states toàn Storefront | SF-001..007 | `BLOCKED` | Không có luồng chính thiếu state xử lý |
| SF-009 | Responsive/accessibility pass | SF-001..008 | `BLOCKED` | Có evidence test theo viewport/a11y scope |

## 9. Phase 6 - Security, Performance, Data Integrity

Các task dưới đây là task thật, không phải câu nhắc chung chung. Hiện chưa có code nên chưa task nào có thể ghi `DONE`.

### Security

| ID | Task | Scope | Dependency | Status | Evidence bắt buộc |
| --- | --- | --- | --- | --- | --- |
| SEC-001 | Review trust boundary Storefront/CMS/Backend/Odoo | Architecture | System contracts | `BLOCKED` | Threat model/review note |
| SEC-002 | Test authorization CMS/Odoo theo role matrix | CMS/Odoo/API | DEC-006 + implementation | `BLOCKED` | Permission test results |
| SEC-003 | Test input validation cho write APIs | Backend | BE write APIs | `BLOCKED` | Negative/API tests |
| SEC-004 | Review secret/config exposure | Backend/Deployment | BE-001 | `NOT_STARTED` | Config review/scan |
| SEC-005 | Review session/auth flows | CMS/Storefront | Auth implementation | `BLOCKED` | Auth test evidence |
| SEC-006 | Dependency/security scan | All code | Implementation | `BLOCKED` | Scan result |

### Performance

| ID | Task | Scope | Dependency | Status | Evidence bắt buộc |
| --- | --- | --- | --- | --- | --- |
| PERF-001 | Chốt performance budget cho Storefront/API/Sync | All | NFR target chưa có | `BLOCKED` | Target được ghi trong SRS/NFR |
| PERF-002 | Review MongoDB query pattern/index | Backend | DATA-001 + APIs | `BLOCKED` | Query/index review so với canonical indexes |
| PERF-003 | Review PostgreSQL/Odoo query hotspot | Odoo | Odoo implementation | `BLOCKED` | Query evidence |
| PERF-004 | Load test Product/List/Detail APIs | Backend | BE-003 | `BLOCKED` | Load test report |
| PERF-005 | Load test Checkout/Order | Backend/Odoo | BE-012 | `BLOCKED` | Load test report |
| PERF-006 | Storefront page performance test | Storefront | SF features | `BLOCKED` | Browser performance report |

### Data integrity / Integration

| ID | Task | Dependency | Status | Evidence bắt buộc |
| --- | --- | --- | --- | --- |
| DQ-001 | Product sync duplicate/idempotency test | INT-001, BE-007 | `BLOCKED` | Integration test |
| DQ-002 | Inventory mismatch/reconciliation test | INT-002, BE-017 | `BLOCKED` | Reconciliation result |
| DQ-003 | Order retry không tạo duplicate order | INT-004, BE-012 | `BLOCKED` | Retry/idempotency test |
| DQ-004 | Price/promotion stale-data test | INT-003, BE-009 | `BLOCKED` | Staleness/fallback test |
| DQ-005 | Cross-system identifier consistency | DATA-003 | `BLOCKED` | Mapping integrity test |
| DQ-006 | Schema drift check | DATA-001, DATA-002, implementation | `BLOCKED` | Code model/migration khớp `database-architecture.md`; không có collection/table lạ |

## 10. Phase 7 - End-to-End Acceptance

| ID | Luồng | Dependency | Status | Pass khi |
| --- | --- | --- | --- | --- |
| E2E-001 | Odoo Product → Commerce → Storefront | ODOO-004, INT-001, BE-007, SF-002/003 | `BLOCKED` | Product xuất hiện đúng và không sai ownership |
| E2E-002 | Stock/Reservation → Cart/Checkout | ODOO-009, INT-002, BE-010..012 | `BLOCKED` | Không oversell theo rule đã chốt |
| E2E-003 | Order Storefront → Commerce → Odoo | INT-004, SF-006 | `BLOCKED` | Một order duy nhất, trạng thái nhất quán |
| E2E-004 | Promotion/Price → Storefront → Order | INT-003, BE-009, SF-003/006 | `BLOCKED` | Giá hiển thị và giá order cùng rule |
| E2E-005 | CMS Product Content → Storefront | CMS-002..007, SF-002/003 | `BLOCKED` | Nội dung web cập nhật đúng site |
| E2E-006 | Store/Warranty flow | ODOO-002/013, INT-005 | `BLOCKED` | Dữ liệu xuyên hệ thống đúng ownership |

## 11. Quy tắc giao task cho agent

Khi giao task, dùng đúng ID trong file này. Ví dụ:

`Thực hiện BE-007. Chỉ thay đổi Commerce Backend và migration cần thiết theo database-architecture.md. Không thay đổi Odoo Product model, field ownership hoặc tạo collection mới. Sau khi hoàn thành cập nhật Status và Evidence của BE-007.`

Agent phải:

1. Đọc dependency của task.
2. Đọc `database-architecture.md` nếu task chạm data/API/integration.
3. Không bắt đầu task đang `BLOCKED`.
4. Không tự đổi business/data ownership để unblock mình.
5. Không tự tạo field/table/collection ngoài canonical schema.
6. Nếu cần thay schema, tạo `DATA-CHG-xxx` trước.
7. Sau khi làm xong, cập nhật `Status` + `Evidence` ngay trong task board.
8. Nếu phát sinh việc mới, thêm task ID mới thay vì nhét thêm scope vào task hiện tại.
