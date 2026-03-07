import { Page, expect } from "@playwright/test";

/**
 * Interact with a shadcn/Radix Select by finding the combobox trigger
 * inside the FormFieldWrapper that contains the given label text.
 */
async function selectOption(page: Page, labelText: string, optionText: string) {
  const wrapper = page
    .locator("div.space-y-2", { has: page.locator(`text="${labelText}"`) })
    .first();
  await wrapper.getByRole("combobox").click();
  await page.getByRole("option", { name: optionText, exact: true }).click();
}

/** Fill all required fields on Step 1 (Personal Details) */
export async function fillStep1Required(page: Page) {
  await page.getByPlaceholder("Enter full name").fill("Rahul Sharma");
  // Date input — find by type near the "Date of Birth" label
  await page
    .locator("div.space-y-2", { has: page.locator('text="Date of Birth"') })
    .locator('input[type="date"]')
    .fill("1995-06-15");
  await selectOption(page, "Height", '5\'8"');
  await selectOption(page, "Religion", "Hindu");
  await selectOption(page, "Mother Tongue", "Hindi");
  await page.getByPlaceholder("e.g., Mumbai").fill("Mumbai");
  await selectOption(page, "Current State", "Maharashtra");
}

/** Fill all required fields on Step 2 (Education & Career) */
export async function fillStep2Required(page: Page) {
  await selectOption(page, "Highest Education", "B.Tech/B.E.");
  await selectOption(page, "Occupation", "Private Job");
}

/** Fill all required fields on Step 3 (Family Details) */
export async function fillStep3Required(page: Page) {
  await page.getByPlaceholder("Enter father's name").fill("Suresh Sharma");
  await selectOption(page, "Father's Occupation", "Business");
  await page.getByPlaceholder("Enter mother's name").fill("Sunita Sharma");
}

/** Fill required field on Step 6 (Photos & Contact) — phone number */
export async function fillStep6Required(page: Page) {
  await page.getByPlaceholder("9876543210").fill("9876543210");
}

/** Click "Next" and wait for the step heading to change */
export async function clickNext(page: Page) {
  const stepHeading = page.locator("h2").first();
  const currentText = await stepHeading.textContent();

  await page.getByRole("button", { name: /^Next$/i }).first().click();

  // Wait for animation + new step heading to appear (different from current)
  await expect(async () => {
    const newText = await stepHeading.textContent();
    expect(newText).not.toBe(currentText);
  }).toPass({ timeout: 3000 });
}

/** Click "Previous" and wait for the step heading to change */
export async function clickPrevious(page: Page) {
  const stepHeading = page.locator("h2").first();
  const currentText = await stepHeading.textContent();

  await page.getByRole("button", { name: /^Previous$/i }).first().click();

  await expect(async () => {
    const newText = await stepHeading.textContent();
    expect(newText).not.toBe(currentText);
  }).toPass({ timeout: 3000 });
}

/** Remove Zustand persisted store from localStorage and reload */
export async function clearStore(page: Page) {
  await page.evaluate(() => localStorage.removeItem("biodata-craft-store"));
  await page.reload();
  await page.waitForLoadState("networkidle");
}
