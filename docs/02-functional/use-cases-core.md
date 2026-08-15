# BikeSport Core Use Cases

**Phiên bản:** 0.1  
**Trạng thái:** Draft

Tài liệu này chỉ mô tả các use case có business goal độc lập. CRUD nhỏ, click UI hoặc thao tác kỹ thuật nội bộ không tách thành use case riêng nếu không có mục tiêu nghiệp vụ độc lập.

---

## UC-CAT-001 - Khách hàng xem sản phẩm

**Actor chính:** Khách hàng  
**Requirement:** FR-001, FR-002  
**Hệ thống:** Storefront, Commerce Backend, MongoDB  
**Tiền điều kiện:** Product đã ở trạng thái được phép hiển thị cho site hiện tại.

### Main flow

1. Khách hàng truy cập catalog hoặc Product Detail.
2. Storefront gửi yêu cầu đọc product/catalog tới Commerce Backend.
3. Backend đọc product, variant, category, site visibility và các read model cần thiết.
4. Backend trả representation phù hợp site hiện tại.
5. Storefront render tên, media, thuộc tính, variant và trạng thái liên quan.

### Alternate/exception

- Product không thuộc site hiện tại -> không hiển thị như product khả dụng.
- Product archived/unpublished -> không hiển thị cho khách.
- Price/stock read model chưa có -> behavior phải theo contract đã chốt; hiện còn TBD.

### Acceptance

- Hai loại sản phẩm có bộ thuộc tính khác nhau vẫn hiển thị đúng.
- Storefront không phụ thuộc trực tiếp vào PostgreSQL/Odoo.
- Product không được hiển thị sai site visibility.

**Task:** BE-003, BE-004, BE-006, SF-002, SF-003  
**Test:** TC-CAT-001..004

---

## UC-INV-001 - Nhân sự nhập kho

**Actor chính:** Nhân sự kho được phân quyền  
**Requirement:** FR-010, FR-011, FR-012  
**Hệ thống:** Odoo  
**Tiền điều kiện:** User có quyền; warehouse/location/product hợp lệ.

### Main flow

1. Nhân sự tạo/chọn chứng từ nhập kho theo workflow đã định nghĩa.
2. Chọn product/variant, quantity và destination location.
3. Hệ thống validate dữ liệu và state hiện tại.
4. Nhân sự xác nhận bước nghiệp vụ cần thiết.
5. Odoo tạo/cập nhật stock movement tương ứng.
6. Tồn kho được phản ánh theo transaction stock của Odoo.
7. Nếu domain Inventory sync sang Commerce, thay đổi availability được phát theo integration contract.

### Exception

- User không có quyền -> từ chối.
- Product/location không hợp lệ -> từ chối.
- Quantity không hợp lệ -> từ chối.
- Sync Commerce thất bại -> stock transaction Odoo không được tự rollback nếu business rule không yêu cầu; lỗi integration phải được ghi để reconcile.

**Task:** ODOO-005, ODOO-006, ODOO-015, INT-002  
**Test:** TC-INV-001..005

---

## UC-RES-001 - Giữ hàng cho đơn hàng

**Actor chính:** Order process/System  
**Requirement:** FR-013, FR-021  
**Hệ thống:** Commerce Backend, Odoo  
**Tiền điều kiện:** Product/variant, quantity và kho/nguồn cấp hàng đã xác định theo rule.

### Main flow

1. Commerce yêu cầu giữ hàng cho order/order line.
2. Odoo xác định stock khả dụng theo rule đã chốt.
3. Nếu đủ stock, Odoo tạo `bikesport.stock.reservation` liên kết order/order line/product/warehouse/location.
4. Reservation chuyển sang trạng thái active/reserved theo state model.
5. Availability được cập nhật.
6. Commerce nhận kết quả reservation và tiếp tục order flow.

### Exception

- Không đủ hàng -> không tạo reservation thành công; trả lỗi nghiệp vụ rõ ràng.
- Request lặp lại cùng idempotency key/order line -> không tạo duplicate reservation.
- Reservation hết hạn/cancel -> release quantity theo rule.
- Integration timeout -> retry không được tạo reservation thứ hai.

### Acceptance

- Không giữ vượt stock khả dụng theo rule đã chốt.
- Có thể release reservation.
- Duplicate request không tạo duplicate reservation.
- Reservation trace được về order/order line.

