import React from 'react';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuOptionGroup,
  Text,
} from '@chakra-ui/react';

import { LanguageIcon } from '@/components';
import { useLocalization } from '@/hooks';
import { useLanguage, useLanguageActions } from '@/stores';
import { Languages } from '@/util';

export const LanguageMenu = () => {
  const language = useLanguage();
  const { getText } = useLocalization();
  const { setLanguage } = useLanguageActions();

  return (
    <Menu data-testid="language-menu">
      <MenuButton
        data-testid="language-switch"
        aria-label={getText('navbar.language.label')}
        as={IconButton}
        icon={<LanguageIcon type={language} aria-label={language} />}
      />
      <MenuList backgroundColor="background.200" _dark={{ backgroundColor: 'background.800' }}>
        <MenuOptionGroup defaultValue={language} type="radio">
          {Languages.map((language) => {
            return (
              <MenuItem
                key={language}
                data-testid={`${language}-language`}
                backgroundColor="background.200"
                icon={<LanguageIcon type={language} />}
                onClick={() => setLanguage(language)}
                _hover={{
                  backgroundColor: 'background.300',
                }}
                _dark={{
                  backgroundColor: 'background.800',
                  _hover: {
                    backgroundColor: 'background.700',
                  },
                }}
              >
                <Text>{getText(language)}</Text>
              </MenuItem>
            );
          })}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
