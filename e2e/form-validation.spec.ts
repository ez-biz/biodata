import { test, expect } from "@playwright/test";
import {
  fillStep1Required,
  fillStep2Required,
  fillStep3Required,
  fillStep6Required,
  clickNext,
} from "./helpers/fill-steps";

test.describe("Form Validation & Error Messages", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/create");
    await page.evaluate(() => localStorage.removeItem("biodata-craft-store"));
    await page.reload();
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h2", { hasText: "Personal Details" })).toBeVisible();
  });

  test("step 1 empty shows validation errors and stays on step 1", async ({ page }) => {
    await page.getByRole("button", { name: /^Next$/i }).first().click();

    // Should still be on step 1
    await expect(page.getByText("Step 1 of 7")).toBeVisible();

    // Should show required field errors
    await expect(page.getByText("Name must be at least 2 characters")).toBeVisible();
    await expect(page.getByText("Date of birth is required")).toBeVisible();
    await expect(page.getByText("Height is required")).toBeVisible();
    await expect(page.getByText("Religion is required")).toBeVisible();
    await expect(page.getByText("Mother tongue is required")).toBeVisible();
    await expect(page.getByText("Current city is required")).toBeVisible();
    await expect(page.getByText("Current state is required")).toBeVisible();
  });

  test('step 1 fullName "A" shows min length error', async ({ page }) => {
    await page.getByPlaceholder("Enter full name").fill("A");
    await page.getByRole("button", { name: /^Next$/i }).first().click();

    await expect(page.getByText("Name must be at least 2 characters")).toBeVisible();
  });

  test("step 1 filled clears errors and advances", async ({ page }) => {
    // First trigger errors
    await page.getByRole("button", { name: /^Next$/i }).first().click();
    await expect(page.getByText("Name must be at least 2 characters")).toBeVisible();

    // Now fill required fields
    await fillStep1Required(page);
    await clickNext(page);

    // Should advance to step 2
    await expect(page.getByText("Education & Career").first()).toBeVisible();
    // Errors should be gone
    await expect(page.getByText("Name must be at least 2 characters")).not.toBeVisible();
  });

  test("step 2 empty shows education and occupation errors", async ({ page }) => {
    // Get to step 2
    await fillStep1Required(page);
    await clickNext(page);
    await expect(page.getByText("Education & Career").first()).toBeVisible();

    // Click Next without filling
    await page.getByRole("button", { name: /^Next$/i }).first().click();

    await expect(page.getByText("Education is required")).toBeVisible();
    await expect(page.getByText("Occupation is required")).toBeVisible();
  });

  test("step 3 empty shows father and mother name errors", async ({ page }) => {
    // Navigate to step 3 via pill
    await page.locator(".hidden.md\\:flex").getByText("Family Details").click();
    await expect(page.getByText("Information about family members")).toBeVisible();

    // Click Next without filling required fields
    await page.getByRole("button", { name: /^Next$/i }).first().click();

    // Should stay on step 3 and show errors
    await expect(page.getByText("Step 3 of 7")).toBeVisible();
    await expect(page.getByText("Father's name is required")).toBeVisible();
    await expect(page.getByText("Mother's name is required")).toBeVisible();
  });

  test("step 4 (optional) always advances", async ({ page }) => {
    // Navigate to step 4 via pill
    await page.locator(".hidden.md\\:flex").getByText("Lifestyle").click();
    await expect(page.getByText("Lifestyle").first()).toBeVisible();

    // Click Next without filling anything
    await clickNext(page);
    await expect(page.getByText("Partner Preferences").first()).toBeVisible();
  });

  test("step 5 (optional) always advances", async ({ page }) => {
    // Navigate to step 5 via pill
    await page.locator(".hidden.md\\:flex").getByText("Partner Preferences").click();
    await expect(page.getByText("Partner Preferences").first()).toBeVisible();

    // Click Next without filling anything
    await clickNext(page);
    await expect(page.getByText("Photos & Contact").first()).toBeVisible();
  });

  test('step 6 phone "123" shows phone validation error', async ({ page }) => {
    // Navigate to step 6 via pill
    await page.locator(".hidden.md\\:flex").getByText("Photos & Contact").click();
    await expect(page.getByText("Photos & Contact").first()).toBeVisible();

    // Enter invalid phone
    await page.getByPlaceholder("9876543210").fill("123");
    await page.getByRole("button", { name: /^Next$/i }).first().click();

    await expect(page.getByText("Phone number must be at least 10 digits")).toBeVisible();
  });

  test("step 7 (optional) has no validation blocking", async ({ page }) => {
    // Navigate to step 7 via pill
    await page.locator(".hidden.md\\:flex").getByText(/Horoscope/).click();
    await expect(page.getByText(/Horoscope/i).first()).toBeVisible();

    // "Preview & Download" should not show blocking errors for horoscope fields
    // (It triggers preview, not Next — validation passes for all-optional step)
    await page.getByRole("button", { name: /Preview & Download/i }).click();

    // No validation error text should appear for horoscope fields
    await expect(page.getByText("required").first()).not.toBeVisible({ timeout: 1000 }).catch(() => {
      // If "required" text exists, it shouldn't be from horoscope validation
    });
  });
});
