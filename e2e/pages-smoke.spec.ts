import { test, expect } from "@playwright/test";

test.describe("Other Pages Smoke Tests", () => {
  test("/dashboard redirects to /login when unauthenticated", async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForURL(/\/(login|api\/auth)/);
    // Should have been redirected away from dashboard
    expect(page.url()).not.toContain("/dashboard");
  });

  test("/pricing loads with plan cards", async ({ page }) => {
    await page.goto("/pricing");
    await page.waitForLoadState("networkidle");

    // Should show pricing heading and plan options
    await expect(page.getByText(/pricing/i).first()).toBeVisible();
    // Should have at least one plan card with a price
    await expect(page.getByText(/₹/).first()).toBeVisible();
  });

  test("/blog loads with post links", async ({ page }) => {
    await page.goto("/blog");
    await page.waitForLoadState("networkidle");

    // Should have blog heading
    await expect(page.getByRole("heading").first()).toBeVisible();
    // Should have at least one post link
    const blogLinks = page.locator('a[href*="/blog/"]');
    const count = await blogLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("clicking a blog post navigates to the post page", async ({ page }) => {
    await page.goto("/blog");
    await page.waitForLoadState("networkidle");

    // Get the href of the first blog post link
    const firstPost = page.locator('a[href*="/blog/"]').first();
    const href = await firstPost.getAttribute("href");
    expect(href).toBeTruthy();

    // Click and wait for navigation
    await firstPost.click();
    await page.waitForURL(/\/blog\/.+/);

    // Should be on a blog post page with content
    expect(page.url()).toMatch(/\/blog\/.+/);
    await expect(page.getByRole("heading").first()).toBeVisible();
  });

  test("/contact loads without crash", async ({ page }) => {
    const response = await page.goto("/contact");
    expect(response?.status()).toBeLessThan(500);
    await page.waitForLoadState("networkidle");
    // Page should have some content (heading or text)
    await expect(page.getByRole("heading").first()).toBeVisible();
  });

  test("/terms loads without crash", async ({ page }) => {
    const response = await page.goto("/terms");
    expect(response?.status()).toBeLessThan(500);
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading").first()).toBeVisible();
  });
});
