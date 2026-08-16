import type { LinkInfo } from "@/interfaces/link.interface";

const SPECIAL_PROTOCOL_PATTERN = /^(tel:|mailto:|sms:)/i;
const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;

export function getHomeUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "").trim().replace(/\/+$/, "");
}

export function getLinkInfo(href?: string): LinkInfo {
  const normalizedHref = href?.trim() || "#";

  if (SPECIAL_PROTOCOL_PATTERN.test(normalizedHref)) {
    return {
      href: normalizedHref,
      isExternal: false,
      useNativeAnchor: true,
    };
  }

  if (!ABSOLUTE_URL_PATTERN.test(normalizedHref)) {
    return {
      href: normalizedHref,
      isExternal: false,
      useNativeAnchor: false,
    };
  }

  try {
    const targetUrl = new URL(normalizedHref);
    const homeUrl = getHomeUrl();

    if (!homeUrl) {
      return {
        href: normalizedHref,
        isExternal: true,
        useNativeAnchor: true,
      };
    }

    const siteUrl = new URL(homeUrl);
    const isInternal = targetUrl.hostname === siteUrl.hostname;

    if (isInternal) {
      return {
        href: `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}` || "/",
        isExternal: false,
        useNativeAnchor: false,
      };
    }

    return {
      href: normalizedHref,
      isExternal: true,
      useNativeAnchor: true,
    };
  } catch {
    return {
      href: normalizedHref,
      isExternal: false,
      useNativeAnchor: true,
    };
  }
}
