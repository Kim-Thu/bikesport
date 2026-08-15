# FRD - BikeSport Commerce Platform

**Phiên bản:** 0.1  
**Trạng thái:** Draft

## 1. Actor và hệ thống liên quan

### Actor đã xác nhận

- Khách hàng.
- Nhân sự nội bộ sử dụng CMS/Odoo.

### Hệ thống đã xác nhận

- Storefront.
- Commerce Backend.
- CMS.
- Odoo Back-office.

## 2. Functional Requirements theo domain

### Product Catalog

| ID | Nguồn | Yêu cầu | Trạng thái |
| --- | --- | --- | --- |
| FR-001 | BR-001, BR-010 | Hệ thống phải cung cấp catalog sản phẩm cho Storefront. | Đã xác nhận |
| FR-002 | BR-010 | Hệ thống phải hỗ trợ thuộc tính sản phẩm linh hoạt theo loại sản phẩm. | Đã xác nhận |
| FR-003 | BR-002 | CMS phải cho phép nhân sự quản trị các dữ liệu hiển thị thương mại điện tử thuộc phạm vi được phân quyền. | Đã xác nhận, chi tiết TBD |

### Inventory & Warehouse

| ID | Nguồn | Yêu cầu | Trạng thái |
| --- | --- | --- | --- |
| FR-010 | BR-003 | Odoo phải hỗ trợ quản lý warehouse. | Đã xác nhận |
| FR-011 | BR-003 | Odoo phải hỗ trợ quy trình nhập kho và xuất kho custom. | Đã xác nhận |
| FR-012 | BR-003 | Odoo phải hỗ trợ stock workflow custom. | Đã xác nhận |
| FR-013 | BR-003 | Odoo phải hỗ trợ reservation hàng. | Đã xác nhận |
| FR-014 | BR-003 | Commerce phải nhận được thông tin tồn/khả dụng cần thiết từ Odoo để phục vụ bán hàng. | Giả định cần xác nhận |

### Order

| ID | Nguồn | Yêu cầu | Trạng thái |
| --- | --- | --- | --- |
| FR-020 | BR-001, BR-004 | Storefront phải cho phép khách hàng tạo đơn hàng. | Đã xác nhận |
| FR-021 | BR-004 | Commerce và Odoo phải trao đổi dữ liệu đơn hàng cần thiết cho xử lý vận hành. | Đã xác nhận ở mức khái niệm |
| FR-022 | BR-004 | Nhân sự phải có thể truy cập chức năng đơn hàng theo quyền được cấp. | Đã xác nhận ở mức khái niệm |

### Pricing & Promotion

| ID | Nguồn | Yêu cầu | Trạng thái |
| --- | --- | --- | --- |
| FR-030 | BR-007 | Hệ thống phải hỗ trợ quản lý pricing/promotion có liên quan đến Odoo. | Đã xác nhận |
| FR-031 | BR-007 | Storefront phải hiển thị giá/chương trình khuyến mãi có hiệu lực theo dữ liệu đã được hệ thống xác định. | Giả định cần xác nhận |

### Warranty

| ID | Nguồn | Yêu cầu | Trạng thái |
| --- | --- | --- | --- |
| FR-040 | BR-005 | Odoo Back-office phải hỗ trợ nghiệp vụ bảo hành. | Đã xác nhận |
| FR-041 | BR-005 | Nhân sự phải truy cập dữ liệu bảo hành theo quyền được cấp. | Đã xác nhận ở mức khái niệm |

### Store / Location

| ID | Nguồn | Yêu cầu | Trạng thái |
| --- | --- | --- | --- |
| FR-050 | BR-006 | Hệ thống phải hỗ trợ quản lý thông tin cửa hàng/địa điểm. | Đã xác nhận |
| FR-051 | BR-006 | Storefront phải có thể sử dụng dữ liệu cửa hàng cần thiết để hiển thị cho khách hàng. | Giả định cần xác nhận |

### Staff & Permission

| ID | Nguồn | Yêu cầu | Trạng thái |
| --- | --- | --- | --- |
| FR-060 | BR-008 | Hệ thống phải giới hạn chức năng và dữ liệu nhân sự có thể truy cập theo quyền được cấp. | Đã xác nhận |
| FR-061 | BR-008 | Odoo/CMS phải kiểm tra quyền trước các thao tác nghiệp vụ thuộc phạm vi quản lý của từng hệ thống. | Giả định cần xác nhận |

### Multi-site Synchronization

| ID | Nguồn | Yêu cầu | Trạng thái |
| --- | --- | --- | --- |
| FR-070 | BR-009 | Hệ thống phải hỗ trợ đồng bộ dữ liệu cần thiết cho nhiều website. | Đã xác nhận |
| FR-071 | BR-009 | Quy tắc xác định dữ liệu dùng chung và dữ liệu riêng từng website phải được cấu hình/xác định rõ. | Câu hỏi mở |

## 3. Acceptance Criteria ban đầu

### AC-FR-002-01

Given hai loại sản phẩm có bộ thuộc tính khác nhau  
When dữ liệu được lưu trong Commerce Catalog  
Then hệ thống phải cho phép biểu diễn bộ thuộc tính khác nhau mà không buộc mọi sản phẩm có cùng tập trường nghiệp vụ hiển thị.

### AC-FR-060-01

Chưa thể hoàn thiện vì chưa có danh sách role và permission cụ thể. Liên kết `Q-006`.

## 4. Câu hỏi mở

Các câu hỏi `Q-001` đến `Q-008` trong BRD là đầu vào bắt buộc để chi tiết hóa FRD, đặc biệt Product, Pricing, Order, Warranty và Authorization.
