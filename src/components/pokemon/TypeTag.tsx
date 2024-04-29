import { Tag, TagLabel, TagLeftIcon, TagProps } from '@chakra-ui/react';

import { Type } from '@/api/schema';
import { TypeIcon } from '@/components';
import { getRessourceName } from '@/components/pokemon/util';
import { useLanguage } from '@/stores';

export interface TypeTag extends TagProps {
  type: Type;
}

export const TypeTag = ({ type, ...tagProps }: TypeTag) => {
  const language = useLanguage();
  return (
    <Tag data-cy={`${type.name}-type-tag`} colorScheme={type.name!} {...tagProps}>
      <TagLeftIcon as={TypeIcon} type={type.name!} />
      <TagLabel>{getRessourceName(type.names!, language)}</TagLabel>
    </Tag>
  );
};
