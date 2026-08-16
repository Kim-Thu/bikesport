import { Banner } from "@/components/banner/Banner";
import { BoxIcon } from "@/components/box/BoxIcon";
import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { Column } from "@/components/layout/Column";
import { Container } from "@/components/layout/Container";
import { Row } from "@/components/layout/Row";
import { Section } from "@/components/section/Section";
import { Stack } from "@/components/stack/Stack";
import wpOption from "@/data/wp-option.json";
import type { FooterSettings } from "@/interfaces/footer.interface";
import type { HeaderSettings } from "@/interfaces/header.interface";
import { cn } from "@/lib/classname.utils";

const SERVICE_ITEMS = [
  {
    icon: "truck",
    title: "Giao hàng toàn quốc",
    description: "Nhận hàng trong 2 - 4 ngày",
  },
  {
    icon: "package",
    title: "Bảo hành chính hãng",
    description: "Hỗ trợ bảo hành tận tâm",
  },
  {
    icon: "refresh",
    title: "Đổi trả linh hoạt",
    description: "Chính sách đổi trả rõ ràng",
  },
  {
    icon: "payment",
    title: "Thanh toán an toàn",
    description: "Nhiều phương thức thanh toán",
  },
] as const;

const SUPPORT_ITEMS = [
  {
    icon: "click",
    title: "Đặt hàng dễ dàng",
    description: "Chỉ với vài thao tác đơn giản",
  },
  {
    icon: "wrench",
    title: "Lắp ráp chuyên nghiệp",
    description: "Kỹ thuật viên hỗ trợ tận nơi",
  },
  {
    icon: "support",
    title: "Tư vấn tận tâm",
    description: "Đồng hành trước và sau mua",
  },
  {
    icon: "phone",
    title: "Hỗ trợ nhanh chóng",
    description: "Luôn sẵn sàng khi bạn cần",
  },
] as const;

function getColumnDividerClass(index: number, variant: "surface" | "primary") {
  const borderColor = variant === "primary" ? "border-white/25" : "border-gray-200";

  return cn(
    borderColor,
    index === 1 && "border-t sm:border-l sm:border-t-0",
    index === 2 && "border-t lg:border-l lg:border-t-0",
    index === 3 && "border-t sm:border-l lg:border-t-0",
  );
}

export default function Home() {
  return (
    <>
      <Header settings={wpOption.header as HeaderSettings} />
      <main aria-label="Nội dung trang chủ">
        <Banner bannerId="66bf4e8c9f2a4d7b8c1e3a01" />

        <Section className="pb-4 sm:pb-6">
          <Container>
            <Stack variant="surface">
              <Row className="flex-wrap items-stretch">
                {SERVICE_ITEMS.map((item, index) => (
                  <Column
                    key={item.title}
                    className={cn(
                      "w-full px-5 py-5 sm:w-1/2 lg:w-1/4 lg:px-6",
                      getColumnDividerClass(index, "surface"),
                    )}
                  >
                    <BoxIcon {...item} iconClassName="text-blue-600" />
                  </Column>
                ))}
              </Row>
            </Stack>
          </Container>
        </Section>

        <Section className="pb-4 sm:pb-6">
          <Container>
            <Stack variant="primary">
              <Row className="flex-wrap items-stretch">
                {SUPPORT_ITEMS.map((item, index) => (
                  <Column
                    key={item.title}
                    className={cn(
                      "w-full px-5 py-5 sm:w-1/2 lg:w-1/4 lg:px-6",
                      getColumnDividerClass(index, "primary"),
                    )}
                  >
                    <BoxIcon {...item} iconClassName="text-white" />
                  </Column>
                ))}
              </Row>
            </Stack>
          </Container>
        </Section>
      </main>
      <Footer settings={wpOption.footer as FooterSettings} />
    </>
  );
}
