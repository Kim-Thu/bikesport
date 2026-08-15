import Image from "next/image";
import type { LogoProps } from "@/interfaces/logo.interface";

export function Logo({ src = "/bikesport-logo.svg", alt = "Logo", href = "#home" }: LogoProps) {
  if (!src) return null;

  return (
    <a href={href} className="inline-flex items-center" aria-label="Trang chủ">
      <Image src={src} alt={alt} width={160} height={40} className="h-auto w-40 max-md:w-28" priority />
    </a>
  );
}
