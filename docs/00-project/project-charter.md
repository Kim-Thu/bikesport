# BikeSport Project Charter

**Phiên bản:** 0.1  
**Trạng thái:** Draft  
**Ngày:** 2026-08-15

## 1. Mục tiêu dự án

BikeSport được xây dựng như một nền tảng commerce gồm Storefront, CMS, Commerce Backend và Odoo Back-office. Mục tiêu là tách rõ trải nghiệm bán hàng online khỏi nghiệp vụ vận hành nội bộ nhưng vẫn giữ dữ liệu xuyên hệ thống nhất quán.

## 2. Phạm vi hệ thống đã xác nhận

| Subsystem | Phạm vi chính |
| --- | --- |
| Storefront | Catalog, Product Detail, giá/khuyến mãi hiển thị, cửa hàng, Cart, Checkout, Order status |
| CMS | Quản trị dữ liệu hiển thị web, thuộc tính sản phẩm linh hoạt, SEO, media, content, multi-site visibility và các màn hình support được phân quyền |
| Commerce Backend | API cho Storefront/CMS, persistence MongoDB, integration với Odoo, read model và orchestration commerce |
| Odoo Back-office | Product/variant phía ERP, warehouse, location, stock workflow, nhập/xuất/chuyển kho, reservation, order back-office, pricing/promotion phần thuộc Odoo, warranty, store/location, staff permission, multi-site/channel mapping |

## 3. Mục tiêu quản trị dự án

1. Mỗi capability phải trace được từ business requirement đến implementation task và test evidence.
2. Mỗi task chỉ được thực hiện khi dependency đã đủ và schema/API contract liên quan đã có baseline.
3. Mỗi collection/table/model là canonical theo `06-engineering/database-architecture.md`; agent không được tự sinh schema song song.
4. Mỗi thay đổi scope, ownership, schema hoặc contract phải có decision/task ID.
5. `DONE` chỉ được dùng khi có evidence kiểm chứng.

## 4. Vai trò tài liệu

| Góc nhìn | Tài liệu chịu trách nhiệm |
| --- | --- |
| BA | BRD, FRD, business rules, use cases, process flows, acceptance criteria, traceability |
| PO | Product backlog, priority, MVP scope, acceptance outcome |
| PM | Roadmap, task board, dependency, blocker, milestone, status |
| Developer/Architect | SRS, database schema, integration contract, design system, security/performance technical work |
| Tester/QA | Test strategy, test scenarios, test cases, integration/E2E/security/performance evidence |

## 5. Governance flow

```mermaid
flowchart LR
    BR[Business Requirement]
    FR[Functional Requirement]
    UC[Use Case / Flow]
    ARCH[Schema / API / Architecture]
    TASK[Implementation Task]
    TC[Test Case]
    EVIDENCE[Test / Review Evidence]
    DONE[Done]

    BR --> FR --> UC --> ARCH --> TASK --> TC --> EVIDENCE --> DONE
```

Không được nhảy trực tiếp từ ý tưởng sang code nếu thiếu các contract cần thiết cho task đó.

## 6. Definition of Ready cho task

Một implementation task chỉ `READY` khi tối thiểu có:

- Requirement hoặc business decision cha;
- Subsystem owner;
- Dependency không còn `BLOCKED`;
- Schema/model liên quan đã tồn tại trong baseline;
- API/integration contract nếu task chạm hệ thống khác;
- Acceptance criteria;
- Test case hoặc test scenario dự kiến;
- Allowed scope rõ ràng.

## 7. Definition of Done cho task

Task chỉ `DONE` khi:

- Code/config/document đúng phạm vi;
- Không tạo schema/contract ngoài baseline mà không có change task;
- Unit/integration test áp dụng đã pass;
- Acceptance criteria pass;
- Security/permission case áp dụng đã được kiểm tra;
- Regression liên quan đã pass;
- Evidence được ghi lại trong task board;
- Traceability được cập nhật nếu requirement/task/test mới phát sinh.

## 8. Các quyết định đang mở

Các quyết định `DEC-001` đến `DEC-010` trong `06-engineering/project-task-board.md` hiện vẫn là blocker chính cho data ownership, order lifecycle, pricing/promotion, permission, warranty, store-warehouse mapping và cơ chế đồng bộ.
