/* eslint-disable testing-library/prefer-screen-queries */
import { expect, test } from '@playwright/test';

import { Matchup } from '../src/api';

test.describe('Error', () => {
  test('it displays an error screen if the initial request fails', async ({ page }) => {
    await page.route('**/api/v1/matchup', (route) =>
      route.fulfill({
        status: 500,
        path: 'tests/fixtures/error/500.json',
      })
    );

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    await page.getByTestId('start-game-button').click();

    await expect(page.getByTestId('error-header')).toBeVisible();
    await expect(page.getByTestId('error-header')).toHaveText('Something went wrong');

    await expect(page.getByTestId('error-message')).toBeVisible();
    await expect(page.getByTestId('error-message')).toHaveText(
      'An error occured. Please reload the site and try again.'
    );
  });

  test('it displays an error screen if an request during the game fails', async ({ page }) => {
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
      await page.getByTestId('no-effect-button').click();
    } else if (matchup.effectiveness === 'SuperEffective') {
      await page.getByTestId('super-effective-button').click();
    } else if (matchup.effectiveness === 'NotVeryEffective') {
      await page.getByTestId('not-effective-button').click();
    } else {
      await page.getByTestId('effective-button').click();
    }

    await errorPromise;

    await expect(page.getByTestId('error-header')).toBeVisible();
    await expect(page.getByTestId('error-message')).toBeVisible();
  });

  test('it keeps the score when retrying after an error', async ({ page }) => {
    const firstRoundPromise = page.waitForResponse('**/api/v1/matchup');
    await page.goto('/');

    const firstMatchupResponse = await firstRoundPromise;
    const firstMatchup = await firstMatchupResponse.json();
    await page.waitForLoadState('domcontentloaded');

    const secondRoundPromise = page.waitForResponse('**/api/v1/matchup');
    await page.getByTestId('start-game-button').click();
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
      await page.getByTestId('no-effect-button').click();
    } else if (firstMatchup.effectiveness === 'SuperEffective') {
      await page.getByTestId('super-effective-button').click();
    } else if (firstMatchup.effectiveness === 'NotVeryEffective') {
      await page.getByTestId('not-effective-button').click();
    } else {
      await page.getByTestId('effective-button').click();
    }

    const secondMatchupResponse = await secondRoundPromise;
    const secondMatchup = await secondMatchupResponse.json();
    await page.waitForLoadState('domcontentloaded');

    await expect(page.getByTestId('score-value')).toHaveText('1');

    if (secondMatchup.effectiveness === 'NoEffect') {
      await page.getByTestId('no-effect-button').click();
    } else if (secondMatchup.effectiveness === 'SuperEffective') {
      await page.getByTestId('super-effective-button').click();
    } else if (secondMatchup.effectiveness === 'NotVeryEffective') {
      await page.getByTestId('not-effective-button').click();
    } else {
      await page.getByTestId('effective-button').click();
    }

    await errorPromise;

    await expect(page.getByTestId('reset-button')).toBeVisible();
    await expect(page.getByTestId('reset-button')).toBeEnabled();

    await page.locator('[data-testid="reset-button"]').click();
    await page.waitForLoadState('domcontentloaded');

    await expect(page.getByTestId('score-value')).toHaveText('2');
  });
});

