import LOCALIZATION_TEXTS from './i18n.json';

export const languages = ['en', 'de'] as const;
export type Language = (typeof languages)[number];
export type TextKey = keyof (typeof LOCALIZATION_TEXTS)[Language];

export const getText = (language: Language, key: TextKey) => LOCALIZATION_TEXTS[language][key];
export const getTemplateText = (language: Language, key: TextKey, ...replacements: string[]) => {
  const text = LOCALIZATION_TEXTS[language][key];
  return replacements.reduce(
    (previousValue, currentValue) => previousValue.replace('%s', currentValue),
    text
  );
};
