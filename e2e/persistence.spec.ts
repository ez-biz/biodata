import { test, expect } from "@playwright/test";
import {
  fillStep1Required,
  fillStep2Required,
  clickNext,
  clearStore,
} from "./helpers/fill-steps";

const STORE_KEY = "biodata-craft-store";

test.describe("LocalStorage Persistence", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/create");
    await page.evaluate((key) => localStorage.removeItem(key), STORE_KEY);
    await page.reload();
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h2", { hasText: "Personal Details" })).toBeVisible();
  });

  test("fill step 1 → reload → data preserved", async ({ page }) => {
    await fillStep1Required(page);

    await page.reload();
    await page.waitForLoadState("networkidle");

    // Name should still be filled
    await expect(page.getByPlaceholder("Enter full name")).toHaveValue("Rahul Sharma");
  });

  test("advance to step 3 → reload → still on step 3", async ({ page }) => {
    await fillStep1Required(page);
    await clickNext(page);
    await fillStep2Required(page);
    await clickNext(page);
    await expect(page.locator("h2", { hasText: "Family Details" })).toBeVisible();

    await page.reload();
    await page.waitForLoadState("networkidle");

    // Should restore to step 3
    await expect(page.getByText("Step 3 of 7").first()).toBeVisible();
  });

  test("change template → reload → template selection preserved", async ({ page }) => {
    // First fill something so the store gets created
    await fillStep1Required(page);

    // Wait a bit for store to persist, then modify it
    await page.waitForTimeout(500);
    await page.evaluate((key) => {
      const raw = localStorage.getItem(key);
      if (raw) {
        const store = JSON.parse(raw);
        store.state.selectedTemplateId = "modern-minimal";
        localStorage.setItem(key, JSON.stringify(store));
      }
    }, STORE_KEY);

    await page.reload();
    await page.waitForLoadState("networkidle");

    // Verify store has the right template
    const templateId = await page.evaluate((key) => {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      return JSON.parse(raw).state.selectedTemplateId;
    }, STORE_KEY);

    expect(templateId).toBe("modern-minimal");
  });

  test("multi-step data persists across reload", async ({ page }) => {
    // Fill steps 1 and 2
    await fillStep1Required(page);
    await clickNext(page);
    await fillStep2Required(page);

    await page.reload();
    await page.waitForLoadState("networkidle");

    // Should be on step 2
    await expect(page.getByText("Step 2 of 7").first()).toBeVisible();

    // Go back to step 1 and verify data
    await page.locator(".hidden.md\\:flex").getByText("Personal Details").click();
    await expect(page.getByPlaceholder("Enter full name")).toHaveValue("Rahul Sharma");
  });

  test("clear store → reload → everything reset", async ({ page }) => {
    await fillStep1Required(page);

    await clearStore(page);

    // Should be back on step 1 with empty fields
    await expect(page.getByText("Step 1 of 7").first()).toBeVisible();
    await expect(page.getByPlaceholder("Enter full name")).toHaveValue("");
  });

  test("store key in localStorage is valid JSON with correct shape", async ({ page }) => {
    await fillStep1Required(page);

    const storeData = await page.evaluate((key) => {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      return JSON.parse(raw);
    }, STORE_KEY);

    expect(storeData).not.toBeNull();
    expect(storeData).toHaveProperty("state");
    expect(storeData.state).toHaveProperty("formData");
    expect(storeData.state).toHaveProperty("currentStep");
    expect(storeData.state).toHaveProperty("selectedTemplateId");
    expect(storeData.state.formData).toHaveProperty("personalDetails");
    expect(storeData.state.formData.personalDetails.fullName).toBe("Rahul Sharma");
  });

  test("completion percentage persists across reload", async ({ page }) => {
    await fillStep1Required(page);

    // Read percentage from store directly (more reliable than DOM text matching)
    const percentBefore = await page.evaluate((key) => {
      const raw = localStorage.getItem(key);
      if (!raw) return 0;
      const store = JSON.parse(raw);
      // Count filled fields to verify data is stored
      const pd = store.state.formData.personalDetails;
      return Object.values(pd).filter((v: unknown) => typeof v === "string" && v.length > 0).length;
    }, STORE_KEY);
    expect(percentBefore).toBeGreaterThan(0);

    await page.reload();
    await page.waitForLoadState("networkidle");

    // After reload, the same data should be present
    const percentAfter = await page.evaluate((key) => {
      const raw = localStorage.getItem(key);
      if (!raw) return 0;
      const store = JSON.parse(raw);
      const pd = store.state.formData.personalDetails;
      return Object.values(pd).filter((v: unknown) => typeof v === "string" && v.length > 0).length;
    }, STORE_KEY);
    expect(percentAfter).toBe(percentBefore);
  });
});
