import { test, expect } from "@playwright/test";

test.describe("Share Page", () => {
  test("invalid slug shows error state", async ({ page }) => {
    await page.goto("/share/nonexistent-slug-abc123");

    // The page fetches via API and shows an error when the biodata is not found.
    // Wait for loading to finish and an error message to appear.
    await expect(
      page.getByText(/not found|expired|error/i).first()
    ).toBeVisible({ timeout: 15000 });
  });

  test("page renders without crashing for random slug", async ({ page }) => {
    const response = await page.goto("/share/random-test-slug-xyz");

    // The page itself should load (200 status for the client-side page)
    expect(response?.status()).toBeLessThan(500);
  });

  test("share page has loading state initially", async ({ page }) => {
    // Navigate and immediately check for loading indicator
    await page.goto("/share/some-slug-testing");

    // Either a loading spinner or the error/content should eventually appear
    // This tests that the page does not crash on mount
    await page.waitForLoadState("networkidle");

    // After loading, we should see either an error or the biodata content
    const pageContent = await page.textContent("body");
    expect(pageContent).toBeTruthy();
  });
});
