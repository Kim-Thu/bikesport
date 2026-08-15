# BikeSport Core Test Cases

**Phiên bản:** 0.1  
**Trạng thái:** Draft

Mỗi test case có requirement/use case/task cha. Test chưa thể chạy vì implementation chưa có được giữ `BLOCKED` hoặc `NOT RUN`, không ghi `PASS`.

## Product Catalog

| ID | Requirement/UC | Scenario | Expected result | Task | Status |
| --- | --- | --- | --- | --- | --- |
| TC-CAT-001 | FR-001 / UC-CAT-001 | Mở product đang published và visible cho site | Product trả đúng data, không 404 | BE-003, SF-003 | NOT RUN |
| TC-CAT-002 | FR-002 / UC-CAT-001 | Hai product type có attribute set khác nhau | Cả hai lưu/query/render được theo definition tương ứng | BE-004, CMS-003, SF-003 | NOT RUN |
| TC-CAT-003 | FR-003 / UC-CAT-001 | CMS sửa web-owned field | Field được cập nhật; ERP-owned field không bị thay đổi | CMS-002, BE auth | BLOCKED DEC-005 |
| TC-CAT-004 | FR-070 / UC-CAT-001 | Product chỉ visible ở Site A | Site A thấy, Site B không thấy | BE-006, CMS-007 | BLOCKED |

## Inventory / Warehouse

| ID | Requirement/UC | Scenario | Expected result | Task | Status |
| --- | --- | --- | --- | --- | --- |
| TC-INV-001 | FR-011 / UC-INV-001 | Nhập kho hợp lệ | Stock movement hoàn tất, quantity cập nhật đúng | ODOO-006 | NOT RUN |
| TC-INV-002 | FR-011 | Nhập quantity <= 0 | Bị từ chối bởi validation | ODOO-006 | NOT RUN |
| TC-INV-003 | FR-012 | Điều chuyển location hợp lệ | Source giảm, destination tăng, trace movement đầy đủ | ODOO-008 | NOT RUN |
| TC-INV-004 | FR-060 | User không có quyền kho thử xác nhận nhập | Bị từ chối server-side | ODOO-001, SEC-002 | BLOCKED DEC-006 |
| TC-INV-005 | FR-014 | Inventory update sync sang Commerce | `inventory_read_models` phản ánh availability mới mà không tạo stock transaction ở Mongo | INT-002, BE-008 | BLOCKED |

## Reservation

| ID | Requirement/UC | Scenario | Expected result | Task | Status |
| --- | --- | --- | --- | --- | --- |
| TC-RES-001 | FR-013 / UC-RES-001 | Reserve khi đủ stock | Tạo đúng 1 reservation active | ODOO-009 | NOT RUN |
| TC-RES-002 | FR-013 | Reserve vượt available | Từ chối, không tạo reservation thành công | ODOO-009 | NOT RUN |
| TC-RES-003 | FR-013 | Release reservation | Reservation chuyển state đúng và quantity khả dụng được trả lại | ODOO-009 | NOT RUN |
| TC-RES-004 | FR-013 | Gửi lại cùng request/idempotency context | Không tạo duplicate reservation | INT-004, ODOO-009 | BLOCKED DEC-004/010 |
| TC-RES-005 | FR-013 | Reservation hết hạn | Release/expire theo state rule đã phê duyệt | ODOO-009 | BLOCKED - expiration rule chưa chốt |
| TC-RES-006 | FR-021 | Integration timeout sau khi Odoo đã reserve | Retry xác định được kết quả cũ, không reserve lần hai | INT-004, BE-012 | BLOCKED |

## Pricing / Promotion

| ID | Requirement/UC | Scenario | Expected result | Task | Status |
| --- | --- | --- | --- | --- | --- |
| TC-PRICE-001 | FR-031 / UC-PRICE-001 | Product có base price, không promo | Storefront hiển thị đúng selling price | BE-009, SF-003 | BLOCKED DEC-002 |
| TC-PRICE-002 | FR-030 | Promotion đang hiệu lực | Giá/presentation theo rule authority đã chốt | ODOO-012, BE-009 | BLOCKED DEC-003 |
| TC-PRICE-003 | FR-030 | Promotion hết hạn | Không còn được áp dụng | ODOO-012, BE-009 | BLOCKED DEC-003 |
| TC-PRICE-004 | FR-031 | Giá thay đổi sau khi add cart | Checkout revalidate và phản hồi theo rule | BE-010, BE-011 | BLOCKED |
| TC-PRICE-005 | FR-031 | Read model stale | Behavior đúng fallback/staleness rule | BE-009, DQ-004 | BLOCKED DEC-010 |
| TC-PRICE-006 | FR-031 | Product Detail và Order cùng variant/context | Giá cuối cùng nhất quán theo cùng authority | E2E-004 | BLOCKED |

