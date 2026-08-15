import { Header } from "@/components/header/Header";
import type { HeaderSettings } from "@/interfaces/header.interface";
import wpOption from "@/data/wp-option.json";

export default function Home() {
  return (
    <>
      <Header settings={wpOption as HeaderSettings} />
      <main aria-label="Nội dung trang chủ">
        <div className="mx-auto my-6 min-h-screen max-w-screen-2xl rounded-xl bg-gradient-to-br from-blue-50 to-white px-6" />
      </main>
    </>
  );
}
