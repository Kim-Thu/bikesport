# SRS - Commerce Backend

**Phiên bản:** 0.1  
**Trạng thái:** Draft

## 1. Mục đích

Commerce Backend cung cấp lớp nghiệp vụ/API cho Storefront và CMS, lưu dữ liệu commerce trong MongoDB và tích hợp với Odoo Back-office.

## 2. Phạm vi ban đầu

- Product catalog phục vụ website.
- Dữ liệu thuộc tính sản phẩm linh hoạt.
- API cho Storefront/CMS.
- Order integration.
- Inventory/availability integration.
- Pricing/promotion integration.
- Multi-site data synchronization.

## 3. Functional Requirements

| ID | Nguồn | Requirement | Trạng thái |
| --- | --- | --- | --- |
| BE-FR-001 | FR-001, FR-002 | Backend phải cung cấp dữ liệu catalog và thuộc tính linh hoạt cho Storefront. | Đã xác nhận ở mức khái niệm |
| BE-FR-002 | FR-003 | Backend phải hỗ trợ CMS đọc/ghi dữ liệu commerce thuộc phạm vi CMS được phép quản lý. | Giả định cần xác nhận |
| BE-FR-003 | FR-014 | Backend phải nhận hoặc truy vấn dữ liệu tồn/khả dụng từ Odoo theo cơ chế integration được chốt. | Giả định cần xác nhận |
| BE-FR-004 | FR-021 | Backend phải trao đổi dữ liệu đơn hàng với Odoo. | Đã xác nhận ở mức khái niệm |
| BE-FR-005 | FR-031 | Backend phải cung cấp giá/promotion có hiệu lực cho Storefront. | Giả định cần xác nhận |
| BE-FR-006 | FR-070 | Backend phải hỗ trợ dữ liệu cho nhiều website theo quy tắc dữ liệu dùng chung/riêng được xác định. | Đã xác nhận ở mức khái niệm |

## 4. Data Requirements

| ID | Requirement | Trạng thái |
| --- | --- | --- |
| BE-DR-001 | MongoDB phải hỗ trợ lưu representation của product catalog với bộ thuộc tính linh hoạt. | Đã xác nhận |
| BE-DR-002 | Entity được đồng bộ với Odoo phải có identifier liên kết ổn định. | Giả định cần xác nhận |
| BE-DR-003 | Các field do Odoo sở hữu không được ghi đè từ Commerce nếu chưa có quy tắc ownership cho phép. | Giả định cần xác nhận |

## 5. Integration Requirements

Chi tiết tại `../04-integration/INT-Odoo-Commerce.md`.

Các điểm bắt buộc phải chốt trước implementation:

- source/target của từng entity;
- trigger/lịch đồng bộ;
- mapping field;
- auth;
- sync/async;
- duplicate/idempotency;
- timeout/retry;
- lỗi một phía;
- logging/audit/reconciliation;
- versioning.

## 6. Non-functional Requirements

Chưa có số liệu về tải, latency, availability, retention, recovery hoặc security threshold. Các NFR này đang để TBD thay vì tự đặt số.

## 7. Open Questions

- Q-BE-001: Backend hiện tại dùng stack/framework nào?
- Q-BE-002: CMS và Storefront dùng chung API hay API surface riêng?
- Q-BE-003: Đồng bộ Odoo chạy webhook/event/polling/cron hay kết hợp?
- Q-BE-004: Có cần cache stock/price không? Nếu có, độ trễ chấp nhận là bao nhiêu?
- Q-BE-005: Multi-site dùng chung một catalog hay mỗi site có catalog/override riêng?
