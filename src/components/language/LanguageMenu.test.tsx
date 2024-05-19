import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { LanguageMenu } from '@/components';
import { languages } from '@/hooks';
import { render } from '@/lib';
import { LanguageStoreProvider } from '@/stores';

describe('LanguageMenu', () => {
  it('displays the current language on initial render', () => {
    renderLanguageMenu();

    expect(screen.getByLabelText('Change language')).toBeVisible();
    expect(screen.getByLabelText('en')).toBeVisible();
  });

  it('displays all language options on click', async () => {
    renderLanguageMenu();

    await userEvent.click(screen.getByLabelText('Change language'));
    expect(screen.getByLabelText('Change language')).toHaveAttribute('aria-expanded', 'true');

    await screen.findByRole('menu');

    languages.forEach((language) => {
      expect(screen.getByTestId(`${language}-language`)).toBeVisible();
      expect(screen.getByTestId(`${language}-language`)).toBeEnabled();
    });
  });
});

const renderLanguageMenu = () => {
  render(
    <LanguageStoreProvider initialLanguage="en">
      <LanguageMenu />
    </LanguageStoreProvider>
  );
};
