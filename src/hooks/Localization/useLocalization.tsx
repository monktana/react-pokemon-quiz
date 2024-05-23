import { Text } from '@chakra-ui/react';
import { ReactElement, useCallback } from 'react';

import { useLanguage } from '@/stores';
import { geti18nText, TextKey } from '@/util';

export const useLocalization = () => {
  const language = useLanguage();

  const getText = useCallback(
    (key: TextKey) => {
      return geti18nText(language, key);
    },
    [language]
  );

  const getTemplatedText = useCallback(
    (key: TextKey, ...replacements: ReactElement[]) => {
      const text = geti18nText(language, key).split(' ');
      return text.map((string) => {
        if (string === '%s') return replacements.shift();
        return <Text key={string}>{string}</Text>;
      });
    },
    [language]
  );

  return { getText, getTemplatedText };
};
