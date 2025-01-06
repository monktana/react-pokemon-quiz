import React, { ReactElement, useCallback } from 'react';

import { useLanguage } from '@/stores';
import { geti18nText, TextKey } from '@/util';

export const useLocalization = () => {
  const language = useLanguage();

  const getText = useCallback(
    (key: TextKey) => geti18nText(language, key),
    [language]
  );

  const getTemplatedText = useCallback(
    (key: TextKey, ...replacements: ReactElement[]) => {
      const text = geti18nText(language, key).split(' ');
      return text.map((string) => {
        if (string === '%s') return replacements.shift();
        return <p key={string}>{string}</p>;
      });
    },
    [language]
  );

  return { getText, getTemplatedText };
};
