# Engineering Planning

Phần này chỉ giữ các tài liệu phục vụ trực tiếp việc triển khai BikeSport.

## Tài liệu

| File | Dùng để làm gì |
| --- | --- |
| `project-task-board.md` | Chia phase/task thật cho Odoo, Backend, CMS, Storefront, Security, Performance và E2E; theo dõi dependency, status và evidence |
| `database-architecture.md` | Vẽ logical schema MongoDB + Odoo/PostgreSQL, quan hệ entity, cross-database identifiers và data flow |
| `storefront-design-system.md` | Xác định token architecture, component inventory, state matrix và task DS/SF liên quan |

## Cách dùng

1. Trước khi giao việc cho agent, lấy đúng task ID từ `project-task-board.md`.
2. Agent không được bắt đầu task đang `BLOCKED`.
3. Sau khi hoàn thành, cập nhật `Status` và `Evidence` của task.
4. Task đụng schema phải kiểm tra `database-architecture.md` và data ownership trước.
5. Task Storefront phải dùng token/component contract trong `storefront-design-system.md`.

## Trạng thái hiện tại

- Code implementation: chưa bắt đầu.
- Security: chưa kiểm chứng.
- Performance: chưa kiểm chứng.
- Database physical schema: chưa khóa vì còn các quyết định `DEC-001` đến `DEC-010`.
- Design token values: chưa khóa vì chưa có design/brand input.
