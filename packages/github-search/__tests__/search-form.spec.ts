import { test, expect } from "@playwright/test";

test("displays UsersList when users are found", async ({ page }) => {
  // Navigate to the page with the SearchForm
  await page.goto("http://localhost:3001");

  // Fill in the search form and submit
  await page.fill('[data-testid="search-input"]', "testuser");
  await page.click('[data-testid="search-button"]');

  // Wait for the UsersList to be displayed
  await page.waitForSelector('[data-testid="users-list"]');

  // Check if the UsersList contains at least one user
  const userItems = await page.$$('[data-testid="user-item"]');
  expect(userItems.length).toBeGreaterThan(0);

  const firstUserItem = userItems[0];
  await expect(firstUserItem).toBeTruthy();

  // Check if the avatar image is present
  const avatarImage = await firstUserItem.$('[data-testid="user-avatar"]');
  expect(avatarImage).toBeTruthy();

  // Check if the user link is present and has an href attribute
  const userLink = await firstUserItem.$('[data-testid="user-link"]');
  expect(userLink).toBeTruthy();
  const href = await userLink?.getAttribute("href");
  expect(href).toBeTruthy();
  expect(href).toContain("https://github.com/");
});
