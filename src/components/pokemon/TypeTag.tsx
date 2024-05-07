import { Tag, TagLabel, TagLeftIcon, TagProps } from '@chakra-ui/react';

import { InternationalName } from '@/api';
import { TypeIcon, types } from '@/components';
import { getRessourceName } from '@/components/pokemon/util';
import { useLanguage } from '@/stores';

export interface TypeTag extends TagProps {
  type: types;
  text: InternationalName[];
}

export const TypeTag = ({ type, text, ...tagProps }: TypeTag) => {
  const language = useLanguage();
  return (
    <Tag data-cy={`${type}-type-tag`} colorScheme={type} {...tagProps}>
      <TagLeftIcon as={TypeIcon} type={type} />
      <TagLabel>{getRessourceName(text, language)}</TagLabel>
    </Tag>
  );
};
