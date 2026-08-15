# BRD - BikeSport Commerce Platform

**Phiên bản:** 0.1  
**Trạng thái:** Draft  
**Ngày:** 2026-08-15

## 1. Bối cảnh

### Đã xác nhận

BikeSport là một hệ thống bán hàng có:

- Storefront cho khách hàng.
- CMS và Commerce Backend riêng.
- Odoo riêng cho nghiệp vụ back-office.
- Commerce/CMS sử dụng MongoDB cho dữ liệu có cấu trúc linh hoạt, đặc biệt thuộc tính sản phẩm.
- Odoo sử dụng PostgreSQL.
- Odoo không chỉ quản lý tồn kho mà còn có nhiều nghiệp vụ custom: stock workflow, warehouse, nhập/xuất kho, reservation, promotion/pricing, đồng bộ nhiều website, phân quyền nhân sự, đơn hàng, bảo hành và địa chỉ/cửa hàng.

## 2. Mục tiêu nghiệp vụ

| ID | Mục tiêu | Trạng thái |
| --- | --- | --- |
| BO-001 | Cung cấp một nền tảng bán hàng thống nhất giữa kênh online và hoạt động vận hành nội bộ. | Đã xác nhận |
| BO-002 | Cho phép dữ liệu thương mại điện tử linh hoạt mà không buộc toàn bộ dữ liệu hiển thị web vào mô hình ERP. | Đã xác nhận |
| BO-003 | Giảm xung đột dữ liệu giữa Commerce và Odoo bằng cách xác định rõ hệ thống sở hữu từng nhóm dữ liệu. | Giả định cần xác nhận |
| BO-004 | Hỗ trợ nhiều website/kênh bán hàng dùng chung dữ liệu vận hành phù hợp. | Đã xác nhận |

## 3. Phạm vi

### In scope

- Product catalog.
- Pricing và promotion.
- Inventory, warehouse, stock movement và reservation.
- Order management và fulfillment liên quan.
- Warranty.
- Store/location.
- CMS content.
- Nhân sự và quyền truy cập phần back-office.
- Đồng bộ dữ liệu giữa Commerce và Odoo.
- Nhiều website/kênh bán hàng.

### Out of scope

Chưa có dữ kiện để xác nhận các nội dung sau:

- Kế toán/tài chính đầy đủ.
- HR/payroll.
- Procurement nâng cao.
- CRM đầy đủ.
- Marketplace integration.
- Mobile application.

Các mục trên không được coi là cam kết cho đến khi được xác nhận.

## 4. Business Requirements

| ID | Yêu cầu nghiệp vụ | Ưu tiên | Trạng thái |
| --- | --- | --- | --- |
| BR-001 | Nền tảng phải cho phép khách hàng duyệt và mua sản phẩm qua Storefront. | Must | Đã xác nhận |
| BR-002 | Nền tảng phải cho phép nhân sự quản trị nội dung và dữ liệu thương mại điện tử qua CMS. | Must | Đã xác nhận |
| BR-003 | Nền tảng phải hỗ trợ quản lý kho, warehouse, nhập/xuất và reservation trong Odoo Back-office. | Must | Đã xác nhận |
| BR-004 | Nền tảng phải hỗ trợ quản lý đơn hàng xuyên giữa Commerce và Odoo. | Must | Đã xác nhận |
| BR-005 | Nền tảng phải hỗ trợ nghiệp vụ bảo hành. | Must | Đã xác nhận |
| BR-006 | Nền tảng phải hỗ trợ quản lý cửa hàng/địa điểm. | Must | Đã xác nhận |
| BR-007 | Nền tảng phải hỗ trợ promotion/pricing có liên quan đến Odoo và Commerce. | Must | Đã xác nhận |
| BR-008 | Nền tảng phải hỗ trợ phân quyền nhân sự theo phần nghiệp vụ được phép truy cập. | Must | Đã xác nhận |
| BR-009 | Nền tảng phải hỗ trợ đồng bộ dữ liệu phục vụ nhiều website. | Must | Đã xác nhận |
| BR-010 | Dữ liệu sản phẩm phục vụ website phải hỗ trợ thuộc tính linh hoạt. | Must | Đã xác nhận |

## 5. Business Rules cần chốt

| ID | Nội dung | Trạng thái |
| --- | --- | --- |
| RULE-001 | Mỗi nhóm dữ liệu nghiệp vụ phải có một system of record/source of truth được xác định. | Giả định cần xác nhận |
| RULE-002 | Một dữ liệu không nên được sửa độc lập ở nhiều hệ thống nếu không có quy tắc đồng bộ/xung đột rõ ràng. | Giả định cần xác nhận |
| RULE-003 | Quyền truy cập của nhân sự phải được xác định theo vai trò/nghiệp vụ, không suy ra chỉ từ chức danh. | Câu hỏi mở |

## 6. Câu hỏi mở

| ID | Câu hỏi | Ảnh hưởng |
| --- | --- | --- |
| Q-001 | Hệ thống nào là source of truth cho Product Master/SKU? | Data ownership, integration |
| Q-002 | Giá gốc, price list và giá bán cuối cùng do Odoo hay Commerce sở hữu? | Pricing |
| Q-003 | Promotion rule được tính ở Odoo, Commerce Backend hay cả hai theo loại chương trình? | Promotion, order |
| Q-004 | Order được tạo chính thức ở Commerce trước hay Odoo trước? | Order lifecycle |
| Q-005 | CMS được phép sửa những trường nào của sản phẩm? | Product ownership |
| Q-006 | Nhân sự có những role nào và từng role được xem/sửa/phê duyệt gì? | Authorization |
| Q-007 | Warranty gắn với order line, serial/lot hay sản phẩm theo chính sách nào? | Warranty data model |
| Q-008 | Store/location có liên hệ trực tiếp với warehouse hay có thể tách rời? | Store/warehouse mapping |
