# BikeSport Documentation Audit

**Ngày audit:** 2026-08-15  
**Trạng thái:** Active  
**Mục tiêu:** theo dõi chất lượng của chính bộ tài liệu để tránh BRD/FRD/SRS/Task/Test/Schema lệch nhau khi nhiều agent cùng cập nhật.

## 1. Audit summary

| Area | Tình trạng | Vấn đề | Action |
| --- | --- | --- | --- |
| Business scope | REVIEW | BRD đã có scope nhưng còn nhiều decision nghiệp vụ mở | Theo dõi DEC-001..010 |
| Functional coverage | REVIEW | FRD có domain chính nhưng use case trước đây thiếu | Đã bổ sung `use-cases-core.md` |
| System boundaries | REVIEW | Storefront/CMS/Backend/Odoo đã tách | Cần khóa API contracts khi decision đủ |
| Data ownership | BLOCKED | Product/Pricing/Promotion/Order/Store/Warranty ownership chưa chốt | Decision Log |
| Database schema | REVIEW | Đã có canonical baseline; một số writer/SoR còn mở | Không cho agent tự đổi schema; dùng DATA-CHG-* |
| Task management | REVIEW | Task board đã có phase/dependency/status | Phải cập nhật Evidence khi code bắt đầu |
| QA coverage | REVIEW | Trước đây thiếu test case cụ thể | Đã bổ sung test strategy + core test cases |
| Traceability | REVIEW | Matrix cũ dừng ở requirement/AC | Đã rebuild đến Task/Test/Evidence |
| Security | BLOCKED | Chưa có role matrix/implementation/evidence | SEC-* + DEC-006 |
| Performance | BLOCKED | Chưa có measurable target | PERF-001 trước benchmark |
| Storefront Design System | BLOCKED | Có token architecture nhưng chưa có giá trị design input thực tế | DS-001/002 |
| Release/UAT | NOT STARTED | Chưa có implementation | Làm sau P0 capability |

## 2. Defect đã sửa trong lần audit này

### DOC-DEF-001 - Task không trace đến test

**Trước:** Task board có `Done khi` nhưng chưa có bộ test case thực tế để agent chạy/ghi evidence.  
**Sửa:** thêm `06-testing/test-strategy.md`, `06-testing/core-test-cases.md`, cập nhật traceability.

### DOC-DEF-002 - Use Case thiếu

**Trước:** FRD liệt kê requirement nhưng luồng Product/Inventory/Reservation/Pricing/Warranty/Permission chưa được mô tả ở mức actor-goal.  
**Sửa:** thêm `02-functional/use-cases-core.md`.

### DOC-DEF-003 - Decision bị nằm rải rác

**Trước:** DEC-* xuất hiện trong task board nhưng không có decision register canonical.  
**Sửa:** thêm `00-project/decision-log.md`.

### DOC-DEF-004 - PO/PM không có backlog cấp capability

**Trước:** chỉ có engineering task; thiếu view Epic/Capability/Priority/MVP.  
**Sửa:** thêm `00-project/product-backlog.md`.

### DOC-DEF-005 - Traceability kết thúc quá sớm

**Trước:** matrix chủ yếu dừng ở System Requirement/Flow/AC.  
**Sửa:** matrix hiện trace đến schema/interface, task, test và evidence.

### DOC-DEF-006 - Documentation index không chỉ cách agent đọc tài liệu

**Sửa:** `docs/README.md` hiện quy định thứ tự Requirement -> Use Case -> Decision -> Schema/API -> Task -> Test -> Evidence.

## 3. Defect còn mở

| ID | Defect | Severity | Blocker/Action |
| --- | --- | --- | --- |
| DOC-OPEN-001 | Chưa có role-permission matrix cụ thể | High | DEC-006 |
| DOC-OPEN-002 | Chưa có Order state machine/system-of-record chính thức | Critical | DEC-004 |
| DOC-OPEN-003 | Chưa có Reservation state machine đầy đủ: expiry/cancel/release rules | High | Bổ sung business rule sau khi order/inventory behavior được chốt |
| DOC-OPEN-004 | Chưa khóa Pricing/Promotion calculation authority | Critical | DEC-002/003 |
| DOC-OPEN-005 | Chưa khóa Store-Warehouse cardinality | High | DEC-008 |
| DOC-OPEN-006 | Chưa khóa Warranty key/lifecycle | High | DEC-007 |
| DOC-OPEN-007 | Integration contract hiện mới ở mức draft tổng hợp | High | INT-001..006 phải chi tiết payload/field/error/idempotency |
| DOC-OPEN-008 | SRS NFR chưa có measurable performance target | High | PERF-001 + cập nhật SRS |
| DOC-OPEN-009 | Storefront token value chưa có nguồn thiết kế thực tế | Medium | DS-001/002 |
| DOC-OPEN-010 | Chưa có UAT scenarios/user sign-off matrix | Medium | Tạo khi P0 requirement đủ ổn định |

## 4. Quy tắc audit liên tục

Mỗi lần thêm requirement, schema, task hoặc test mới phải kiểm tra:

1. ID có unique không?
2. Có parent/source không?
3. Có mâu thuẫn với decision hiện tại không?
4. Có đổi data ownership/schema/API không?
5. Task nào bị ảnh hưởng?
6. Test nào phải thêm/sửa?
7. Traceability matrix đã cập nhật chưa?
8. Có tài liệu cũ đang nói khác không?

Nếu câu trả lời cho 3-7 là `có` nhưng tài liệu liên quan chưa đổi, change chưa hoàn tất.