**Schema:** `bikesport_stock_reservation`, `stock_quant`, `stock_location`, `sale_order_line`  
**Task:** ODOO-009, INT-002/004, BE-011/012  
**Test:** TC-RES-001..006, DQ-003

---

## UC-ORD-001 - Khách hàng đặt hàng

**Actor chính:** Khách hàng  
**Requirement:** FR-020, FR-021  
**Hệ thống:** Storefront, Commerce Backend, Odoo  
**Blocker:** DEC-004 - Order System of Record.

### Main flow ở mức nghiệp vụ

1. Khách hàng kiểm tra Cart và nhập dữ liệu checkout.
2. Backend revalidate product, price và availability.
3. Hệ thống thực hiện reservation theo rule.
4. Hệ thống tạo order chính thức tại System of Record đã được DEC-004 phê duyệt.
5. Order được đồng bộ/tạo counterpart ở hệ thống còn lại nếu cần.
6. Khách nhận order number và trạng thái.
7. Back-office tiếp tục fulfillment.

### Exception

- Giá thay đổi -> checkout phải phản hồi theo pricing rule.
- Không đủ hàng -> không xác nhận order sai trạng thái.
- Request create order lặp -> không tạo duplicate order.
- Odoo/Commerce integration fail -> trạng thái integration phải được lưu để retry/reconcile.

**Task:** BE-010..013, ODOO-009/010, INT-004, SF-005..007  
**Test:** TC-ORD-001..008, E2E-003

---

## UC-PRICE-001 - Xác định giá bán cho khách

**Actor chính:** Customer-facing Commerce flow  
**Requirement:** FR-030, FR-031  
**Blocker:** DEC-002, DEC-003.

### Main flow

1. Storefront yêu cầu product/variant price trong context site/channel.
2. Backend lấy read model hoặc thực hiện calculation theo authority đã chốt.
3. Promotion hợp lệ được áp dụng theo rule đã chốt.
4. Backend trả base price, selling price và presentation metadata cần thiết.
5. Checkout revalidate giá trước khi tạo order.

### Acceptance

- Giá Product Detail và checkout không dùng hai rule độc lập.
- Promotion presentation không được tự thay đổi business price.
- Giá stale phải có behavior rõ khi nguồn authority chưa đồng bộ.

**Task:** ODOO-011/012, INT-003, BE-009, SF-003/006  
**Test:** TC-PRICE-001..006, DQ-004, E2E-004

---

## UC-WAR-001 - Nhân sự xử lý bảo hành

**Actor chính:** Nhân sự được phân quyền  
**Requirement:** FR-040, FR-041  
**Blocker:** DEC-006, DEC-007.

### Main flow

1. Nhân sự tìm đối tượng đủ điều kiện tra cứu bảo hành.
2. Odoo xác định warranty entity theo key đã chốt.
3. Nhân sự tạo hoặc cập nhật `bikesport.warranty.case`.
4. Hệ thống lưu trạng thái, quan hệ order/product/serial-lot theo model đã phê duyệt.
5. CMS/Commerce chỉ được đọc hoặc thao tác nếu scope và permission cho phép.

### Acceptance

- Không tạo warranty cho reference không hợp lệ theo rule.
- User trái quyền không xem/sửa được dữ liệu bị giới hạn.
- Warranty trace được về key nghiệp vụ đã chốt.

**Task:** ODOO-013, INT-005, BE-015  
**Test:** TC-WAR-001..005

---

## UC-AUTH-001 - Phân quyền nhân sự

**Actor chính:** Administrator/authorized manager  
**Requirement:** FR-060, FR-061  
**Blocker:** DEC-006.

### Goal

Đảm bảo nhân sự chỉ truy cập module, action và dữ liệu được cấp quyền trong CMS/Odoo/API.

### Acceptance

- UI ẩn/disable không được coi là security control duy nhất.
- Backend/Odoo phải enforce permission tại server/model layer.
- Negative test phải chứng minh user trái quyền bị từ chối.
- Các thao tác nhạy cảm cần audit nếu requirement sau này yêu cầu.

**Task:** ODOO-001, BE-016, CMS-001, SEC-002  
**Test:** TC-AUTH-001..008
