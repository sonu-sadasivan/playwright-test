import { test, expect } from '@playwright/test';

test('basic test - check page title', async ({ page }) => {
  // Go to a website
  await page.goto('https://playwright.dev/');

  // Check the title
  await expect(page).toHaveTitle(/Playwright/);

  // Interact with elements
  await page.click('text=Get Started');

  // Assert some content on the page
  await expect(page.locator('h1')).toContainText('Installation');
});