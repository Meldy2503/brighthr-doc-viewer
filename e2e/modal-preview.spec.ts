import { test, expect } from "@playwright/test";

test.describe("File Preview (Modal)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Ensure the list is loaded
    await expect(page.getByTestId("file-row").first()).toBeVisible();
  });

  test("should open/close modal and verify content", async ({ page }) => {
    const fileName = "Employee Handbook 2026";
    const fileRow = page.getByTestId("file-row").filter({ hasText: fileName });
    const previewButton = fileRow.getByTestId("preview-button");

    await previewButton.scrollIntoViewIfNeeded();
    await previewButton.click(); //

    await page.waitForURL(/\?preview=/);
    const modal = page.getByTestId("modal-container");

    // Verify state and content and onfirm modalcloses with URL cleaned up
    await expect(modal).toHaveAttribute("data-state", "open");
    await expect(modal).toContainText(fileName);

    await modal
      .getByRole("button")
      .filter({ has: page.locator("svg") })
      .first()
      .click();

    await expect(modal).toHaveAttribute("data-state", "closed");
    await expect(page).not.toHaveURL(/preview=/);
  });
});
