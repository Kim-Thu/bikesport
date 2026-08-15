# BikeSport Test Strategy

**Phiên bản:** 0.1  
**Trạng thái:** Draft

## 1. Mục tiêu

Test strategy đảm bảo mỗi requirement và implementation task có bằng chứng kiểm chứng phù hợp trước khi chuyển `DONE` hoặc `Ready for UAT`.

## 2. Test layers

| Layer | Mục tiêu | Ví dụ |
| --- | --- | --- |
| Unit | Kiểm tra logic cục bộ | price calculation helper, reservation state transition |
| Component/Model | Kiểm tra component/model độc lập | Odoo model constraints, CMS form validation |
| API | Kiểm tra contract backend | Product API, Cart API, Order API |
| Integration | Kiểm tra MongoDB/Odoo/Backend | sync product, inventory, order |
| Permission/Security | Kiểm tra authn/authz/input/secret | role matrix, negative API access |
| Data Integrity | Kiểm tra duplicate/stale/reconcile | idempotency, mapping consistency |
| Performance | Kiểm tra target NFR | catalog API, checkout/order, storefront |
| E2E | Kiểm tra business flow xuyên hệ thống | Product -> Storefront, Checkout -> Odoo |
| UAT | Xác nhận người dùng/nghiệp vụ | kho, order support, warranty, CMS |

## 3. Entry criteria

Một test case chỉ chạy chính thức khi:

- requirement cha đủ rõ;
- schema/API contract liên quan đã baseline;
- environment và test data có thể tái tạo;
- blocker decision liên quan đã `APPROVED` nếu case phụ thuộc decision đó.

## 4. Exit criteria

Một capability chỉ pass QA khi:

- tất cả test case P0 áp dụng pass;
- không còn defect Critical/High chưa có quyết định chấp nhận risk;
- regression case liên quan pass;
- permission/security case bắt buộc pass;
- data-integrity case xuyên hệ thống pass;
- evidence được link vào task board/traceability.

## 5. Severity

| Severity | Mô tả |
| --- | --- |
| Critical | Mất dữ liệu, duplicate order/stock transaction, bypass quyền nghiêm trọng, hệ thống không thể bán hàng |
| High | Sai giá, sai tồn, reservation sai, order lifecycle sai, user truy cập dữ liệu trái quyền |
| Medium | Chức năng chính có workaround, lỗi validation/UI ảnh hưởng rõ |
| Low | Cosmetic hoặc vấn đề nhỏ không làm sai nghiệp vụ |

## 6. Test data nguyên tắc

Tối thiểu cần có:

- 2 site/channel;
- nhiều product type với attribute definition khác nhau;
- product có nhiều variant;
- nhiều warehouse/location;
- variant đủ hàng, hết hàng và stock biên;
- user ở nhiều role;
- promotion có hiệu lực/hết hiệu lực;
- order success/failure/retry;
- warranty reference hợp lệ/không hợp lệ.

## 7. Không được đánh dấu PASS bằng cảm tính

Evidence chấp nhận gồm: automated test result, API test report, CI result, benchmark report, permission matrix test, UAT sign-off hoặc review record có thể truy vết.
