import type { LinkInfo } from "@/interfaces/link.interface";

const NATIVE_PROTOCOL_PATTERN = /^(tel:|mailto:|sms:)/i;
const HTTP_PROTOCOL_PATTERN = /^https?:\/\//i;
const BLOCKED_PROTOCOL_PATTERN = /^[a-z][a-z\d+.-]*:/i;

function createSafeFallback(): LinkInfo {
  return {
    href: "#",
    isExternal: false,
    useNativeAnchor: false,
  };
}

export function getHomeUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "").trim().replace(/\/+$/, "");
}

export function getLinkInfo(href?: string): LinkInfo {
  const normalizedHref = href?.trim() || "#";

  if (NATIVE_PROTOCOL_PATTERN.test(normalizedHref)) {
    return {
      href: normalizedHref,
      isExternal: false,
      useNativeAnchor: true,
    };
  }

  if (BLOCKED_PROTOCOL_PATTERN.test(normalizedHref) && !HTTP_PROTOCOL_PATTERN.test(normalizedHref)) {
    return createSafeFallback();
  }

  if (!HTTP_PROTOCOL_PATTERN.test(normalizedHref)) {
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
    const isInternal = targetUrl.origin === siteUrl.origin;

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
    return createSafeFallback();
  }
}
