import { test, expect } from "@playwright/test";
import { fillStep1Required } from "./helpers/fill-steps";

test.describe("Mobile Viewport UI", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/create");
    await page.evaluate(() => localStorage.removeItem("biodata-craft-store"));
    await page.reload();
    await page.waitForLoadState("networkidle");
    // Wait for form heading (h2) which is always visible regardless of viewport
    await expect(page.locator("h2", { hasText: "Personal Details" })).toBeVisible();
  });

  test("mobile step dropdown trigger is visible", async ({ page }) => {
    // Mobile step selector shows current step name in its button
    const mobileTrigger = page.locator("button", { hasText: "Personal Details" }).filter({ has: page.locator("svg") });
    await expect(mobileTrigger.first()).toBeVisible();
  });

  test("dropdown opens showing all 7 steps with percentages", async ({ page }) => {
    // Click the mobile step selector button (the one with chevron icon)
    const mobileTrigger = page.locator("button").filter({ hasText: /Personal Details/ }).filter({ has: page.locator("svg.flex-shrink-0") });
    await mobileTrigger.first().click();

    // All 7 steps should appear in the dropdown
    const dropdown = page.locator(".animate-scale-in");
    await expect(dropdown).toBeVisible();
    await expect(dropdown.getByText("Personal Details")).toBeVisible();
    await expect(dropdown.getByText("Education & Career")).toBeVisible();
    await expect(dropdown.getByText("Family Details")).toBeVisible();
    await expect(dropdown.getByText("Lifestyle")).toBeVisible();
    await expect(dropdown.getByText("Partner Preferences")).toBeVisible();
    await expect(dropdown.getByText("Photos & Contact")).toBeVisible();
    await expect(dropdown.getByText(/Horoscope/)).toBeVisible();

    // Each step shows a percentage
    const percentages = dropdown.locator("button").filter({ hasText: /\d+%/ });
    await expect(percentages).toHaveCount(7);
  });

  test("selecting a step in the dropdown navigates to it", async ({ page }) => {
    // Open dropdown
    const mobileTrigger = page.locator("button").filter({ hasText: /Personal Details/ }).filter({ has: page.locator("svg.flex-shrink-0") });
    await mobileTrigger.first().click();

    const dropdown = page.locator(".animate-scale-in");
    await expect(dropdown).toBeVisible();

    // Click "Lifestyle" step
    await dropdown.getByText("Lifestyle").click();

    // Should now be on step 4
    await expect(page.getByText("Step 4 of 7")).toBeVisible();
  });

  test("mobile sticky bottom nav shows Previous and Next", async ({ page }) => {
    const bottomNav = page.locator(".mobile-nav-bar");
    await expect(bottomNav.getByRole("button", { name: /Previous/i })).toBeVisible();
    await expect(bottomNav.getByRole("button", { name: /Next/i })).toBeVisible();
  });

  test("mobile navigation works for step transitions", async ({ page }) => {
    await fillStep1Required(page);

    // The mobile Preview FAB overlaps the bottom nav — hide it first
    await page.locator(".mobile-preview-fab").evaluate((el) => (el as HTMLElement).style.display = "none");

    // Use the mobile bottom nav Next button
    const bottomNav = page.locator(".mobile-nav-bar");
    await bottomNav.getByRole("button", { name: /Next/i }).click();

    // Should advance to step 2
    await expect(page.getByText("Step 2 of 7").first()).toBeVisible({ timeout: 3000 });
  });

  test("desktop step pills are not visible on mobile", async ({ page }) => {
    // Desktop pills are in a container with "hidden md:flex"
    // On mobile (<md), the container should not be visible
    const desktopPillContainer = page.locator("div.hidden").filter({ hasText: "Education & Career" }).first();
    await expect(desktopPillContainer).toBeHidden();
  });

  test("desktop preview sidebar is not visible on mobile", async ({ page }) => {
    // On mobile the preview is a sheet/bottom drawer, not always-visible sidebar
    await expect(page.getByText("Live Preview")).not.toBeVisible();
  });
});
