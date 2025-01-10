import React from 'react';

import { useLocalization } from '@/hooks';
import { useLanguage, useLanguageActions } from '@/stores';
import { Language, Languages } from '@/util';
import { Select, SelectContent, SelectItem } from '@/lib/shadcn/ui';
import { Icon } from '@iconify/react';

export const LanguageMenu = () => {
  const language = useLanguage();
  const { getText } = useLocalization();
  const { setLanguage } = useLanguageActions();

  return (
    <Select onValueChange={(newLanguage) => setLanguage(newLanguage as Language)} defaultValue={language}>
      <SelectContent>
        {Languages.map((language) => {
          return (
            <SelectItem
              key={language}
              value={language}
              data-testid={`${language}-language`}
              onClick={() => setLanguage(language)}
            >
              <Icon icon={language} /> {getText(language)}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
