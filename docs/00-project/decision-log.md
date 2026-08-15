# BikeSport Decision Log

**Trạng thái:** Active

Tài liệu này là nguồn duy nhất để ghi các quyết định làm thay đổi ownership, schema, integration contract hoặc phạm vi nghiệp vụ. Không agent nào được tự suy diễn một quyết định đang `OPEN` thành `APPROVED`.

## Decision status

- `OPEN`: chưa chốt.
- `PROPOSED`: có phương án đề xuất nhưng chưa phê duyệt.
- `APPROVED`: đã chốt, implementation phải tuân theo.
- `SUPERSEDED`: bị thay bằng decision khác.

## Decision register

| ID | Chủ đề | Câu hỏi cần chốt | Phương án hiện tại | Status | Tài liệu bị ảnh hưởng |
| --- | --- | --- | --- | --- | --- |
| DEC-001 | Product Master | Odoo hay Commerce là authoritative writer cho SKU/Product Master? | Odoo nghiêng về ERP master; CMS quản presentation | OPEN | BRD, FRD, data-ownership, DB schema, INT-001 |
| DEC-002 | Pricing | Giá cơ sở/price list do Odoo hay Commerce quản? | Odoo nghiêng về price list; Commerce giữ read model | OPEN | FRD, DB schema, INT-003, checkout |
| DEC-003 | Promotion | Business promotion rule được tính ở đâu? | Tách business rule khỏi presentation | OPEN | Odoo/CMS/Backend/Storefront |
| DEC-004 | Order SoR | Order chính thức được tạo ở Commerce hay Odoo trước? | Chưa chốt | OPEN | orders collection, sale.order, INT-004 |
| DEC-005 | Product field ownership | CMS được sửa field nào? | CMS sửa web-facing fields; ERP fields read-only | OPEN | CMS SRS, DB schema, API authorization |
| DEC-006 | Staff permission | Các role và permission cụ thể là gì? | Chưa có role matrix | OPEN | Odoo, CMS, Backend, security tests |
| DEC-007 | Warranty key | Warranty gắn order line, serial/lot hay product? | Chưa chốt | OPEN | warranty schema/API/tests |
| DEC-008 | Store-Warehouse | Store và Warehouse map 1:1, 1:n hay n:n? | Chưa chốt | OPEN | Store, Inventory, Reservation |
| DEC-009 | Cross-system IDs | Identifier chuẩn giữa MongoDB và Odoo là gì? | Dùng external ID + immutable system ID, SKU cho business key nếu hợp lệ | PROPOSED | DB schema, INT-* |
| DEC-010 | Sync mechanism | Realtime/event/scheduled theo domain nào? | Chưa chốt theo từng domain | OPEN | Integration, sync tables/collections |

## Quy tắc cập nhật decision

Khi một decision chuyển `APPROVED`, cùng change phải cập nhật tối thiểu:

- `03-system/data-ownership.md` nếu ảnh hưởng ownership;
- `06-engineering/database-architecture.md` nếu ảnh hưởng schema;
- `04-integration/INT-Odoo-Commerce.md` nếu ảnh hưởng payload/flow;
- `06-engineering/project-task-board.md` để unblock/reblock task;
- `07-traceability/requirements-matrix.md` nếu trace thay đổi;
- test case liên quan nếu acceptance behavior thay đổi.
