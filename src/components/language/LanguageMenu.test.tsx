import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { LanguageMenu } from '@/components';
import { render } from '@/lib';
import { geti18nText, Languages } from '@/util';

describe('<LanguageMenu />', () => {
  it('displays the current language on initial render', () => {
    render(<LanguageMenu />);

    expect(screen.getByLabelText(geti18nText('en', 'navbar.language.label')!)).toBeVisible();
    expect(screen.getByLabelText('en', { selector: 'svg' })).toBeVisible();
  });

  it('displays all language options on click', async () => {
    render(<LanguageMenu />);

    await userEvent.click(screen.getByLabelText(geti18nText('en', 'navbar.language.label')!));
    expect(screen.getByLabelText(geti18nText('en', 'navbar.language.label')!)).toHaveAttribute(
      'aria-expanded',
      'true'
    );

    await screen.findByRole('menu');

    Languages.forEach((language) => {
      expect(screen.getByTestId(`${language}-language`)).toBeVisible();
      expect(screen.getByTestId(`${language}-language`)).toBeEnabled();
    });
  });

  it('changes the language when an option is clicked', async () => {
    render(<LanguageMenu />);

    expect(screen.getByLabelText('en', { selector: 'svg' })).toBeVisible();

    await userEvent.click(screen.getByLabelText(geti18nText('en', 'navbar.language.label')!));
    await userEvent.click(screen.getByTestId('de-language'));

    expect(screen.getByLabelText('de', { selector: 'svg' })).toBeVisible();
    expect(screen.getByLabelText(geti18nText('de', 'navbar.language.label')!)).toBeInTheDocument();
  });
});
