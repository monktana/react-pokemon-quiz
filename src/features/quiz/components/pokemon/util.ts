import { LanguageKey } from '@/hooks/i18n';

import { Name } from '../../types';

export const getRessourceName = (names: Name[], locale: LanguageKey) => {
  const name = names.find((name) => name.language.name === locale);
  if (!name) {
    return 'unknown locale';
  }
  return name.name;
};
