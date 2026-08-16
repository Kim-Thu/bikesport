import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastViewport } from "@/components/toast/ToastViewport";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BikeSport",
  description: "BikeSport Storefront",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={inter.className} suppressHydrationWarning>
      <body>
        {children}
        <ToastViewport />
      </body>
    </html>
  );
}
