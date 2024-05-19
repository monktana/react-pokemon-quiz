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
import { getText, languages } from '@/hooks';
import { useLanguage, useLanguageActions } from '@/stores';

export const LanguageMenu = () => {
  const language = useLanguage();
  const { setLanguage } = useLanguageActions();

  return (
    <Menu data-cy="language-menu">
      <MenuButton
        data-cy="language-switch"
        aria-label={getText(language, 'navbar.language.label')}
        as={IconButton}
        icon={<LanguageIcon type={language} aria-label={language} />}
      />
      <MenuList backgroundColor="background.200" _dark={{ backgroundColor: 'background.800' }}>
        <MenuOptionGroup defaultValue={language} type="radio">
          {languages.map((language) => {
            return (
              <MenuItem
                key={language}
                data-cy={`${language}-language`}
                data-testid={`${language}-language`}
                backgroundColor="background.800"
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
                <Text>{getText(language, 'language')}</Text>
              </MenuItem>
            );
          })}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
