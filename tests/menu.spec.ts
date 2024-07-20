import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
});

test.describe('Language Select', () => {
  test('enables the player to change the language', async ({ page }) => {
    // await expect(page).toHaveAttribute('html', 'lang', 'en');
    await expect(page.locator('[data-testid="language-switch"]')).toBeVisible();
    await expect(page.locator('[data-testid="language-switch"]')).toBeEnabled();
    await expect(page.locator('[data-testid="language-switch"]')).toHaveAttribute(
      'aria-label',
      'Change language'
    );
    await expect(page.locator('[data-testid="language-switch"] svg')).toHaveAttribute(
      'aria-label',
      'en'
    );

    await page.locator('[data-testid="language-switch"]').click();
    await expect(page.locator('[data-testid="en-language"]')).toBeVisible();
    await expect(page.locator('[data-testid="de-language"]')).toBeVisible();

    await page.locator('[data-testid="de-language"]').click();

    // await expect(page).toHaveAttribute('html', 'lang', 'de');
    await expect(page.locator('[data-testid="language-switch"]')).toHaveAttribute(
      'aria-label',
      'Sprache wechseln'
    );
    await expect(page.locator('[data-testid="language-switch"] svg')).toHaveAttribute(
      'aria-label',
      'de'
    );
  });
});

test.describe('Color Mode', () => {
  test.describe('Light Mode', () => {
    test('enables the player to change the color theme from light to dark', async ({ page }) => {
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
      // eslint-disable-next-line jest-dom/prefer-to-have-style
      await expect(page.locator('html')).toHaveAttribute('style', 'color-scheme: light;');

      await expect(page.locator('[data-testid="color-mode-switch"]')).toBeVisible();
      await expect(page.locator('[data-testid="color-mode-switch"]')).toBeEnabled();
      await expect(page.locator('[data-testid="color-mode-switch"]')).toHaveAttribute(
        'aria-label',
        'Change color scheme'
      );

      await page.locator('[data-testid="color-mode-switch"]').click();

      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    });
  });

  test.describe('Dark Mode', () => {
    test.use({ colorScheme: 'dark' });
    test('enables the player to change the color theme from dark to light', async ({ page }) => {
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
      // eslint-disable-next-line jest-dom/prefer-to-have-style
      await expect(page.locator('html')).toHaveAttribute('style', 'color-scheme: dark;');

      await page.locator('[data-testid="color-mode-switch"]').click();

      await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    });
  });
});
