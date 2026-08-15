# BikeSport Product Backlog

**Trạng thái:** Draft  
**Mục tiêu:** backlog cấp sản phẩm dùng cho PO/PM/agent. Đây là danh sách capability phải triển khai và theo dõi, không thay thế task board kỹ thuật.

## 1. Priority convention

- `P0` - bắt buộc để hệ thống có thể vận hành end-to-end.
- `P1` - quan trọng cho vận hành/khả năng quản trị.
- `P2` - cải thiện trải nghiệm hoặc vận hành sau khi P0/P1 ổn định.

## 2. Capability backlog

| Epic | Capability | Priority | Requirement | Delivery task | Acceptance outcome | Status |
| --- | --- | --- | --- | --- | --- | --- |
| EP-PROD | Product Catalog | P0 | FR-001, FR-002, FR-003 | BE-003, BE-004, CMS-002, CMS-003, SF-002, SF-003 | Sản phẩm/variant/thuộc tính linh hoạt hiển thị đúng và CMS chỉ sửa field thuộc quyền Commerce | BLOCKED |
| EP-INV | Inventory | P0 | FR-010..014 | ODOO-003..009, INT-002, BE-008 | Tồn/khả dụng và reservation nhất quán, không dùng Mongo read model làm stock transaction | BLOCKED |
| EP-ORD | Order | P0 | FR-020..022 | ODOO-010, INT-004, BE-010..013, SF-005..007 | Khách đặt được một đơn duy nhất, order và reservation nhất quán xuyên hệ thống | BLOCKED |
| EP-PRICE | Pricing | P0 | FR-030, FR-031 | ODOO-011, INT-003, BE-009, SF-003/006 | Giá hiển thị và giá order theo cùng rule/ownership | BLOCKED |
| EP-PROMO | Promotion | P1 | FR-030, FR-031 | ODOO-012, INT-003, BE-009, CMS presentation task, SF display | Promotion rule và presentation không bị trùng quyền ghi | BLOCKED |
| EP-STORE | Store/Location | P1 | FR-050, FR-051 | ODOO-002, INT-005, BE-014, CMS-009, SF-004 | Store hiển thị đúng dữ liệu operational và content enrichment | BLOCKED |
| EP-WAR | Warranty | P1 | FR-040, FR-041 | ODOO-013, INT-005, BE-015 | Tra cứu/xử lý warranty theo key đã chốt và đúng permission | BLOCKED |
| EP-AUTH | Staff Permission | P0 | FR-060, FR-061 | ODOO-001, BE-016, CMS-001, SEC-002 | Nhân sự chỉ xem/sửa/phê duyệt đúng scope | BLOCKED |
| EP-MS | Multi-site | P1 | FR-070, FR-071 | ODOO-014, BE-006, CMS-007 | Dữ liệu shared/override giữa website tuân theo rule | BLOCKED |
| EP-DS | Storefront Design System | P0 | SRS Storefront | DS-001..005 | Storefront dùng token/component canonical, không hard-code pattern riêng từng trang | BLOCKED |
| EP-QUAL | Quality Hardening | P0 | NFR/SRS | SEC-*, PERF-*, DQ-* | Có evidence security/performance/data integrity trước release | BLOCKED |

## 3. MVP gate

MVP chưa được đánh dấu `Ready for UAT` nếu các capability P0 sau chưa có evidence:

- Product Catalog;
- Inventory + Reservation;
- Pricing;
- Cart + Checkout + Order;
- Staff Permission cho phần vận hành liên quan;
- Storefront Design System foundation;
- Security tối thiểu cho authentication/authorization/write API;
- Data integrity cho Product/Inventory/Order;
- E2E-001 đến E2E-004.

## 4. Quy tắc thay đổi backlog

Mọi capability mới phải có:

1. Epic/capability ID;
2. business/functional requirement cha hoặc decision được chấp thuận;
3. priority;
4. owner subsystem;
5. acceptance outcome;
6. task implementation;
7. test/evidence dự kiến.
