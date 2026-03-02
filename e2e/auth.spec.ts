import { test, expect } from "@playwright/test";

test.describe("Signup Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/signup");
  });

  test("page loads with heading and form fields", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /create your account/i })
    ).toBeVisible();

    // Form fields present
    await expect(page.getByLabel(/full name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();

    // Submit button
    await expect(
      page.getByRole("button", { name: /create account/i })
    ).toBeVisible();
  });

  test("Google OAuth button is visible", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /continue with google/i })
    ).toBeVisible();
  });

  test("has link to login page", async ({ page }) => {
    const loginLink = page.getByRole("link", { name: /log in/i });
    await expect(loginLink).toBeVisible();
    await expect(loginLink).toHaveAttribute("href", "/login");
  });

  test("form validation prevents empty submit (HTML required)", async ({
    page,
  }) => {
    // All fields have `required` attribute, so clicking submit with empty
    // fields should not navigate away. The browser handles validation natively.
    await page.getByRole("button", { name: /create account/i }).click();

    // Should remain on the signup page
    await expect(page).toHaveURL(/\/signup/);
  });

  test("password field enforces minLength of 6", async ({ page }) => {
    const passwordInput = page.getByLabel(/password/i);
    await expect(passwordInput).toHaveAttribute("minlength", "6");
  });
});

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("page loads with heading and form fields", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /welcome back/i })
    ).toBeVisible();

    // Form fields present
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();

    // Submit button
    await expect(
      page.getByRole("button", { name: /log in/i })
    ).toBeVisible();
  });

  test("Google OAuth button is visible", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /continue with google/i })
    ).toBeVisible();
  });

  test("has link to signup page", async ({ page }) => {
    const signupLink = page.getByRole("link", { name: /sign up/i });
    await expect(signupLink).toBeVisible();
    await expect(signupLink).toHaveAttribute("href", "/signup");
  });

  test("form validation prevents empty submit (HTML required)", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /log in/i }).click();

    // Should remain on the login page
    await expect(page).toHaveURL(/\/login/);
  });

  test("navigating from login to signup works", async ({ page }) => {
    await page.getByRole("link", { name: /sign up/i }).click();
    await expect(page).toHaveURL(/\/signup/);
  });
});
