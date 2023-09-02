import { Name } from '../../types';

export const getRessourceName = (names: Name[], locale: string) => {
  const name = names.find((name) => name.language.name === locale);
  if (!name) {
    return 'unknown locale';
  }
  return name.name;
};
