# SRS - Odoo Back-office

**Phiên bản:** 0.1  
**Trạng thái:** Draft

## 1. Mục đích

Odoo Back-office là hệ thống nội bộ phục vụ các nghiệp vụ vận hành BikeSport. Odoo không chỉ là kho mà là một subsystem nghiệp vụ lớn, có nhiều chức năng custom và tích hợp với Commerce Platform.

## 2. Phạm vi đã xác nhận

- Custom stock workflow.
- Warehouse.
- Nhập/xuất kho riêng.
- Reservation hàng.
- Custom promotion/pricing.
- Đồng bộ nhiều website.
- Phân quyền nhân sự theo phần được phép truy cập.
- Đơn hàng.
- Bảo hành.
- Địa chỉ/cửa hàng.
- PostgreSQL là database của Odoo.

## 3. Functional Requirements

### Inventory & Warehouse

| ID | Nguồn | Requirement | Trạng thái |
| --- | --- | --- | --- |
| OD-FR-001 | FR-010 | Odoo phải hỗ trợ quản lý warehouse. | Đã xác nhận |
| OD-FR-002 | FR-011 | Odoo phải hỗ trợ nghiệp vụ nhập kho custom. | Đã xác nhận |
| OD-FR-003 | FR-011 | Odoo phải hỗ trợ nghiệp vụ xuất kho custom. | Đã xác nhận |
| OD-FR-004 | FR-012 | Odoo phải hỗ trợ stock workflow custom. | Đã xác nhận |
| OD-FR-005 | FR-013 | Odoo phải hỗ trợ reservation hàng. | Đã xác nhận |

### Order

| ID | Nguồn | Requirement | Trạng thái |
| --- | --- | --- | --- |
| OD-FR-010 | FR-021 | Odoo phải nhận/trao đổi dữ liệu đơn hàng với Commerce theo integration được chốt. | Đã xác nhận ở mức khái niệm |
| OD-FR-011 | FR-022 | Odoo phải giới hạn quyền truy cập đơn hàng theo quyền nhân sự. | Đã xác nhận ở mức khái niệm |

### Pricing & Promotion

| ID | Nguồn | Requirement | Trạng thái |
| --- | --- | --- | --- |
| OD-FR-020 | FR-030 | Odoo phải hỗ trợ custom pricing/promotion thuộc phạm vi back-office. | Đã xác nhận |
| OD-FR-021 | FR-031 | Odoo phải cung cấp dữ liệu/rule cần thiết cho Commerce nếu Odoo được chốt là owner của loại pricing/promotion tương ứng. | Câu hỏi mở Q-002/Q-003 |

### Warranty

| ID | Nguồn | Requirement | Trạng thái |
| --- | --- | --- | --- |
| OD-FR-030 | FR-040 | Odoo phải hỗ trợ nghiệp vụ bảo hành. | Đã xác nhận |
| OD-FR-031 | FR-041 | Odoo phải kiểm soát truy cập dữ liệu/chức năng bảo hành theo quyền nhân sự. | Đã xác nhận ở mức khái niệm |

### Store / Location

| ID | Nguồn | Requirement | Trạng thái |
| --- | --- | --- | --- |
| OD-FR-040 | FR-050 | Odoo phải hỗ trợ quản lý dữ liệu cửa hàng/địa điểm thuộc phạm vi back-office. | Đã xác nhận ở mức khái niệm |

### Staff & Permission

| ID | Nguồn | Requirement | Trạng thái |
| --- | --- | --- | --- |
| OD-FR-050 | FR-060 | Odoo phải giới hạn menu, chức năng và dữ liệu theo quyền được cấp cho nhân sự. | Đã xác nhận |
| OD-FR-051 | FR-060 | Các thao tác nhạy cảm phải được đặc tả theo role/permission cụ thể trước khi nghiệm thu. | Câu hỏi mở Q-006 |

### Multi-site Synchronization

| ID | Nguồn | Requirement | Trạng thái |
| --- | --- | --- | --- |
| OD-FR-060 | FR-070 | Odoo phải hỗ trợ cung cấp/nhận dữ liệu cần thiết cho nhiều website. | Đã xác nhận |

## 4. Data Requirements

- PostgreSQL là persistence layer của Odoo - `Đã xác nhận`.
- Schema/model cụ thể chưa được cung cấp; tài liệu này không tự thiết kế bảng/model.
- Cần xác định identifier dùng liên kết entity Odoo với Commerce.
- Cần xác định audit/history cho stock, order, pricing, warranty và permission nếu business yêu cầu.

## 5. External Interface

Chi tiết Odoo - Commerce nằm tại `../04-integration/INT-Odoo-Commerce.md`.

## 6. Non-functional Requirements

Chưa có số liệu về concurrency, response time, availability, backup, recovery, audit retention hoặc security policy. Các mục này là TBD.

## 7. Open Questions

- Q-OD-001: Danh sách custom module Odoo hiện có/dự kiến?
- Q-OD-002: Stock workflow có những state và transition nào?
- Q-OD-003: Reservation được tạo/hủy theo sự kiện nào?
- Q-OD-004: Order state trong Odoo và Commerce mapping ra sao?
- Q-OD-005: Warranty workflow và điều kiện hợp lệ là gì?
- Q-OD-006: Store có mapping 1-1, 1-n hay độc lập với warehouse?
- Q-OD-007: Role/permission matrix cụ thể?