test.describe('Game', () => {
  test('it enables the player to start a new game', async ({ page }) => {
    const firstMatchupPromise = page.waitForResponse('**/api/v1/matchup');
    await page.goto('/');

    const firstMatchupResponse = await firstMatchupPromise;
    const firstMatchup: Matchup = await firstMatchupResponse.json();
    await page.waitForLoadState('domcontentloaded');

    await page.locator('[data-testid="start-game-button"]').click();
    await page.waitForLoadState('domcontentloaded');

    await expect(page.getByTestId('score-label')).toHaveText('Score');
    await expect(page.getByTestId('score-value')).toHaveText('0');

    await expect(page.getByTestId('game-container')).toBeVisible();

    await expect(page.getByTestId('attacker-pokemon')).toBeVisible();
    await expect(page.getByTestId('attacker-pokemon')).toContainText(firstMatchup.attacker!.name!, {
      ignoreCase: true,
    });

    await expect(page.getByTestId('defender-pokemon')).toBeVisible();
    await expect(page.getByTestId('defender-pokemon')).toContainText(firstMatchup.defender!.name!, {
      ignoreCase: true,
    });

    await expect(page.getByTestId('question')).toBeVisible();

    await expect(page.getByTestId('decision-buttons')).toBeVisible();

    await expect(page.getByTestId('no-effect-button')).toBeVisible();
    await expect(page.getByTestId('no-effect-button')).toBeEnabled();

    await expect(page.getByTestId('not-effective-button')).toBeVisible();
    await expect(page.getByTestId('not-effective-button')).toBeEnabled();

    await expect(page.getByTestId('effective-button')).toBeVisible();
    await expect(page.getByTestId('effective-button')).toBeEnabled();

    await expect(page.getByTestId('super-effective-button')).toBeVisible();
    await expect(page.getByTestId('super-effective-button')).toBeEnabled();
  });

  test('it increases the score when the guess is correct', async ({ page }) => {
    const firstMatchupPromise = page.waitForResponse('**/api/v1/matchup');
    await page.goto('/');

    const firstMatchupResponse = await firstMatchupPromise;
    const firstMatchup = await firstMatchupResponse.json();
    await page.waitForLoadState('domcontentloaded');

    await page.getByTestId('start-game-button').click();
    await page.waitForLoadState('domcontentloaded');

    if (firstMatchup.effectiveness === 'NoEffect') {
      await page.getByTestId('no-effect-button').click();
    } else if (firstMatchup.effectiveness === 'SuperEffective') {
      await page.getByTestId('super-effective-button').click();
    } else if (firstMatchup.effectiveness === 'NotVeryEffective') {
      await page.getByTestId('not-effective-button').click();
    } else {
      await page.getByTestId('effective-button').click();
    }

    await page.waitForLoadState('domcontentloaded');

    await expect(page.getByTestId('score-value')).toHaveText('1');
  });

  test('it ends the game when the guess is incorrect', async ({ page }) => {
    const firstMatchupPromise = page.waitForResponse('**/api/v1/matchup');
    await page.goto('/');

    const firstMatchupResponse = await firstMatchupPromise;
    const firstMatchup = await firstMatchupResponse.json();
    await page.waitForLoadState('domcontentloaded');

    await page.getByTestId('start-game-button').click();
    await page.waitForLoadState('domcontentloaded');

    if (firstMatchup.effectiveness === 'NoEffect') {
      await page.getByTestId('super-effective-button').click();
    } else {
      await page.getByTestId('no-effect-button').click();
    }

    await page.waitForLoadState('domcontentloaded');

    await expect(page.getByTestId('gameover-message')).toBeVisible();
    await expect(page.getByTestId('final-score')).toBeVisible();
    await expect(page.getByTestId('new-game-button')).toBeVisible();
    await expect(page.getByTestId('new-game-button')).toBeEnabled();
    await expect(page.getByTestId('main-menu-button')).toBeVisible();
    await expect(page.getByTestId('main-menu-button')).toBeEnabled();
  });

  test('it enables the player to start a new game after losing', async ({ page }) => {
    const firstMatchupPromise = page.waitForResponse('**/api/v1/matchup');
    await page.goto('/');

    const firstMatchupResponse = await firstMatchupPromise;
    const firstMatchup = await firstMatchupResponse.json();
    await page.waitForLoadState('domcontentloaded');

    await page.getByTestId('start-game-button').click();
    await page.waitForLoadState('domcontentloaded');

    if (firstMatchup.effectiveness === 'NoEffect') {
      await page.getByTestId('super-effective-button').click();
    } else {
      await page.getByTestId('no-effect-button').click();
    }

    await page.waitForLoadState('domcontentloaded');

    await page.getByTestId('new-game-button').click();

    await page.waitForLoadState('domcontentloaded');

    await expect(page.getByTestId('game-container')).toBeVisible();
  });

  test('it enables the player to return to the main menu after losing', async ({ page }) => {
    const firstMatchupPromise = page.waitForResponse('**/api/v1/matchup');
    await page.goto('/');

    const firstMatchupResponse = await firstMatchupPromise;
    const firstMatchup = await firstMatchupResponse.json();
    await page.waitForLoadState('domcontentloaded');

    await page.getByTestId('start-game-button').click();
    await page.waitForLoadState('domcontentloaded');

    if (firstMatchup.effectiveness === 'NoEffect') {
      await page.getByTestId('super-effective-button').click();
    } else {
      await page.getByTestId('no-effect-button').click();
    }

    await page.waitForLoadState('domcontentloaded');

    await page.getByTestId('main-menu-button').click();

    await page.waitForLoadState('domcontentloaded');

    await expect(page.getByTestId('pokeball')).toBeVisible();
    await expect(page.getByTestId('start-game-button')).toBeVisible();
    await expect(page.getByTestId('start-game-button')).toBeEnabled();
  });

  test('it displays a loading screen to the player when starting the game', async ({ page }) => {
    const firstMatchupPromise = page.waitForResponse('**/api/v1/matchup', { timeout: 2000 });
    await page.goto('/');

    await page.getByTestId('start-game-button').click();

    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByTestId('loading-container')).toBeVisible();

    await firstMatchupPromise;
    await page.waitForLoadState('domcontentloaded');

    await expect(page.getByTestId('loading-container')).not.toBeVisible();
    await expect(page.getByTestId('game-container')).toBeVisible();
  });

  test('it displays a loading screen to the player during the game', async ({ page }) => {
    const firstMatchupPromise = page.waitForResponse('**/api/v1/matchup');
    await page.goto('/');

    const firstMatchupResponse = await firstMatchupPromise;
    const firstMatchup = await firstMatchupResponse.json();

    await page.getByTestId('start-game-button').click();
    await page.waitForLoadState('domcontentloaded');

    const secondMatchupPromise = page.waitForResponse('**/api/v1/matchup', { timeout: 2000 });

    if (firstMatchup.effectiveness === 'NoEffect') {
      await page.getByTestId('no-effect-button').click();
    } else if (firstMatchup.effectiveness === 'SuperEffective') {
      await page.getByTestId('super-effective-button').click();
    } else if (firstMatchup.effectiveness === 'NotVeryEffective') {
      await page.getByTestId('not-effective-button').click();
    } else {
      await page.getByTestId('effective-button').click();
    }

    await page.waitForLoadState('domcontentloaded');

    await expect(page.getByTestId('loading-container')).toBeVisible();

    await secondMatchupPromise;
    await page.waitForLoadState('domcontentloaded');

    await expect(page.getByTestId('loading-container')).not.toBeVisible();
    await expect(page.getByTestId('game-container')).toBeVisible();
  });
});
