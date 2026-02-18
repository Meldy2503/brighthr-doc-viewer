import { test, expect } from "@playwright/test";

test.describe("Two-Way Folder Expansion", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("file-row").first()).toBeVisible();
  });

  test("should expand folder inline via Chevron without navigating", async ({
    page,
  }) => {
    const folderRow = page
      .getByTestId("file-row")
      .filter({ hasText: "Marketing Assets" });
    const chevron = folderRow.getByRole("button", { name: /expand folder/i });
    const childFileName = "Summer Campaign Banner";

    // Select the immediate sibling container responsible for the accordion animation
    const expansionContainer = folderRow
      .locator("xpath=following-sibling::div")
      .first();

    await expect(expansionContainer).toHaveClass(/grid-rows-\[0fr\]/);

    await chevron.click();

    // Verify the folder expands to show file items
    await expect(expansionContainer).toHaveClass(/grid-rows-\[1fr\]/);
    await expect(page.getByText(childFileName)).toBeVisible();

    await expect(page).not.toHaveURL(/folderId=/);
    await expect(page.getByTestId("breadcrumb-nav")).not.toContainText(
      "Marketing Assets",
    );

    await chevron.click();
    await expect(expansionContainer).toHaveClass(/grid-rows-\[0fr\]/);
  });

  test('should navigate inside a folder via "Open Folder" button', async ({
    page,
  }) => {
    const folderRow = page
      .getByTestId("file-row")
      .filter({ hasText: "Expenses" });
    const openButton = folderRow.getByRole("button", { name: /open folder/i });

    await openButton.click();

    // Verify full route navigation with matching breadcrumb 
    await expect(page).toHaveURL(/folderId=3/);
    await expect(page.getByTestId("breadcrumb-nav")).toContainText("Expenses");

    await expect(page.getByText("Q1 Travel Reimbursement")).toBeVisible();
    await expect(page.getByText("Employee Handbook 2026")).not.toBeVisible();
  });
});
