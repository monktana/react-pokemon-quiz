import { describe, expect, it, vi } from 'vitest';

import {
  getAppLanguage,
  getBrowserLanguage,
  geti18nText,
  isSupportedLanguage,
  Language,
  Languages,
  TextKey,
} from './i18n';
import { texts } from './texts';

const languagesGetter = vi.spyOn(navigator, 'languages', 'get');
const languageGetter = vi.spyOn(navigator, 'language', 'get');
describe('preferred browser language', () => {
  it('reads the preferred browser language using navigator.languages', () => {
    languagesGetter.mockReturnValue(['en']);
    expect(getBrowserLanguage()).toBe('en');
  });

  it('reads only reads the first language using navigator.languages', () => {
    languagesGetter.mockReturnValue(['en', 'de']);
    expect(getBrowserLanguage()).toBe('en');
  });

  it('reads the preferred browser language using navigator.language if navigator.languages is undefined', () => {
    // @ts-expect-error - force the fallback to navigator.language
    languagesGetter.mockReturnValue(undefined);
    languageGetter.mockReturnValue('en');
    expect(getBrowserLanguage()).toBe('en');
  });
});

describe('app language', () => {
  it('defaults to a supported language if selected is unsupported', () => {
    expect(getAppLanguage('jp')).toBe('en');
  });

  it('defaults to a supported language on a malformed language key', () => {
    expect(getAppLanguage('-Ch')).toBe('en');
  });

  it('reads the browser language with region subtag as a supported language', () => {
    expect(getAppLanguage('de-CH')).toBe('de');
  });

  it('reads the browser language with variant subtag as a supported language', () => {
    expect(getAppLanguage('de-1996')).toBe('de');
  });

  it('converts a supported language tag to a the correct game language', () => {
    expect(getAppLanguage('de')).toBe('de');
  });

  it('reads the browser language with region and variant subtag as a supported language', () => {
    expect(getAppLanguage('de-CH-1996')).toBe('de');
  });

  it('detects a supported language', () => {
    expect(isSupportedLanguage('en')).toBe(true);
    expect(isSupportedLanguage('de')).toBe(true);
  });

  it('detects an unsupported language', () => {
    expect(isSupportedLanguage('ja')).toBe(false);
  });
});

describe('localized texts', () => {
  Languages.forEach((language) => {
    it(`reads a ${language} localized text`, () => {
      expect(geti18nText(language, language)).toBe(texts[language][language]);
    });
  });

  it('throws when using an unsupported language', () => {
    expect(() => geti18nText('jp' as Language, 'mainmenu.title')).toThrowError(
      /^access to localization with unknown language: jp$/
    );
  });

  it('throws when using an unsupported key', () => {
    expect(() => geti18nText('en', 'unknown' as TextKey)).toThrowError(
      /^access to language texts en with unknown key: unknown$/
    );
  });
});
