import { IconProps } from '@chakra-ui/react';

import { Language } from '@/hooks/Localization/i18n';

import { DEIcon } from './DE';
import { GBIcon } from './GB';

export const LanguageIcon = ({ type, ...rest }: { type: Language } & IconProps) => {
  switch (type) {
    case 'de':
      return <DEIcon name={type} {...rest} />;
    case 'en':
      return <GBIcon name={type} {...rest} />;
    default:
      console.log(`no icon for type: ${type}`);
      break;
  }
};
