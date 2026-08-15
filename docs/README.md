# BikeSport Requirements Documentation

**Trạng thái:** Draft  
**Nhánh:** `docs/T001-requirements-20260815-0955`  
**Nguồn đầu vào:** trao đổi yêu cầu ngày 2026-08-15.

## Mục tiêu

Bộ tài liệu này mô tả BikeSport như một nền tảng thương mại điện tử gồm nhiều hệ thống con, thay vì coi Frontend, Backend, CMS và Odoo là các dự án độc lập.

## Cấu trúc

- `01-business/BRD.md`: mục tiêu, phạm vi và yêu cầu nghiệp vụ cấp cao.
- `02-functional/FRD.md`: năng lực chức năng theo domain nghiệp vụ.
- `03-system/system-context.md`: ranh giới và quan hệ giữa các hệ thống.
- `03-system/data-ownership.md`: ma trận dữ liệu và source of truth cần xác nhận.
- `03-system/SRS-Storefront.md`: yêu cầu phần mềm Storefront.
- `03-system/SRS-Commerce-Backend.md`: yêu cầu Commerce Backend.
- `03-system/SRS-CMS.md`: yêu cầu CMS.
- `03-system/SRS-Odoo-Backoffice.md`: yêu cầu Odoo Back-office.
- `04-integration/INT-Odoo-Commerce.md`: tích hợp Commerce - Odoo.
- `05-process-flows/FLOW-001-order-to-fulfillment.md`: luồng đặt hàng xuyên hệ thống ban đầu.
- `07-traceability/requirements-matrix.md`: ma trận truy vết ban đầu.

## Quy tắc tài liệu

- Chỉ dữ kiện người dùng đã nêu rõ mới được ghi là `Đã xác nhận`.
- Các quyết định kiến trúc/nghiệp vụ chưa chốt được ghi `Giả định cần xác nhận` hoặc `Câu hỏi mở`.
- BRD/FRD đi theo nghiệp vụ; SRS đi theo ranh giới phần mềm.
- Database không quyết định ranh giới nghiệp vụ. MongoDB và PostgreSQL có thể cùng tồn tại nếu ownership dữ liệu rõ ràng.
