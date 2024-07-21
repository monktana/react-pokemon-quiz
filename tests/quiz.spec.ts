import { expect, test } from '@playwright/test';

test.describe('Error', () => {
  test('displays an error message on initial request', async ({ page }) => {
    await page.route('**/api/v1/matchup', (route) =>
      route.fulfill({
        status: 500,
        path: 'tests/fixtures/error/500.json',
      })
    );

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    await page.locator('[data-testid="start-game-button"]').click();

    await expect(page.locator('[data-testid="error-header"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-header"]')).toHaveText('Something went wrong');

    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toHaveText(
      'An error occured. Please reload the site and try again.'
    );
  });

  test('displays an error message during the game', async ({ page }) => {
    page.on('request', (request) => console.log('>>', request.method(), request.url()));
    page.on('response', (response) => console.log('<<', response.status(), response.url()));

    const initialMatchupPromise = page.waitForResponse('**/api/v1/matchup');

    await page.goto('/');
    const initialMatchup = await initialMatchupPromise;
    await page.waitForLoadState('domcontentloaded');

    const errorPromise = page.route(
      '**/api/v1/matchup',
      (route) =>
        route.fulfill({
          status: 500,
          path: 'tests/fixtures/error/500.json',
        }),
      { times: 1 }
    );
    await page.locator('[data-testid="start-game-button"]').click();

    const matchup = await initialMatchup.json();

    if (matchup.effectiveness === 'NoEffect') {
      await page.locator('[data-testid="no-effective-button"]').click();
    } else if (matchup.effectiveness === 'SuperEffective') {
      await page.locator('[data-testid="super-effective-button"]').click();
    } else if (matchup.effectiveness === 'NotVeryEffective') {
      await page.locator('[data-testid="not-very-effective-button"]').click();
    } else {
      await page.locator('[data-testid="effective-button"]').click();
    }

    await errorPromise;

    await expect(page.locator('[data-testid="error-header"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
  });
});

test.describe('Game', () => {});
