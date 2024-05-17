import { describe, expect, it, vi } from 'vitest';

import { getBrowserLanguage } from './util';

const languageGetter = vi.spyOn(navigator, 'language', 'get');
describe.concurrent('Language store - util', () => {
  it('it reads the preferred browser language as a supported language', () => {
    languageGetter.mockReturnValue('de');
    expect(getBrowserLanguage()).toBe('de');
  });

  it('it defaults to a supported language if selected is unsupported', () => {
    languageGetter.mockReturnValue('jp');
    expect(getBrowserLanguage()).toBe('en');
  });

  it('it reads the browser language with region subtags as a supported language', () => {
    const languageGetter = vi.spyOn(navigator, 'language', 'get');

    languageGetter.mockReturnValue('de-CH');
    expect(getBrowserLanguage()).toBe('de');
  });

  it('it reads the browser language with variant subtags as a supported language', () => {
    const languageGetter = vi.spyOn(navigator, 'language', 'get');

    languageGetter.mockReturnValue('de-1996');
    expect(getBrowserLanguage()).toBe('de');
  });

  it('it reads the browser language with region subtags as a supported language', () => {
    const languageGetter = vi.spyOn(navigator, 'language', 'get');

    languageGetter.mockReturnValue('de-CH');
    expect(getBrowserLanguage()).toBe('de');
  });

  it('it reads the browser language with region and variant subtags as a supported language', () => {
    const languageGetter = vi.spyOn(navigator, 'language', 'get');

    languageGetter.mockReturnValue('de-CH-1996');
    expect(getBrowserLanguage()).toBe('de');
  });
});
