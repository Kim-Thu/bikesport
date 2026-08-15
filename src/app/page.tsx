import { Header } from "@/components/layout/header/Header";

export default function Home() {
  return (
    <>
      <Header cartCount={2} />
      <main aria-label="Nội dung trang chủ">
        <div className="mx-auto my-6 min-h-screen max-w-screen-2xl rounded-xl bg-gradient-to-br from-blue-50 to-white px-6" />
      </main>
    </>
  );
}
