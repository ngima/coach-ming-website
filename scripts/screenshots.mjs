import { chromium } from "@playwright/test";
import fs from "node:fs";
const out = process.argv[2];
fs.mkdirSync(out, { recursive: true });
const base = "http://localhost:3000";
const browser = await chromium.launch();
const pages = ["/", "/services", "/about", "/contact"];
const errors = [];
for (const [name, vp] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  page.on("console", (m) => { if (m.type() === "error") errors.push(`${name} console: ${m.text()}`); });
  page.on("pageerror", (e) => errors.push(`${name} pageerror: ${e.message}`));
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    const slug = p === "/" ? "home" : p.slice(1);
    await page.screenshot({ path: `${out}/${name}-${slug}-fold.png` });
    // scroll through to trigger reveals, then full page
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise(r => setTimeout(r, 120)); } window.scrollTo({ top: 0, behavior: 'instant' }); });
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${out}/${name}-${slug}-full.png`, fullPage: true });
  }
  if (name === "mobile") {
    await page.goto(base + "/", { waitUntil: "networkidle" });
    await page.click('button[aria-controls="mobile-menu"]');
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${out}/mobile-menu.png` });
  }
  if (name === "desktop") {
    await page.goto(base + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    await page.click('[role="tab"]:nth-child(3)');
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${out}/desktop-panel-wk8.png`, clip: { x: 720, y: 60, width: 720, height: 840 } });
  }
  await ctx.close();
}
await browser.close();
fs.writeFileSync(`${out}/errors.txt`, errors.join("\n"));
console.log("done", errors.length, "errors");
