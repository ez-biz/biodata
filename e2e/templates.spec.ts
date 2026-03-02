import { test, expect } from "@playwright/test";

test.describe("Templates Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/templates");
  });

  test("page loads with heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /biodata templates/i })
    ).toBeVisible();

    await expect(
      page.getByText(/choose from our collection/i)
    ).toBeVisible();
  });

  test("template cards are displayed", async ({ page }) => {
    // Template cards are rendered as links to /create?template=...
    const templateLinks = page.locator('a[href^="/create?template="]');
    const count = await templateLinks.count();

    expect(count).toBeGreaterThan(0);
  });

  test("category filter buttons are visible", async ({ page }) => {
    // The "All" filter should be present
    await expect(
      page.getByRole("button", { name: "All" })
    ).toBeVisible();

    // "Traditional" category
    await expect(
      page.getByRole("button", { name: "Traditional" })
    ).toBeVisible();

    // "Modern" category
    await expect(
      page.getByRole("button", { name: "Modern" })
    ).toBeVisible();
  });

  test("clicking a category filter updates displayed templates", async ({
    page,
  }) => {
    // Get initial count of template cards
    const allTemplates = page.locator('a[href^="/create?template="]');
    const initialCount = await allTemplates.count();

    // Click "Traditional" filter
    await page.getByRole("button", { name: "Traditional" }).click();

    // After filtering, we may have fewer templates (or same if all are traditional)
    const filteredCount = await allTemplates.count();
    expect(filteredCount).toBeGreaterThan(0);
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test("clicking 'All' filter shows all templates", async ({ page }) => {
    // First filter to a category
    await page.getByRole("button", { name: "Traditional" }).click();
    const filteredCount = await page
      .locator('a[href^="/create?template="]')
      .count();

    // Then click "All"
    await page.getByRole("button", { name: "All" }).click();
    const allCount = await page
      .locator('a[href^="/create?template="]')
      .count();

    expect(allCount).toBeGreaterThanOrEqual(filteredCount);
  });

  test("each template card shows name and tier badge", async ({ page }) => {
    // At least one card should have a "Free" or "Premium" badge
    const badges = page.getByText(/^(Free|Premium)$/);
    const badgeCount = await badges.count();
    expect(badgeCount).toBeGreaterThan(0);
  });

  test("clicking a template card navigates to /create with template param", async ({
    page,
  }) => {
    const firstCard = page.locator('a[href^="/create?template="]').first();
    await firstCard.click();

    await expect(page).toHaveURL(/\/create\?template=/);
  });

  test("footer is present on templates page", async ({ page }) => {
    await expect(page.locator("footer")).toBeVisible();
  });
});
