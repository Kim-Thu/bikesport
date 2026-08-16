import { Banner } from "@/components/banner/Banner";
import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import wpOption from "@/data/wp-option.json";
import type { FooterSettings } from "@/interfaces/footer.interface";
import type { HeaderSettings } from "@/interfaces/header.interface";

export default function Home() {
  return (
    <>
      <Header settings={wpOption.header as HeaderSettings} />
      <main aria-label="Nội dung trang chủ">
        <Banner bannerId="66bf4e8c9f2a4d7b8c1e3a01" />
      </main>
      <Footer settings={wpOption.footer as FooterSettings} />
    </>
  );
}
