import { test, expect } from "@playwright/test";

test.describe("Create Biodata - Form Wizard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/create");
  });

  test("page loads with navbar and wizard", async ({ page }) => {
    // Navbar is present
    await expect(page.locator("header")).toBeVisible();

    // The wizard should show step 1 by default — "Personal Details"
    await expect(page.getByText(/personal details/i).first()).toBeVisible();
  });

  test("step 1 shows personal detail form fields", async ({ page }) => {
    // The first step should contain common personal fields.
    // Check for label text or placeholder text from the personal step.
    await expect(page.getByText(/full name/i).first()).toBeVisible();
  });

  test("step indicators are visible for all 7 steps", async ({ page }) => {
    // All step titles should appear in the wizard sidebar / stepper
    const stepTitles = [
      "Personal Details",
      "Education & Career",
      "Family Details",
      "Lifestyle",
      "Partner Preferences",
      "Photos & Contact",
      "Horoscope",
    ];

    for (const title of stepTitles) {
      await expect(page.getByText(title).first()).toBeVisible();
    }
  });

  test("next button is present on step 1", async ({ page }) => {
    const nextButton = page.getByRole("button", { name: /next/i });
    await expect(nextButton).toBeVisible();
  });

  test("previous button is disabled or hidden on step 1", async ({ page }) => {
    // On step 1 there should be no "Previous" / "Back" button, or it should be disabled
    const prevButton = page.getByRole("button", { name: /previous|back/i });
    const count = await prevButton.count();

    if (count > 0) {
      // If the button exists, it should be disabled
      await expect(prevButton.first()).toBeDisabled();
    }
    // Otherwise it is simply not rendered, which is also valid
  });

  test("can fill personal details fields", async ({ page }) => {
    // Fill the full name field
    const nameInput = page.getByLabel(/full name/i).or(
      page.locator('input[placeholder*="name" i]')
    );

    if ((await nameInput.count()) > 0) {
      await nameInput.first().fill("Priya Sharma");
      await expect(nameInput.first()).toHaveValue("Priya Sharma");
    }
  });

  test("preview button is available", async ({ page }) => {
    // There should be a preview button/FAB somewhere on the page
    const previewButton = page.getByRole("button", { name: /preview/i });
    await expect(previewButton.first()).toBeVisible();
  });
});

test.describe("Create Biodata - Template Selector via URL", () => {
  test("loading /create with template query param works", async ({ page }) => {
    await page.goto("/create?template=traditional-classic");

    // Page should load without error
    await expect(page.getByText(/personal details/i).first()).toBeVisible();
  });
});
