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

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function assertPageBasics(page, route, viewportName) {
  const response = await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
  assert(response && response.status() < 400, `${viewportName} ${route}: HTTP ${response?.status()}`);

  const title = await page.title();
  assert(title.trim().length > 0, `${viewportName} ${route}: missing document title`);

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
  assert(
    blockingViolations.length === 0,
    `${viewportName} ${route}: accessibility violations: ${blockingViolations.map((item) => `${item.id} (${item.nodes.length})`).join(", ")}`,
  );

  const internalHrefs = await page.locator('a[href^="/"]').evaluateAll((links) =>
    [...new Set(links.map((link) => link.getAttribute("href")).filter(Boolean))].slice(0, 20),
  );
  for (const href of internalHrefs) {
    const url = new URL(href, BASE_URL);
    if (url.hash && url.pathname === new URL(page.url()).pathname) continue;
    const linkResponse = await page.request.get(url.toString(), { maxRedirects: 5 });
    assert(linkResponse.status() < 400, `${viewportName} ${route}: broken internal link ${href} -> ${linkResponse.status()}`);
  }
}

async function assertSearchFlow(page) {
  await page.goto(`${BASE_URL}/tuyen-dung?page=2`, { waitUntil: "networkidle" });
  const searchbox = page.getByRole("searchbox", { name: "Tìm vị trí tuyển dụng" });
  await searchbox.fill("Kỹ thuật");
  await page.waitForURL((url) => url.searchParams.get("q") === "Kỹ thuật" && !url.searchParams.has("page"));
  assert(await page.getByText("Kỹ thuật viên xe đạp").count() > 0, "search: expected matching recruitment card");

  await searchbox.fill("");
  await page.waitForURL((url) => !url.searchParams.has("q") && !url.searchParams.has("page"));

  await page.goBack({ waitUntil: "networkidle" });
  assert(new URL(page.url()).searchParams.get("q") === "Kỹ thuật", "search: browser back should restore query URL state");
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
  await assertSearchFlow(page);
  await assertPagination(page);
  await assertCarousel(page);
  await context.close();

  console.log("Browser E2E passed: responsive routes, accessibility, links, search, pagination and carousel verified.");
} finally {
  await browser.close();
}
