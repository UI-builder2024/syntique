// Captures the live client sites used as case-study imagery.
// Usage: node scripts/capture.mjs [slug]
// Writes public/work/<slug>/{desktop,mobile,full}.jpg using the locally installed Chrome.
import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const SITES = [
  { slug: "sisters-in-sweat", url: "https://www.sistersinsweat.com/", before: (page) => page.getByText("Bengaluru", { exact: true }).first().click({ timeout: 8000 }) },
  { slug: "four-states", url: "https://four-states.vercel.app/?built=all", wait: 7000 },
  { slug: "timbuckdo", url: "https://timbuckdo.com/" },
  { slug: "careerview", url: "https://career-view-ui-dev.vercel.app/" },
  { slug: "chf", url: "https://chfusa.org/", wait: 6000 },
];

const only = process.argv[2];

async function settle(page, ms) {
  await page.waitForTimeout(ms);
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 250));
    }
    window.scrollTo(0, 0);
  });
}

const browser = await chromium.launch({ executablePath: CHROME });
for (const site of SITES.filter((s) => !only || s.slug === only)) {
  const dir = `public/work/${site.slug}`;
  await mkdir(dir, { recursive: true });
  const wait = site.wait ?? 4000;
  try {
    const desk = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    await desk.goto(site.url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
    await settle(desk, wait);
    if (site.before) { await site.before(desk).catch(() => {}); await settle(desk, 2500); }
    await desk.screenshot({ path: `${dir}/desktop.jpg`, type: "jpeg", quality: 84 });
    await scrollThrough(desk);
    await settle(desk, 1500);
    await desk.screenshot({ path: `${dir}/full.jpg`, type: "jpeg", quality: 78, fullPage: true });
    await desk.close();

    const mob = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    await mob.goto(site.url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
    await settle(mob, wait);
    if (site.before) { await site.before(mob).catch(() => {}); await settle(mob, 2500); }
    await mob.screenshot({ path: `${dir}/mobile.jpg`, type: "jpeg", quality: 84 });
    await mob.close();
    console.log("ok", site.slug);
  } catch (e) {
    console.log("fail", site.slug, e.message);
  }
}
await browser.close();
