import LOCALIZATION_TEXTS from './test/i18n.json';

export const languages = ['en', 'de'] as const;
export type Language = typeof languages[number];
export type TextKey = keyof typeof LOCALIZATION_TEXTS[Language];

export const getText = (language: Language, key: TextKey) => LOCALIZATION_TEXTS[language][key];