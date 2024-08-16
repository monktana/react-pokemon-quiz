import React from 'react';
import { Tag, TagLabel, TagLeftIcon, TagProps } from '@chakra-ui/react';

import { InternationalName } from '@/api';
import { TypeIcon, types } from '@/components';
import { getResourceName } from '@/components/pokemon/util';
import { useLanguage } from '@/stores';

export interface TypeTagProps extends TagProps {
  type: types;
  text: InternationalName[];
}

export const TypeTag = ({ type, text, ...tagProps }: TypeTagProps) => {
  const language = useLanguage();
  return (
    <Tag data-testid={`${type}-type-tag`} colorScheme={type} {...tagProps}>
      <TagLeftIcon as={TypeIcon} type={type} />
      <TagLabel>{getResourceName(text, language)}</TagLabel>
    </Tag>
  );
};
