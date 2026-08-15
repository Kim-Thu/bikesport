# Agent Work Contract

**Trạng thái:** Draft

## 1. Mục tiêu

Mọi task giao cho agent/developer phải đủ rõ để người thực hiện biết chính xác:

- đang làm subsystem/domain nào;
- được phép sửa những file/module nào;
- không được sửa phần nào;
- dependency nằm ở đâu;
- kết quả cần bàn giao là gì;
- bằng chứng nào chứng minh task hoàn thành.

## 2. Task contract bắt buộc

Mỗi task kỹ thuật nên có cấu trúc sau:

| Trường | Ý nghĩa |
| --- | --- |
| Task ID | ID duy nhất, ví dụ `SF-012`, `ODOO-008`, `INT-004` |
| Title | Kết quả cần đạt, không chỉ tên thao tác |
| Domain | Catalog / Order / Inventory / Pricing / Warranty... |
| Subsystem | Storefront / CMS / Commerce Backend / Odoo / Integration |
| Phase | `PH-xx` |
| Requirement refs | BR/FR/SRS/UC/FLOW liên quan |
| Inputs | Contract, schema, mockup, rule, API, tài liệu cần đọc |
| Allowed scope | File/module/service được phép thay đổi |
| Forbidden scope | Phần không được tự ý sửa |
| Dependencies | Task/contract phải có trước |
| Deliverables | Code/doc/test/migration cụ thể |
| Acceptance criteria | Điều kiện quan sát được để nghiệm thu |
| Evidence | Test output, screenshot, benchmark, CI, audit result... |
| Risks/Open questions | Phần chưa đủ dữ kiện |
| Status | Not Started / Blocked / Ready / In Progress / Verification / Done |

## 3. Quy tắc thực thi cho agent

1. Đọc requirement refs trước khi sửa code.
2. Không tự mở rộng business rule ngoài requirement đã có.
3. Không đổi API/data contract dùng chung mà không cập nhật tài liệu integration và downstream dependency.
4. Không đổi source of truth chỉ vì implementation hiện tại thuận tiện hơn.
5. Không hard-code UI value nếu design token tương ứng đã tồn tại.
6. Không đánh dấu task `Done` nếu acceptance criteria chưa được verify.
7. Nếu task yêu cầu performance/security nhưng chưa có target, phải ghi `Blocked/TBD`, không tự đặt target thành requirement.
8. Nếu phát hiện vấn đề ngoài scope, ghi follow-up task thay vì sửa lan sang subsystem khác.

## 4. Prefix task theo subsystem

| Prefix | Phạm vi |
| --- | --- |
| `ARCH-` | Architecture |
| `DATA-` | Data architecture/schema/migration |
| `SEC-` | Security |
| `PERF-` | Performance |
| `DS-` | Design System |
| `SF-` | Storefront |
| `CMS-` | CMS |
| `BE-` | Commerce Backend |
| `ODOO-` | Odoo Back-office |
| `INT-` | Integration |
| `QA-` | Test/quality verification |
| `OPS-` | Deployment/monitoring/operations |

## 5. Definition of Ready

Một task chỉ nên chuyển sang `Ready` khi:

- mục tiêu và acceptance criteria đã rõ;
- requirement refs có tồn tại;
- dependency bắt buộc đã có hoặc được mock/stub có kiểm soát;
- input data/API/schema cần thiết đã đủ;
- không còn câu hỏi mở có thể làm thay đổi bản chất task.

## 6. Definition of Done

Một task chỉ được `Done` khi:

- deliverable đã hoàn thành;
- test phù hợp đã chạy;
- acceptance criteria đã verify;
- evidence được ghi lại;
- tài liệu/contract bị ảnh hưởng đã được cập nhật;
- không tạo regression đã biết ở phạm vi liên quan;
- security/performance gate áp dụng cho task đã được xử lý hoặc có exception được ghi rõ.

## 7. Ví dụ task

```yaml
id: SF-012
title: Hiển thị trạng thái khả dụng của sản phẩm trên Product Detail
domain: Inventory
subsystem: Storefront
phase: PH-06
requirements:
  - FR-INV-TBD
inputs:
  - Commerce API inventory availability contract
allowed_scope:
  - storefront product detail
  - shared inventory status component
forbidden_scope:
  - Odoo reservation logic
  - inventory source-of-truth rule
dependencies:
  - INT inventory contract approved
deliverables:
  - UI states
  - integration handling
  - tests
acceptance_criteria:
  - TBD from FR/SRS
evidence:
  - test result
status: Blocked
```

Ví dụ trên cố ý giữ `Blocked` vì requirement ID và acceptance criteria cụ thể chưa được chốt. Agent không được tự bịa để triển khai tiếp.
