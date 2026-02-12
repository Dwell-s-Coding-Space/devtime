import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('should render login page', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByAltText('logo')).toBeVisible();
  });
});
