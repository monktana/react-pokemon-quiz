import { describe, expect, it, vi } from 'vitest';

import { getBrowserLanguage, geti18nText, isSupportedLanguage, Language, Languages, TextKey } from './i18n';
import LOCALIZATION_TEXTS from './i18n.json';

const languageGetter = vi.spyOn(navigator, 'language', 'get');
describe('preferred (browser) language', () => {
  it('reads the preferred browser language as a supported language', () => {
    languageGetter.mockReturnValue('de');
    expect(getBrowserLanguage()).toBe('de');
  });

  it('defaults to a supported language if selected is unsupported', () => {
    languageGetter.mockReturnValue('jp');
    expect(getBrowserLanguage()).toBe('en');
  });

  it('defaults to a supported language on a malformed language key', () => {
    languageGetter.mockReturnValue('-Ch');
    expect(getBrowserLanguage()).toBe('en');
  });

  it('reads the browser language with region subtag as a supported language', () => {
    const languageGetter = vi.spyOn(navigator, 'language', 'get');

    languageGetter.mockReturnValue('de-CH');
    expect(getBrowserLanguage()).toBe('de');
  });

  it('reads the browser language with variant subtag as a supported language', () => {
    const languageGetter = vi.spyOn(navigator, 'language', 'get');

    languageGetter.mockReturnValue('de-1996');
    expect(getBrowserLanguage()).toBe('de');
  });

  it('reads the browser language with region subtag as a supported language', () => {
    const languageGetter = vi.spyOn(navigator, 'language', 'get');

    languageGetter.mockReturnValue('de-CH');
    expect(getBrowserLanguage()).toBe('de');
  });

  it('reads the browser language with region and variant subtag as a supported language', () => {
    const languageGetter = vi.spyOn(navigator, 'language', 'get');

    languageGetter.mockReturnValue('de-CH-1996');
    expect(getBrowserLanguage()).toBe('de');
  });

  it('detects a supported language', () => {
    expect(isSupportedLanguage('en')).toBe(true);
    expect(isSupportedLanguage('de')).toBe(true);
  });

  it('detects an unsupported language', () => {
    expect(isSupportedLanguage('jp')).toBe(false);
  });
});

describe('localized texts', () => {
  Languages.forEach((language) => {
    it(`reads a ${language} localized text`, () => {
      expect(geti18nText(language, language)).toBe(LOCALIZATION_TEXTS[language][language]);
    });
  });

  it('throws when using an unsupported language', () => {
    expect(() => geti18nText('jp' as Language, 'mainmenu.title')).toThrowError(/^Localization access with unsupported language: jp$/);
  });

  it('returns a fallback when using an unsupported message', () => {
    expect(geti18nText('en', 'unknown' as TextKey)).toBe("unknown message key: unknown");
  });
});
