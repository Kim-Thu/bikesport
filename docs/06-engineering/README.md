# Engineering Delivery & Architecture

**Trạng thái:** Draft  
**Phạm vi:** BikeSport Commerce Platform  
**Mục đích:** biến BRD/FRD/SRS thành các gói công việc kỹ thuật có ranh giới, dependency, tiêu chí hoàn thành và bằng chứng kiểm chứng rõ ràng để developer/agent có thể thực hiện mà không tự mở rộng phạm vi.

## 1. Vai trò của phần tài liệu này

BRD/FRD/SRS trả lời hệ thống cần đạt điều gì. Phần `06-engineering` trả lời các câu hỏi thực thi:

- Hạng mục nào phải làm trước, hạng mục nào phụ thuộc hạng mục khác?
- Agent/developer đang được phép thay đổi subsystem nào?
- Input và output của mỗi nhiệm vụ là gì?
- Kiến trúc hệ thống và kiến trúc dữ liệu hiện đang được hiểu thế nào?
- Security, performance, reliability đã được kiểm chứng hay mới chỉ là yêu cầu?
- Storefront dùng design system và design token theo nguyên tắc nào?
- Khi nào một phase/task được coi là hoàn thành?

Phần này không thay thế SRS và không được tự tạo business requirement mới.

## 2. Cấu trúc

| Tài liệu | Mục đích |
| --- | --- |
| `delivery-plan.md` | Chia phase, work package, dependency và điều kiện vào/ra của từng phase |
| `agent-work-contract.md` | Quy định cách giao task cho agent/developer, phạm vi được phép sửa và Definition of Done |
| `architecture-blueprint.md` | Kiến trúc logical của Storefront, CMS, Commerce Backend, Odoo và integration |
| `data-architecture.md` | Ownership, luồng dữ liệu, data boundary và schema/model cần xác nhận |
| `quality-gates.md` | Theo dõi security, performance, reliability, accessibility và bằng chứng kiểm chứng |
| `storefront-design-system.md` | Quy tắc design system, token layers, component contract và tiêu chí UI consistency |

## 3. Trạng thái kỹ thuật hiện tại

Tại thời điểm tạo tài liệu này, repository mới có tài liệu yêu cầu và chưa có bằng chứng implementation/test đủ để kết luận các tiêu chí kỹ thuật đã đạt.

Vì vậy:

- Security: **Chưa đánh giá**.
- Performance: **Chưa đánh giá**.
- Reliability/Recovery: **Chưa đánh giá**.
- Accessibility: **Chưa đánh giá**.
- Data model chi tiết: **Chưa khóa**.
- Design token values: **Chưa khóa**.

Không agent nào được đổi các trạng thái trên thành `Verified/Pass` nếu không gắn được bằng chứng cụ thể như test result, benchmark, audit log, CI result hoặc tài liệu review được chấp nhận.

## 4. Nguyên tắc chung

1. Mỗi task phải có ID, subsystem, input, output, dependency, acceptance criteria và evidence.
2. Agent chỉ sửa phần nằm trong `Allowed scope` của task.
3. Nếu phát hiện yêu cầu ngoài scope, tạo `Open question`/`Follow-up task`, không tự triển khai.
4. Mọi thay đổi chạm nhiều subsystem phải chỉ rõ integration contract và data ownership.
5. Không đánh dấu security/performance "đã đạt" chỉ dựa trên code review cảm tính.
6. Design system không được hard-code tùy ý từng màn hình; giá trị visual phải đi qua token/component contract khi đã được phê duyệt.
7. Các quyết định kiến trúc chưa chốt phải được ghi `Proposed` hoặc `TBD`, không ghi như sự thật đã xác nhận.
