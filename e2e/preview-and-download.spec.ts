import { test, expect } from "@playwright/test";
import { fillStep1Required } from "./helpers/fill-steps";

test.describe("Preview & Templates", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/create");
    await page.evaluate(() => localStorage.removeItem("biodata-craft-store"));
    await page.reload();
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h2", { hasText: "Personal Details" })).toBeVisible();

    // Fill step 1 so preview has content to show
    await fillStep1Required(page);
  });

  test("clicking Preview opens the preview panel", async ({ page }) => {
    // Click the Preview button (outline variant)
    await page.getByRole("button", { name: /^Preview$/i }).first().click();

    // Preview panel should be visible with Download PDF button
    await expect(page.getByRole("button", { name: /Download PDF/i })).toBeVisible({ timeout: 5000 });
  });

  test("preview shows the filled name in the template", async ({ page }) => {
    await page.getByRole("button", { name: /^Preview$/i }).first().click();
    await expect(page.getByRole("button", { name: /Download PDF/i })).toBeVisible({ timeout: 5000 });

    // The template should render the name we filled
    await expect(page.getByText("Rahul Sharma").first()).toBeVisible();
  });

  test('template dropdown defaults to "Traditional Classic"', async ({ page }) => {
    await page.getByRole("button", { name: /^Preview$/i }).first().click();
    await expect(page.getByRole("button", { name: /Download PDF/i })).toBeVisible({ timeout: 5000 });

    // The template select should show "Traditional Classic"
    await expect(page.getByText("Traditional Classic").first()).toBeVisible();
  });

  test("switching template changes the preview", async ({ page }) => {
    await page.getByRole("button", { name: /^Preview$/i }).first().click();
    await expect(page.getByRole("button", { name: /Download PDF/i })).toBeVisible({ timeout: 5000 });

    // Find the template selector combobox — it shows "Traditional Classic"
    const templateSelect = page.getByRole("combobox").filter({ hasText: /Traditional Classic/ });
    await templateSelect.click();
    await page.getByRole("option", { name: /Modern Minimal/i }).click();

    // The dropdown should now show the new template
    await expect(page.getByText("Modern Minimal").first()).toBeVisible();
  });

  test("color swatches visible for multi-scheme templates", async ({ page }) => {
    await page.getByRole("button", { name: /^Preview$/i }).first().click();
    await expect(page.getByRole("button", { name: /Download PDF/i })).toBeVisible({ timeout: 5000 });

    // Color swatches are buttons with title + inline backgroundColor style
    const swatches = page.locator("button.rounded-full[title][style*='background-color']");
    const count = await swatches.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("clicking a different swatch changes its selected styling", async ({ page }) => {
    await page.getByRole("button", { name: /^Preview$/i }).first().click();
    await expect(page.getByRole("button", { name: /Download PDF/i })).toBeVisible({ timeout: 5000 });

    const swatches = page.locator("button.rounded-full[title][style*='background-color']");
    const swatchCount = await swatches.count();

    if (swatchCount >= 2) {
      // Click the second swatch
      await swatches.nth(1).click();

      // The second swatch should now have the selected border style
      await expect(swatches.nth(1)).toHaveClass(/border-primary/);
    }
  });

  test('"Browse" opens the template picker grid', async ({ page }) => {
    await page.getByRole("button", { name: /^Preview$/i }).first().click();
    await expect(page.getByRole("button", { name: /Download PDF/i })).toBeVisible({ timeout: 5000 });

    // Click Browse button
    await page.getByRole("button", { name: /^Browse$/i }).click();

    // Template picker grid should appear with "Choose a template" text
    await expect(page.getByText("Choose a template")).toBeVisible();
  });

  test('"Download PDF" opens PdfPreviewModal', async ({ page }) => {
    await page.getByRole("button", { name: /^Preview$/i }).first().click();
    await expect(page.getByRole("button", { name: /Download PDF/i })).toBeVisible({ timeout: 5000 });

    // Click Download PDF
    await page.getByRole("button", { name: /Download PDF/i }).click();

    // PdfPreviewModal should open with its heading
    await expect(page.getByText("Preview Your Biodata")).toBeVisible({ timeout: 3000 });
    await expect(page.getByText("Go Back & Edit")).toBeVisible();
  });

  test('"Go Back & Edit" closes the PdfPreviewModal', async ({ page }) => {
    await page.getByRole("button", { name: /^Preview$/i }).first().click();
    await expect(page.getByRole("button", { name: /Download PDF/i })).toBeVisible({ timeout: 5000 });

    // Open modal
    await page.getByRole("button", { name: /Download PDF/i }).click();
    await expect(page.getByText("Preview Your Biodata")).toBeVisible({ timeout: 3000 });

    // Close it
    await page.getByText("Go Back & Edit").click();

    // Modal should be gone
    await expect(page.getByText("Preview Your Biodata")).not.toBeVisible();
  });
});
