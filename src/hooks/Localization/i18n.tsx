import { Text } from '@chakra-ui/react';
import { ReactElement } from 'react';

import LOCALIZATION_TEXTS from './i18n.json';

export const languages = ['en', 'de'] as const;
export type Language = (typeof languages)[number];
export type TextKey = keyof (typeof LOCALIZATION_TEXTS)[Language];

export const getText = (language: Language, key: TextKey) => LOCALIZATION_TEXTS[language][key];

export const getTemplateText = (
  language: Language,
  key: TextKey,
  ...replacements: ReactElement[]
) => {
  const text = LOCALIZATION_TEXTS[language][key].split(' ');
  return text.map((string) => {
    if (string === '%s') return replacements.shift();
    return <Text key={string}>{string}</Text>;
  });
};