## Order

| ID | Requirement/UC | Scenario | Expected result | Task | Status |
| --- | --- | --- | --- | --- | --- |
| TC-ORD-001 | FR-020 / UC-ORD-001 | Checkout hợp lệ | Tạo đúng một order chính thức | BE-012, ODOO-010 | BLOCKED DEC-004 |
| TC-ORD-002 | FR-020 | Checkout thiếu field bắt buộc | Không tạo order | BE-011 | BLOCKED |
| TC-ORD-003 | FR-021 | Stock hết trước create order | Revalidation fail, không xác nhận sai | BE-011, ODOO-009 | BLOCKED |
| TC-ORD-004 | FR-021 | Create order request gửi hai lần | Chỉ có một order business transaction | BE-012, INT-004 | BLOCKED DEC-004/010 |
| TC-ORD-005 | FR-021 | Odoo unavailable | Integration status/error được lưu và có thể retry/reconcile | BE-012, BE-017 | BLOCKED |
| TC-ORD-006 | FR-021 | Order status thay đổi back-office | Storefront/CMS đọc trạng thái mới đúng contract | ODOO-010, BE-013 | BLOCKED |
| TC-ORD-007 | FR-022 | Staff trái quyền đọc order restricted | Bị từ chối | CMS-008, BE-016 | BLOCKED DEC-006 |
| TC-ORD-008 | FR-021 | Cancel order có reservation | Reservation được release theo business rule | ODOO-009/010 | BLOCKED - cancel rule TBD |

## Warranty

| ID | Requirement/UC | Scenario | Expected result | Task | Status |
| --- | --- | --- | --- | --- | --- |
| TC-WAR-001 | FR-040 / UC-WAR-001 | Tạo warranty với valid reference | Case được tạo và liên kết đúng key | ODOO-013 | BLOCKED DEC-007 |
| TC-WAR-002 | FR-040 | Reference không hợp lệ | Bị từ chối | ODOO-013 | BLOCKED DEC-007 |
| TC-WAR-003 | FR-041 | User có quyền xem warranty | Trả dữ liệu trong scope | BE-015 | BLOCKED DEC-006 |
| TC-WAR-004 | FR-041 | User không có quyền | Bị từ chối server-side | ODOO-001, BE-016 | BLOCKED DEC-006 |
| TC-WAR-005 | FR-040 | Update status warranty | State transition tuân theo rule đã chốt | ODOO-013 | BLOCKED - state rule TBD |

## Authorization

| ID | Requirement/UC | Scenario | Expected result | Task | Status |
| --- | --- | --- | --- | --- | --- |
| TC-AUTH-001 | FR-060 / UC-AUTH-001 | User không có module permission | Không truy cập module/action | ODOO-001, CMS-001 | BLOCKED DEC-006 |
| TC-AUTH-002 | FR-061 | Gọi API write trực tiếp dù UI đã ẩn | API vẫn từ chối | BE-016 | BLOCKED DEC-006 |
| TC-AUTH-003 | FR-061 | Role chỉ read gọi update | HTTP/domain error phù hợp, không thay dữ liệu | BE-016 | BLOCKED DEC-006 |
| TC-AUTH-004 | FR-061 | Role được phép update | Update thành công trong field scope | BE-016 | BLOCKED DEC-006 |
| TC-AUTH-005 | FR-061 | CMS gửi ERP-owned field | Bị ignore/reject theo contract, không đổi authoritative data | CMS-002, BE-016 | BLOCKED DEC-005 |
| TC-AUTH-006 | FR-060 | Odoo record rule giới hạn data scope | User không đọc record ngoài scope | ODOO-001 | BLOCKED DEC-006 |
| TC-AUTH-007 | FR-060 | Session hết hạn | Không tiếp tục action bảo vệ | CMS-001 | BLOCKED |
| TC-AUTH-008 | FR-060 | User bị disable | Session/API không tiếp tục được theo auth rule | CMS-001, BE-016 | BLOCKED |
