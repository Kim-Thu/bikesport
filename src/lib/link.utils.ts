import type { LinkInfo } from "@/interfaces/link.interface";

const NATIVE_PROTOCOL_PATTERN = /^(tel:|mailto:|sms:)/i;
const HTTP_PROTOCOL_PATTERN = /^https?:\/\//i;
const PROTOCOL_RELATIVE_PATTERN = /^\/\//;
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

function resolveHttpLink(href: string): LinkInfo {
  try {
    const normalizedHttpHref = PROTOCOL_RELATIVE_PATTERN.test(href) ? `https:${href}` : href;
    const targetUrl = new URL(normalizedHttpHref);
    const homeUrl = getHomeUrl();

    if (!homeUrl) {
      return {
        href: normalizedHttpHref,
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
      href: normalizedHttpHref,
      isExternal: true,
      useNativeAnchor: true,
    };
  } catch {
    return createSafeFallback();
  }
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

  if (PROTOCOL_RELATIVE_PATTERN.test(normalizedHref) || HTTP_PROTOCOL_PATTERN.test(normalizedHref)) {
    return resolveHttpLink(normalizedHref);
  }

  if (BLOCKED_PROTOCOL_PATTERN.test(normalizedHref)) {
    return createSafeFallback();
  }

  return {
    href: normalizedHref,
    isExternal: false,
    useNativeAnchor: false,
  };
}
