import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page loads and displays hero section", async ({ page }) => {
    // Hero heading should be visible
    await expect(
      page.getByRole("heading", { name: /beautifully crafted/i })
    ).toBeVisible();

    // Tagline text should be present
    await expect(
      page.getByText(/create a stunning marriage biodata/i)
    ).toBeVisible();

    // Ornamental top badge
    await expect(
      page.getByText(/india's most loved biodata maker/i)
    ).toBeVisible();
  });

  test("CTA buttons are visible and link correctly", async ({ page }) => {
    // Primary CTA — "Start Creating"
    const startCta = page.getByRole("link", {
      name: /start creating/i,
    });
    await expect(startCta).toBeVisible();
    await expect(startCta).toHaveAttribute("href", "/create");

    // Secondary CTA — "Browse Templates"
    const templatesCta = page.getByRole("link", {
      name: /browse templates/i,
    });
    await expect(templatesCta).toBeVisible();
    await expect(templatesCta).toHaveAttribute("href", "/templates");
  });

  test("navigation links are present", async ({ page }) => {
    const nav = page.locator("header");

    // Logo / brand name
    await expect(nav.getByText("BiodataCraft")).toBeVisible();

    // Nav links
    await expect(nav.getByRole("link", { name: "Templates" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Pricing" })).toBeVisible();
    await expect(
      nav.getByRole("link", { name: /how it works/i })
    ).toBeVisible();
  });

  test("marketing sections render", async ({ page }) => {
    // How It Works section
    await expect(page.getByText(/how it works/i).first()).toBeVisible();

    // Template Showcase section
    await expect(page.getByText(/template/i).first()).toBeVisible();

    // Pricing section
    await expect(page.getByText(/pricing/i).first()).toBeVisible();

    // Testimonials section
    await expect(page.getByText(/testimonial/i).first()).toBeVisible();

    // FAQ section
    await expect(page.getByText(/faq/i).first()).toBeVisible();
  });

  test("clicking primary CTA navigates to /create", async ({ page }) => {
    await page.getByRole("link", { name: /start creating/i }).click();
    await expect(page).toHaveURL(/\/create/);
  });

  test("clicking Templates nav link navigates to /templates", async ({
    page,
  }) => {
    await page
      .locator("header")
      .getByRole("link", { name: "Templates" })
      .click();
    await expect(page).toHaveURL(/\/templates/);
  });

  test("footer is visible", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });
});
