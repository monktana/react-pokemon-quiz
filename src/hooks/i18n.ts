import LOCALIZATION_TEXTS from './i18n.json';

export const Languages = ['en', 'de'] as const;
export type LanguageKey = (typeof Languages)[number];
export type TextKey = keyof typeof LOCALIZATION_TEXTS.en;

export const TEXTS: { [key in LanguageKey]: { [key in TextKey]: string } } = LOCALIZATION_TEXTS;
