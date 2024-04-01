import { InternationalName } from '@/api/schema';
import { Language } from '@/hooks/i18n';

export const getRessourceName = (names: InternationalName[], locale: Language) => {
  const name = names.find((name) => name.language === locale);
  if (!name) {
    return 'unknown locale';
  }
  return name.name;
};
