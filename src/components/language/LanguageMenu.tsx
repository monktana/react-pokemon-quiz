import React from 'react';

import { LanguageIcon } from '@/components';
import { useLocalization } from '@/hooks';
import { useLanguage, useLanguageActions } from '@/stores';
import { Language, Languages } from '@/util';
import { Select, SelectItem } from '@/lib/shadcn/ui';

export const LanguageMenu = () => {
  const language = useLanguage();
  const { getText } = useLocalization();
  const { setLanguage } = useLanguageActions();

  return (
    <Select onValueChange={(newLanguage) => setLanguage(newLanguage as Language)} defaultValue={language}>
      {Languages.map((language) => {
        return (
          <SelectItem
            key={language}
            value={language}
            data-testid={`${language}-language`}
            onClick={() => setLanguage(language)}
          >
            <LanguageIcon type={language} /> {getText(language)}
          </SelectItem>
        );
      })}
    </Select>
  );
};
