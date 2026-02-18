import { test, expect } from "@playwright/test";

test.describe("Navigation & Folder Logic", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("file-row").first()).toBeVisible();
  });

  test("should navigate to a folder and update breadcrumbs", async ({
    page,
  }) => {
    // Identify a folder and verify Breadcrumbs and URL(e.g., "Expenses")
    const folderRow = page
      .getByTestId("file-row")
      .filter({ hasText: "Expenses" });

    await folderRow.getByRole("button", { name: /open folder/i }).click();

    const breadcrumbs = page.getByTestId("breadcrumb-nav");
    await expect(breadcrumbs).toContainText("Expenses");
    await expect(page).toHaveURL(/folderId=3/);

    // Navigate back using Breadcrumbs
    await breadcrumbs.getByText("All Files").click();

    await expect(page).not.toHaveURL(/folderId=/);
    await expect(breadcrumbs).toHaveText("All Files");
  });

  test("should load the correct folder and breadcrumbs when navigating through the URL (Deep Linking)", async ({
    page,
  }) => {
    // Navigate directly to a known ID use MOCK_DATA
    await page.goto("/?folderId=5");

    const breadcrumbs = page.getByTestId("breadcrumb-nav");
    await expect(breadcrumbs).toContainText("Marketing Assets");

    // Verify child content from MOCK_DATA is visible
    await expect(page.getByText("Summer Campaign Banner")).toBeVisible();
  });
});
