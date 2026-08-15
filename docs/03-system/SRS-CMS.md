# SRS - CMS

**Phiên bản:** 0.1  
**Trạng thái:** Draft

## 1. Mục đích

CMS là hệ thống cho nhân sự nội bộ quản trị dữ liệu và nội dung phục vụ kênh thương mại điện tử.

## 2. Phạm vi đã xác nhận

- CMS tồn tại độc lập với Odoo.
- CMS/Commerce sử dụng MongoDB.
- CMS có liên quan đến quản trị dữ liệu sản phẩm và nội dung web.
- Nhân sự cần được giới hạn quyền truy cập theo phần nghiệp vụ.

## 3. Functional Requirements

| ID | Nguồn | Requirement | Trạng thái |
| --- | --- | --- | --- |
| CMS-FR-001 | FR-003 | CMS phải cho phép nhân sự quản trị dữ liệu commerce thuộc phạm vi được cấp quyền. | Đã xác nhận ở mức khái niệm |
| CMS-FR-002 | FR-002 | CMS phải hỗ trợ quản trị thuộc tính sản phẩm linh hoạt phục vụ website. | Đã xác nhận |
| CMS-FR-003 | BR-002 | CMS phải hỗ trợ quản trị nội dung Storefront. | Đã xác nhận ở mức khái niệm |
| CMS-FR-004 | FR-060 | CMS phải hạn chế chức năng và dữ liệu theo quyền của nhân sự. | Đã xác nhận |
| CMS-FR-005 | FR-070 | CMS phải hỗ trợ dữ liệu/nội dung cho nhiều website khi thuộc phạm vi quản trị của CMS. | Đã xác nhận ở mức khái niệm |

## 4. Boundary với Odoo

CMS không nên trở thành bản sao đầy đủ của Odoo Back-office. Những chức năng có vẻ trùng như Product, Pricing, Promotion, Order, Store phải được tách theo ownership dữ liệu và mục tiêu sử dụng.

Ví dụ chưa phê duyệt:

- Odoo quản lý stock, warehouse, reservation và dữ liệu vận hành.
- CMS quản lý nội dung hiển thị, SEO, media và thuộc tính web.
- Nếu CMS hiển thị order/warranty thì quyền ghi phải được định nghĩa rõ, không mặc định cho phép sửa dữ liệu Odoo.

## 5. Data Requirements

| ID | Requirement | Trạng thái |
| --- | --- | --- |
| CMS-DR-001 | CMS phải hỗ trợ schema linh hoạt cho thuộc tính sản phẩm phục vụ website. | Đã xác nhận |
| CMS-DR-002 | CMS phải phân biệt field do CMS sở hữu và field chỉ đồng bộ/đọc từ Odoo. | Giả định cần xác nhận |
| CMS-DR-003 | Nếu nội dung khác nhau theo website, dữ liệu phải có thông tin xác định website/scope áp dụng. | Giả định cần xác nhận |

## 6. Authorization - cần elicitation

Chưa có danh sách role cụ thể. Cần lập ma trận quyền cho tối thiểu các domain:

- Product/catalog.
- Content/banner/blog.
- Pricing/promotion.
- Order.
- Warranty.
- Store/location.
- User/permission administration.

Không tự suy ra quyền từ tên chức danh.

## 7. Open Questions

- Q-CMS-001: CMS được phép tạo Product mới hay chỉ enrich Product từ Odoo?
- Q-CMS-002: CMS có được sửa giá/promotion rule hay chỉ phần trình bày?
- Q-CMS-003: CMS có màn hình order/warranty không? Nếu có, read-only hay có thao tác nghiệp vụ?
- Q-CMS-004: Ai quản lý user/role CMS?
- Q-CMS-005: Nội dung có workflow draft/review/publish không?
