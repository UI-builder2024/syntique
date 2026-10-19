// Exports logo PNGs (transparent where possible) and a social avatar from /brand, plus a still of the
// automation section for the services preview.
// Usage (with the dev or prod server running): node scripts/export-brand.mjs [baseUrl]
import { chromium } from "playwright-core";
import { mkdir, writeFile } from "node:fs/promises";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const base = process.argv[2] ?? "http://localhost:3000";
await mkdir("public/brand", { recursive: true });

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 2000, height: 1200 }, deviceScaleFactor: 2 });
await page.goto(`${base}/brand`, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
// Strip the presentation backgrounds so logo PNGs come out transparent.
await page.addStyleTag({ content: "html,body,.brand-bg{background:transparent!important;border-color:transparent!important}" });
for (const id of ["logo-dark-bg", "logo-light-bg", "mark-dark-bg"]) {
  await page.locator(`#${id}`).screenshot({ path: `public/brand/${id}.png`, omitBackground: true });
}
await page.locator("#mark-light-bg").screenshot({ path: "public/brand/mark-light-bg.png" });
await page.locator("#avatar").screenshot({ path: "public/brand/avatar.png" });

const PATH = "M35 10 H19 a7 7 0 0 0 -7 7 a7 7 0 0 0 7 7 h10 a7 7 0 0 1 7 7 a7 7 0 0 1 -7 7 H13";
const svg = (stroke, node) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none"><path d="${PATH}" stroke="${stroke}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="36" cy="10" r="4.2" fill="${node}"/><circle cx="12" cy="38" r="4.2" fill="${node}"/></svg>\n`;
await writeFile("public/brand/mark-dark-bg.svg", svg("#F3F0E8", "#D7FF3A"));
await writeFile("public/brand/mark-light-bg.svg", svg("#0B0B0F", "#3D3BFF"));

// Automation still for the services hover preview.
const home = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
await home.goto(base, { waitUntil: "networkidle" });
await home.addStyleTag({ content: "header,.fixed{display:none!important}" });
const section = home.locator("section", { hasText: "A content engine that" }).first();
await section.scrollIntoViewIfNeeded();
await home.waitForTimeout(3500);
await section.screenshot({ path: "public/brand/automation.png" });

await browser.close();
console.log("exported public/brand/*");
