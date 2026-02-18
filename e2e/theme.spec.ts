import { test, expect } from "@playwright/test";

test.describe("Theme & Visual Regression", () => {
  test("should toggle light anddark modes and verify theme classes", async ({ page }) => {
    await page.goto("/");

    // 1. Initial State: Light Mode
    await expect(
      page.getByRole("heading", { name: "Documents" }),
    ).toBeVisible();

    await expect(page.locator("html")).not.toHaveClass(/dark/);

    // Switch to Dark Mode and confirm the sun icon is visible
    const themeToggle = page.getByRole("button", { name: "Toggle theme" });
    await themeToggle.click();

    await expect(page.locator("html")).toHaveClass(/dark/);

    await expect(themeToggle.locator("svg.lucide-sun")).toBeVisible();

    await themeToggle.click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });
});
