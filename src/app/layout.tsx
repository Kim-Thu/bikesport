import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ToastViewport } from "@/components/toast/ToastViewport";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bike Sport",
  description: "",
  applicationName: "Bike Sport",
  openGraph: {
    title: "Bike Sport",
    description: "",
    type: "website",
  },
  manifest: "/uploads/site.webmanifest",
  icons: {
    icon: [
      { url: "/uploads/favicon.ico", type: "image/x-icon" },
      { url: "/uploads/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/uploads/apple-touch-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={inter.className}>
      <body>
        {children}
        <ToastViewport />
      </body>
    </html>
  );
}
