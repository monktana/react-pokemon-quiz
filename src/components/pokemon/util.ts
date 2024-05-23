import { InternationalName } from '@/api/schema';
import { Language } from '@/util';

export const getResourceName = (names: InternationalName[], locale: Language) => {
  const name = names.find((name) => name.language === locale);
  if (!name) {
    return `getResourceName: locale (${locale}) not present in names`;
  }
  return name.name;
};
