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
    const initialMatchupPromise = page.waitForResponse('**/api/v1/matchup');

    await page.goto('/');
    const initialMatchup = await initialMatchupPromise;
    const matchup = await initialMatchup.json();
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

    if (matchup.effectiveness === 'NoEffect') {
      await page.locator('[data-testid="no-effective-button"]').click();
    } else if (matchup.effectiveness === 'SuperEffective') {
      await page.locator('[data-testid="super-effective-button"]').click();
    } else if (matchup.effectiveness === 'NotVeryEffective') {
      await page.locator('[data-testid="not-effective-button"]').click();
    } else {
      await page.locator('[data-testid="effective-button"]').click();
    }

    await errorPromise;

    await expect(page.locator('[data-testid="error-header"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
  });

  test('it keeps the score when retrying after an error', async ({ page }) => {
    const firstRoundPromise = page.waitForResponse('**/api/v1/matchup');
    await page.goto('/');

    const firstMatchupResponse = await firstRoundPromise;
    const firstMatchup = await firstMatchupResponse.json();
    await page.waitForLoadState('domcontentloaded');

    const secondRoundPromise = page.waitForResponse('**/api/v1/matchup');
    await page.locator('[data-testid="start-game-button"]').click();
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

    if (firstMatchup.effectiveness === 'NoEffect') {
      await page.locator('[data-testid="no-effective-button"]').click();
    } else if (firstMatchup.effectiveness === 'SuperEffective') {
      await page.locator('[data-testid="super-effective-button"]').click();
    } else if (firstMatchup.effectiveness === 'NotVeryEffective') {
      await page.locator('[data-testid="not-effective-button"]').click();
    } else {
      await page.locator('[data-testid="effective-button"]').click();
    }

    const secondMatchupResponse = await secondRoundPromise;
    const secondMatchup = await secondMatchupResponse.json();
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('[data-testid="score-value"]')).toHaveText('1');

    if (secondMatchup.effectiveness === 'NoEffect') {
      await page.locator('[data-testid="no-effective-button"]').click();
    } else if (secondMatchup.effectiveness === 'SuperEffective') {
      await page.locator('[data-testid="super-effective-button"]').click();
    } else if (secondMatchup.effectiveness === 'NotVeryEffective') {
      await page.locator('[data-testid="not-effective-button"]').click();
    } else {
      await page.locator('[data-testid="effective-button"]').click();
    }

    await errorPromise;

    await expect(page.locator('[data-testid="reset-button"]')).toBeVisible();
    await expect(page.locator('[data-testid="reset-button"]')).toBeEnabled();

    await page.locator('[data-testid="reset-button"]').click();
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('[data-testid="score-value"]')).toHaveText('2');
  });
});

test.describe('Game', () => {});
