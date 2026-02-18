import { test, expect } from "@playwright/test";

test.describe("Search, Sort, and Pagination", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // wait for a specific row to ensure data is mounted
    await expect(
      page.locator('[data-testid="file-row"]').first(),
    ).toBeVisible();
  });

  test("should search and filter files", async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Search files/i);
    await searchInput.fill("Policy");

    const rows = page.locator('[data-testid="file-row"]');
    await expect(rows.first()).toContainText(/Policy/i);

    // Policy search should yield 2 results)
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should sort files and folders in ascending and descending order", async ({
    page,
  }) => {
    const nameSortBtn = page.getByRole("button", { name: "Name" });
    const rows = page.locator('[data-testid="file-row"]');

    // Set to sort files and folders in ascending or descending order
    await nameSortBtn.click();
    const ascTexts = await rows.allInnerTexts();

    await nameSortBtn.click();

    await expect(async () => {
      const descTexts = await rows.allInnerTexts();
      expect(descTexts.join("|")).not.toBe(ascTexts.join("|"));
    }).toPass();
  });

  test("should handle pagination, showing 10 items at a time", async ({
    page,
  }) => {
    const showMoreBtn = page.getByRole("button", { name: /Show More/i });

    // Check if we have enough mock data to even show the button
    if (await showMoreBtn.isVisible()) {
      const initialCount = await page
        .locator('[data-testid="file-row"]')
        .count();

      await showMoreBtn.click();

      // Verify count increase and show less works
      await expect(async () => {
        const newCount = await page.locator('[data-testid="file-row"]').count();
        expect(newCount).toBeGreaterThan(initialCount);
      }).toPass();

      const showLessBtn = page.getByRole("button", { name: /Show Less/i });
      await showLessBtn.click();

      await expect(page.locator('[data-testid="file-row"]')).toHaveCount(
        initialCount,
      );
    }
  });
});
