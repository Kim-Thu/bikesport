# SRS - Storefront

**Phiên bản:** 0.1  
**Trạng thái:** Draft

## 1. Mục đích

Mô tả yêu cầu phần mềm cho Storefront BikeSport - giao diện khách hàng dùng để duyệt sản phẩm và thực hiện hành vi mua sắm.

## 2. Phạm vi đã xác nhận

- Hiển thị catalog sản phẩm.
- Hiển thị dữ liệu sản phẩm có thuộc tính linh hoạt.
- Cho phép khách hàng tạo đơn hàng.
- Sử dụng dữ liệu từ Commerce Backend thay vì truy cập trực tiếp Odoo/PostgreSQL.

## 3. Functional Requirements

| ID | Nguồn | Requirement | Trạng thái |
| --- | --- | --- | --- |
| SF-FR-001 | FR-001 | Storefront phải hiển thị danh sách và thông tin sản phẩm do Commerce Backend cung cấp. | Đã xác nhận ở mức hệ thống |
| SF-FR-002 | FR-002 | Storefront phải có khả năng render bộ thuộc tính khác nhau giữa các loại sản phẩm. | Đã xác nhận |
| SF-FR-003 | FR-020 | Storefront phải cho phép khách hàng tạo đơn hàng. | Đã xác nhận |
| SF-FR-004 | FR-014 | Storefront phải hiển thị trạng thái khả dụng/tồn có ý nghĩa với khách hàng khi Commerce Backend cung cấp dữ liệu này. | Giả định cần xác nhận |
| SF-FR-005 | FR-031 | Storefront phải hiển thị giá và promotion có hiệu lực do Commerce Backend trả về. | Giả định cần xác nhận |
| SF-FR-006 | FR-051 | Storefront phải hiển thị thông tin cửa hàng/địa điểm khi có trong phạm vi release. | Giả định cần xác nhận |

## 4. Interface Requirements

| ID | Interface | Requirement | Trạng thái |
| --- | --- | --- | --- |
| SF-IR-001 | Storefront -> Commerce Backend | Storefront phải lấy dữ liệu commerce qua API/interface của Commerce Backend. | Giả định cần xác nhận |
| SF-IR-002 | Storefront -> Odoo | Storefront không truy cập trực tiếp Odoo trong mô hình hiện tại. | Phương án đề xuất |

## 5. Data Requirements

| ID | Requirement | Trạng thái |
| --- | --- | --- |
| SF-DR-001 | Product response phải hỗ trợ dữ liệu thuộc tính linh hoạt theo loại sản phẩm. | Đã xác nhận |
| SF-DR-002 | Storefront không được coi dữ liệu local/client là source of truth cho stock, price hoặc order status. | Giả định cần xác nhận |

## 6. Non-functional Requirements

Chưa có dữ kiện định lượng về performance, availability, browser support, accessibility, SEO target hoặc traffic. Không tự đặt ngưỡng.

## 7. Open Questions

- Q-SF-001: Có checkout guest hay bắt buộc account?
- Q-SF-002: Payment method/payment gateway nào thuộc scope?
- Q-SF-003: Search/filter/sort cụ thể theo catalog nào?
- Q-SF-004: Tồn kho hiển thị số lượng thật hay chỉ trạng thái còn/hết?
- Q-SF-005: Có chọn store/warehouse khi mua hàng không?
