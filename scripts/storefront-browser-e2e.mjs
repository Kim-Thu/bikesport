import { chromium } from "playwright";
import axe from "axe-core";

const BASE_URL = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3000";
const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];
const routes = [
  "/",
  "/tuyen-dung",
  "/tuyen-dung/nhan-vien-kinh-doanh-xe-dap",
];
const verifiedInternalUrls = new Set();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function reportAccessibilityViolations(viewportName, route, violations) {
  if (!violations.length) return;

  console.error(`Accessibility failures for ${viewportName} ${route}:`);
  for (const violation of violations) {
    console.error(`\n[${violation.id}] ${violation.help} - ${violation.helpUrl}`);
    for (const node of violation.nodes) {
      console.error(`  target: ${node.target.join(" > ")}`);
      console.error(`  html: ${node.html}`);
      if (node.failureSummary) console.error(`  reason: ${node.failureSummary.replace(/\n/g, " ")}`);
    }
  }
}

function assertSecurityHeaders(response, viewportName, route) {
  const headers = response.headers();
  const csp = headers["content-security-policy"] ?? "";
  assert(csp.includes("default-src 'self'"), `${viewportName} ${route}: missing restrictive CSP default-src`);
  assert(csp.includes("frame-ancestors 'none'"), `${viewportName} ${route}: CSP must block framing`);
  assert(headers["x-frame-options"] === "DENY", `${viewportName} ${route}: X-Frame-Options must be DENY`);
  assert(headers["x-content-type-options"] === "nosniff", `${viewportName} ${route}: X-Content-Type-Options must be nosniff`);
  assert(headers["referrer-policy"] === "strict-origin-when-cross-origin", `${viewportName} ${route}: unexpected Referrer-Policy`);
  assert((headers["permissions-policy"] ?? "").includes("camera=()"), `${viewportName} ${route}: missing restrictive Permissions-Policy`);
  assert(headers["cross-origin-opener-policy"] === "same-origin", `${viewportName} ${route}: Cross-Origin-Opener-Policy must be same-origin`);
  assert((headers["strict-transport-security"] ?? "").includes("max-age=31536000"), `${viewportName} ${route}: missing production HSTS`);
}

async function assertSeoRuntime(page, route, viewportName) {
  const description = await page.locator('meta[name="description"]').getAttribute("content");
  assert(description?.trim(), `${viewportName} ${route}: missing meta description`);

  const canonicalLocator = page.locator('link[rel="canonical"]');
  assert(await canonicalLocator.count() === 1, `${viewportName} ${route}: expected exactly one canonical link`);
  const canonical = await canonicalLocator.first().getAttribute("href");
  assert(canonical, `${viewportName} ${route}: canonical link has no href`);
  const canonicalUrl = new URL(canonical, BASE_URL);
  assert(canonicalUrl.pathname === route, `${viewportName} ${route}: canonical path is ${canonicalUrl.pathname}`);

  const structuredData = page.locator('script[type="application/ld+json"]');
  assert(await structuredData.count() > 0, `${viewportName} ${route}: missing structured data`);
  const structuredDataValues = await structuredData.allTextContents();
  for (const value of structuredDataValues) {
    JSON.parse(value);
  }
}

async function assertInternalLinks(page, route, viewportName) {
  const internalHrefs = await page.locator('a[href^="/"]').evaluateAll((links) =>
    [...new Set(links.map((link) => link.getAttribute("href")).filter(Boolean))],
  );

  for (const href of internalHrefs) {
    const url = new URL(href, BASE_URL);
    if (url.hash && url.pathname === new URL(page.url()).pathname) continue;
    const normalizedUrl = `${url.origin}${url.pathname}${url.search}`;
    if (verifiedInternalUrls.has(normalizedUrl)) continue;

    const linkResponse = await page.request.get(normalizedUrl, { maxRedirects: 5 });
    assert(linkResponse.status() < 400, `${viewportName} ${route}: broken internal link ${href} -> ${linkResponse.status()}`);
    verifiedInternalUrls.add(normalizedUrl);
  }
}

