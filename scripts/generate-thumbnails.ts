/**
 * Generate PNG thumbnails for all 14 templates.
 *
 * Usage:
 *   1. Start dev server: npm run dev
 *   2. Run: npx tsx scripts/generate-thumbnails.ts
 *
 * Or use the npm script: npm run generate:thumbnails
 * (this starts the dev server automatically via Playwright webServer config)
 */

import { chromium } from "playwright";
import path from "path";
import fs from "fs";

const BASE_URL = "http://localhost:3000";
const OUTPUT_DIR = path.join(process.cwd(), "public", "templates");

async function main() {
  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log("Launching browser...");
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 900 },
    deviceScaleFactor: 2, // Retina-quality screenshots
  });

  console.log("Navigating to /dev/thumbnails...");
  await page.goto(`${BASE_URL}/dev/thumbnails`, {
    waitUntil: "networkidle",
    timeout: 30000,
  });

  // Wait for templates to render (store needs time to populate)
  await page.waitForSelector("[data-template-id]", { timeout: 15000 });
  // Extra wait for fonts and images to load
  await page.waitForTimeout(2000);

  const templates = await page.$$("[data-template-id]");
  console.log(`Found ${templates.length} templates to screenshot.\n`);

  for (const element of templates) {
    const templateId = await element.getAttribute("data-template-id");
    if (!templateId) continue;

    const outputPath = path.join(OUTPUT_DIR, `${templateId}.png`);

    await element.screenshot({
      path: outputPath,
      type: "png",
    });

    const stats = fs.statSync(outputPath);
    const sizeKb = Math.round(stats.size / 1024);
    console.log(`  ✓ ${templateId}.png (${sizeKb} KB)`);
  }

  await browser.close();
  console.log(`\nDone! ${templates.length} thumbnails saved to public/templates/`);
}

main().catch((err) => {
  console.error("Failed to generate thumbnails:", err);
  process.exit(1);
});
