import { test, expect } from "@playwright/test";

test.describe("Theme & Visual Regression", () => {
  test("should toggle dark mode and match screenshot", async ({
    page,
  }, testInfo) => {
    await page.goto("/");

    // Initial State: Light Mode
    await expect(
      page.getByRole("heading", { name: "Documents" }),
    ).toBeVisible();

    await expect(page.locator("html")).not.toHaveClass(/dark/);

    // Only run Light Mode screenshot on Chromium
    if (testInfo.project.name === "chromium") {
      await expect(page).toHaveScreenshot("light-mode.png", {
        fullPage: true,
        maxDiffPixelRatio: 0.05,
      });
    }

    // Switch to Dark Mode and confirm the sun icon is visible
    const themeToggle = page.getByRole("button", { name: "Toggle theme" });
    await themeToggle.click();

    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(themeToggle.locator("svg.lucide-sun")).toBeVisible();

    if (testInfo.project.name === "chromium") {
      await expect(page).toHaveScreenshot("dark-mode.png", { fullPage: true });
    }

    await themeToggle.click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });
});
