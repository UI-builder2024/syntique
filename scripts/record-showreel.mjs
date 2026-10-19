// Renders /showreel to a smooth, frame-exact MP4 for social posts.
// Usage (with `npm run dev` or `npm start` running):
//   node scripts/record-showreel.mjs [landscape|vertical] [baseUrl]
// Output: marketing/showreel-<format>.mp4 (needs ffmpeg on PATH).
//
// Time is virtual: Playwright's clock drives timers, rAF and performance.now, and every Web Animation
// (Motion's hardware-accelerated tweens, CSS keyframes) is stepped to the same clock before each
// screenshot. So the output is a true 30 fps regardless of how fast the machine renders.
import { chromium } from "playwright-core";
import { mkdir, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const FPS = 30;
const format = process.argv[2] === "vertical" ? "vertical" : "landscape";
const base = process.argv[3] ?? "http://localhost:3000";
const size = format === "vertical" ? { width: 1080, height: 1920 } : { width: 1920, height: 1080 };
const tmp = `marketing/tmp-${format}`;
const url = `${base}/showreel?once=1&format=${format}`;

await rm(tmp, { recursive: true, force: true });
await mkdir(tmp, { recursive: true });
const browser = await chromium.launch({ executablePath: CHROME });

// Warm-up pass in real time so every image is compiled and cached.
const warm = await browser.newPage({ viewport: size });
await warm.goto(url, { waitUntil: "networkidle" });
await warm.waitForFunction(() => window.__showreelDone === true, null, { timeout: 180000 });
await warm.close();

const page = await browser.newPage({ viewport: size });
// Freeze the clock before load so time only moves when we step it.
await page.clock.install({ time: 0 });
await page.clock.pauseAt(1000);
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

const step = async () => {
  await page.clock.runFor(1000 / FPS);
  await page.evaluate(() => {
    const now = performance.now();
    const births = (window.__births ??= new WeakMap());
    for (const a of document.getAnimations()) {
      if (!births.has(a)) births.set(a, now - 1000 / 30);
      const t = now - births.get(a);
      const end = a.effect?.getComputedTiming().endTime ?? 0;
      if (Number.isFinite(end) && t >= end) a.finish();
      else {
        a.pause();
        a.currentTime = t;
      }
    }
  });
};

let n = 0;
for (; n < FPS * 120; n++) {
  await step();
  await page.screenshot({ path: `${tmp}/f${String(n).padStart(5, "0")}.jpg`, type: "jpeg", quality: 92 });
  if (await page.evaluate(() => window.__showreelDone === true)) break;
  if (n % 150 === 0) process.stdout.write(`  ${(n / FPS).toFixed(0)}s…\n`);
}
await browser.close();

const out = `marketing/showreel-${format}.mp4`;
execFileSync(
  "ffmpeg",
  ["-y", "-framerate", String(FPS), "-i", `${tmp}/f%05d.jpg`, "-c:v", "libx264", "-crf", "16", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out],
  { stdio: "ignore" },
);
await rm(tmp, { recursive: true, force: true });
console.log(`${out} — ${n + 1} frames, ${((n + 1) / FPS).toFixed(1)}s`);
