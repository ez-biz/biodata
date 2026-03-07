import { test, expect } from "@playwright/test";
import {
  fillStep1Required,
  fillStep2Required,
  fillStep3Required,
  fillStep6Required,
  clickNext,
  clickPrevious,
  clearStore,
} from "./helpers/fill-steps";

test.describe("Wizard Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/create");
    await page.evaluate(() => localStorage.removeItem("biodata-craft-store"));
    await page.reload();
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h2", { hasText: "Personal Details" })).toBeVisible();
  });

  test("advances to step 2 after filling valid step 1 data", async ({ page }) => {
    await fillStep1Required(page);
    await clickNext(page);
    await expect(page.getByText("Education & Career").first()).toBeVisible();
  });

  test("Next then Previous returns to step 1", async ({ page }) => {
    await fillStep1Required(page);
    await clickNext(page);
    await expect(page.getByText("Education & Career").first()).toBeVisible();
    await clickPrevious(page);
    await expect(page.locator("h2", { hasText: "Personal Details" })).toBeVisible();
  });

  test("navigates all 7 steps sequentially", async ({ page }) => {
    // Step 1 → 2
    await fillStep1Required(page);
    await clickNext(page);
    await expect(page.getByText("Education & Career").first()).toBeVisible();

    // Step 2 → 3
    await fillStep2Required(page);
    await clickNext(page);
    await expect(page.getByText("Family Details").first()).toBeVisible();

    // Step 3 → 4
    await fillStep3Required(page);
    await clickNext(page);
    await expect(page.getByText("Lifestyle").first()).toBeVisible();

    // Step 4 → 5 (optional)
    await clickNext(page);
    await expect(page.getByText("Partner Preferences").first()).toBeVisible();

    // Step 5 → 6 (optional)
    await clickNext(page);
    await expect(page.getByText("Photos & Contact").first()).toBeVisible();

    // Step 6 → 7
    await fillStep6Required(page);
    await clickNext(page);
    await expect(page.getByText(/Horoscope/i).first()).toBeVisible();
  });

  test("clicking desktop step pill jumps directly to that step", async ({ page }) => {
    // Click "Family Details" pill (step 3) — pills don't validate
    await page.locator(".hidden.md\\:flex").getByText("Family Details").click();
    await expect(page.getByText("Information about family members").first()).toBeVisible();
  });

  test("step pill loses amber styling after required fields are filled", async ({ page }) => {
    // Navigate away so step 1 pill shows amber (missing required fields)
    await page.locator(".hidden.md\\:flex").getByText("Education & Career").click();
    const step1Pill = page.locator(".hidden.md\\:flex button").filter({ hasText: "Personal Details" });
    await expect(step1Pill).toHaveClass(/bg-amber/);

    // Go back and fill required fields
    await step1Pill.click();
    await fillStep1Required(page);

    // Navigate away again — pill should no longer be amber
    await page.locator(".hidden.md\\:flex").getByText("Education & Career").click();
    await expect(step1Pill).not.toHaveClass(/bg-amber/);
  });

  test("step pill shows amber badge for missing required fields", async ({ page }) => {
    // Navigate away from step 1 without filling it (via pill click)
    await page.locator(".hidden.md\\:flex").getByText("Education & Career").click();
    await expect(page.getByText("Educational qualifications").first()).toBeVisible();

    // Step 1 pill should have amber styling (missing required fields)
    const step1Pill = page.locator(".hidden.md\\:flex button").filter({ hasText: "Personal Details" });
    await expect(step1Pill).toHaveClass(/bg-amber/);
  });

  test("completion percentage updates as fields are filled", async ({ page }) => {
    // Initially should show 0% (or a small percentage from default nationality)
    const percentageBadge = page.getByText(/%/).first();
    const initialText = await percentageBadge.textContent();
    const initialPercent = parseInt(initialText || "0");

    // Fill some fields
    await fillStep1Required(page);

    // Percentage should have increased
    const updatedText = await percentageBadge.textContent();
    const updatedPercent = parseInt(updatedText || "0");
    expect(updatedPercent).toBeGreaterThan(initialPercent);
  });

  test('step 7 shows "Preview & Download" instead of "Next"', async ({ page }) => {
    // Navigate directly to step 7 via pill
    await page.locator(".hidden.md\\:flex").getByText(/Horoscope/).click();
    await expect(page.getByText(/Horoscope/i).first()).toBeVisible();

    // Should show "Preview & Download" button, not "Next"
    await expect(page.getByRole("button", { name: /Preview & Download/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /^Next$/i })).not.toBeVisible();
  });

  test("Previous is disabled on step 1", async ({ page }) => {
    const prevButton = page.getByRole("button", { name: /^Previous$/i }).first();
    await expect(prevButton).toBeDisabled();
  });

  test('"Step N of 7" text is correct at each step', async ({ page }) => {
    await expect(page.getByText("Step 1 of 7")).toBeVisible();

    // Navigate to step 3 via pill
    await page.locator(".hidden.md\\:flex").getByText("Family Details").click();
    await expect(page.getByText("Step 3 of 7")).toBeVisible();

    // Navigate to step 7 via pill
    await page.locator(".hidden.md\\:flex").getByText(/Horoscope/).click();
    await expect(page.getByText("Step 7 of 7")).toBeVisible();
  });
});