async function assertPageBasics(page, route, viewportName) {
  const response = await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
  assert(response && response.status() < 400, `${viewportName} ${route}: HTTP ${response?.status()}`);
  assertSecurityHeaders(response, viewportName, route);

  const title = await page.title();
  assert(title.trim().length > 0, `${viewportName} ${route}: missing document title`);
  await assertSeoRuntime(page, route, viewportName);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  assert(overflow <= 1, `${viewportName} ${route}: horizontal overflow ${overflow}px`);

  const mainCount = await page.locator("main").count();
  assert(mainCount === 1, `${viewportName} ${route}: expected exactly one <main>, found ${mainCount}`);

  await page.addScriptTag({ content: axe.source });
  const axeResult = await page.evaluate(async () => globalThis.axe.run(document, {
    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
  }));
  const blockingViolations = axeResult.violations.filter((violation) =>
    violation.impact === "critical" || violation.impact === "serious"
  );
  reportAccessibilityViolations(viewportName, route, blockingViolations);
  assert(
    blockingViolations.length === 0,
    `${viewportName} ${route}: accessibility violations: ${blockingViolations.map((item) => `${item.id} (${item.nodes.length})`).join(", ")}`,
  );

  await assertInternalLinks(page, route, viewportName);
}

async function assertKeyboardFocus(page) {
  await page.goto(`${BASE_URL}/tuyen-dung`, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  });

  let reachedSearch = false;
  for (let attempt = 0; attempt < 60; attempt += 1) {
    await page.keyboard.press("Tab");
    reachedSearch = await page.evaluate(() => {
      const active = document.activeElement;
      return active instanceof HTMLInputElement && active.type === "search";
    });
    if (reachedSearch) break;
  }
  assert(reachedSearch, "keyboard: recruitment searchbox must be reachable with Tab");

  await page.keyboard.press("Shift+Tab");
  const previousIsInteractive = await page.evaluate(() =>
    document.activeElement?.matches('a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled)') ?? false,
  );
  assert(previousIsInteractive, "keyboard: Shift+Tab should move focus to another interactive control");
}

async function assertSearchFlow(page) {
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.goto(`${BASE_URL}/tuyen-dung?page=2`, { waitUntil: "networkidle" });
  const searchbox = page.getByRole("searchbox", { name: "Tìm vị trí tuyển dụng" });
  await searchbox.fill("Kỹ thuật");
  await page.waitForURL((url) => url.searchParams.get("q") === "Kỹ thuật" && !url.searchParams.has("page"));
  assert(await page.getByText("Kỹ thuật viên xe đạp").count() > 0, "search: expected matching recruitment card");

  await searchbox.fill("");
  await page.waitForURL((url) => !url.searchParams.has("q") && !url.searchParams.has("page"));

  await page.goBack({ waitUntil: "networkidle" });
  assert(new URL(page.url()).pathname === "/", "search: browser back should return to the route before live search");

  await page.goForward({ waitUntil: "networkidle" });
  const forwardUrl = new URL(page.url());
  assert(forwardUrl.pathname === "/tuyen-dung" && !forwardUrl.searchParams.has("q") && !forwardUrl.searchParams.has("page"), "search: browser forward should restore the final live-search URL");
}

async function assertPagination(page) {
  await page.goto(`${BASE_URL}/tuyen-dung`, { waitUntil: "networkidle" });
  const pageTwo = page.locator('a[href*="page=2"]').first();
  assert(await pageTwo.count() === 1, "pagination: page 2 link not found");
  await pageTwo.click();
  await page.waitForURL((url) => url.searchParams.get("page") === "2");
}

async function assertCarousel(page) {
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  const dots = page.locator('[aria-label="Chọn slide"] button');
  const count = await dots.count();
  if (count < 2) return;

  await dots.nth(1).click();
  await page.waitForFunction(() => {
    const buttons = document.querySelectorAll('[aria-label="Chọn slide"] button');
    return buttons[1]?.getAttribute("aria-current") === "true";
  });
}

async function assertNotFound(page) {
  const response = await page.goto(`${BASE_URL}/__storefront_e2e_missing_route__`, { waitUntil: "networkidle" });
  assert(response?.status() === 404, `404: expected 404 status, received ${response?.status()}`);
}

const browser = await chromium.launch({ headless: true });
try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
    const page = await context.newPage();
    for (const route of routes) {
      await assertPageBasics(page, route, viewport.name);
    }
    await context.close();
  }

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await assertKeyboardFocus(page);
  await assertSearchFlow(page);
  await assertPagination(page);
  await assertCarousel(page);
  await assertNotFound(page);
  await context.close();

  console.log("Browser E2E passed: responsive routes, security headers, SEO metadata, structured data, accessibility, keyboard focus, internal links, search history, pagination, carousel and 404 verified.");
} finally {
  await browser.close();
}
