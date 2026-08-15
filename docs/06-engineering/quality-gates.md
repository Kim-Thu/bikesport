# Quality Gates

**Trạng thái:** Draft  
**Nguyên tắc:** requirement nói hệ thống cần đạt gì; quality gate nói bằng chứng nào cho phép kết luận đã đạt.

## 1. Trạng thái hiện tại

Hiện repository chưa có implementation/test evidence đủ để xác nhận các tiêu chí kỹ thuật dưới đây.

| Nhóm | Trạng thái hiện tại | Có thể kết luận Pass? |
| --- | --- | --- |
| Security | Not Assessed | Không |
| Performance | Not Assessed | Không |
| Reliability/Recovery | Not Assessed | Không |
| Accessibility | Not Assessed | Không |
| Data integrity | Partially specified | Không |
| Observability | Not Assessed | Không |

Không agent nào được đổi sang `Verified` chỉ dựa vào việc code build thành công hoặc review bằng mắt.

## 2. Trạng thái chuẩn

- `Not Assessed`: chưa có đánh giá.
- `Planned`: đã có target/method nhưng chưa chạy.
- `In Verification`: đang đo/test/audit.
- `Verified`: đạt target và có evidence.
- `Failed`: không đạt target.
- `Exception`: chưa đạt nhưng có quyết định chấp nhận rủi ro được ghi rõ.
- `Blocked`: thiếu target, môi trường hoặc dependency để kiểm chứng.

## 3. Security Gate

### Phạm vi cần kiểm tra

- Authentication.
- Authorization theo role/permission.
- Access control giữa CMS, Storefront, Backend và Odoo.
- Input validation.
- API protection.
- Secrets/configuration handling.
- Session/token handling nếu áp dụng.
- Sensitive data exposure.
- Dependency vulnerability.
- Audit/logging cho thao tác nhạy cảm.
- Abuse/brute-force/rate-control khi requirement yêu cầu.
- Integration trust boundary giữa Commerce và Odoo.

### Evidence chấp nhận

Có thể gồm:

- automated security test;
- authorization test matrix;
- dependency/security scan;
- threat model review;
- penetration/security review result;
- CI result;
- audit log verification.

### Gate table

| ID | Control/Requirement | Target | Verification | Evidence | Status |
| --- | --- | --- | --- | --- | --- |
| SEC-GATE-001 | Authorization theo role | TBD | Permission test matrix | TBD | Blocked |
| SEC-GATE-002 | API input validation | TBD | Automated/API tests | TBD | Blocked |
| SEC-GATE-003 | Dependency vulnerability | TBD | Dependency scan | TBD | Blocked |
| SEC-GATE-004 | Sensitive operation audit | TBD | Log/audit verification | TBD | Blocked |

Target chưa được nguồn xác nhận nên không tự đặt ngưỡng.

## 4. Performance Gate

### Luồng cần benchmark

- Storefront page/data loading.
- Product listing/search/filter khi được xác nhận scope.
- Product detail.
- Cart/checkout/order submission.
- CMS query/save đối với catalog lớn.
- Commerce-Odoo synchronization.
- Inventory availability query.
- Các batch/reconciliation job nếu có.

### Điều phải ghi khi đo

- môi trường;
- dataset size;
- concurrent users/request rate nếu áp dụng;
- cache state;
- network/device condition nếu là frontend;
- metric/percentile;
- target đã được chốt;
- kết quả thực tế.

| ID | Scenario | Target | Method | Evidence | Status |
| --- | --- | --- | --- | --- | --- |
| PERF-GATE-001 | Storefront critical journey | TBD | Browser/performance test | TBD | Blocked |
| PERF-GATE-002 | Commerce API critical endpoints | TBD | Load/latency test | TBD | Blocked |
| PERF-GATE-003 | Odoo-Commerce sync | TBD | Integration benchmark | TBD | Blocked |
| PERF-GATE-004 | Catalog query at representative dataset | TBD | Query profiling | TBD | Blocked |

## 5. Reliability & Recovery Gate

Cần kiểm tra khi liên quan:

- Odoo unavailable.
- Commerce Backend unavailable.
- Duplicate message/request.
- Partial synchronization.
- Retry dẫn đến duplicate transaction.
- Network timeout.
- Failed reservation/order synchronization.
- Reconciliation sau sự cố.
- Rollback hoặc manual recovery.

Không tự giả định retry/recovery strategy nếu SRS/integration contract chưa chốt.

## 6. Data Integrity Gate

Các kiểm tra tối thiểu cho entity xuyên hệ thống:

- identifier mapping đúng;
- source-of-truth không bị ghi đè trái quyền;
- duplicate handling;
- stale data behavior;
- consistency giữa order/inventory/reservation khi flow yêu cầu;
- migration/backfill validation;
- auditability của thay đổi quan trọng.

## 7. Accessibility Gate - Storefront/CMS

Chỉ đánh dấu `Verified` khi có kiểm chứng phù hợp cho scope đã chốt, ví dụ:

- keyboard navigation;
- focus state;
- semantic structure;
- label/form error association;
- contrast theo target đã thống nhất;
- screen reader behavior cho luồng quan trọng;
- responsive/zoom behavior khi áp dụng.

## 8. Quality Gate theo task

Task có tác động đến một gate phải ghi trực tiếp:

```yaml
quality_gates:
  security:
    applicable: true
    evidence: TBD
    status: Blocked
  performance:
    applicable: true
    evidence: TBD
    status: Blocked
```

`Done` của task không đồng nghĩa toàn hệ thống đã `Verified`; evidence phải gắn đúng phạm vi được kiểm thử.
