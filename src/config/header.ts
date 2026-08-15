export type HeaderNavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
  highlight?: boolean;
};

export const HEADER_PROMOTION = {
  message: "ƯU ĐÃI MÙA HÈ - GIẢM ĐẾN 30% + QUÀ TẶNG HẤP DẪN",
  ctaLabel: "Xem chi tiết",
  href: "#promotions",
};

export const HEADER_NAV_ITEMS: HeaderNavItem[] = [
  { label: "XE ĐẠP", href: "#bikes", hasDropdown: true },
  { label: "PHỤ KIỆN", href: "#accessories", hasDropdown: true },
  { label: "KHUYẾN MÃI", href: "#promotions", highlight: true },
  { label: "SỰ KIỆN", href: "#events" },
  { label: "DỊCH VỤ", href: "#services" },
  { label: "BLOG", href: "#blog" },
  { label: "CỬA HÀNG", href: "#stores" },
];

export const HEADER_CONTACT = {
  label: "Hotline",
  phone: "1900 633 022",
  href: "tel:1900633022",
};
