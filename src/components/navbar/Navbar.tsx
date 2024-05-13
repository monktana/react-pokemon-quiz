import {
  Box,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuOptionGroup,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

import { LanguageIcon, TypeIcon } from '@/components/icons';
import { languages, useLocalization } from '@/hooks';
import { useChangeLanguage, useLanguage } from '@/stores';

export function Navbar() {
  const language = useLanguage();
  const { changeLanguage } = useChangeLanguage();
  const { getText } = useLocalization();
  const { toggleColorMode } = useColorMode();

  const iconName = useColorModeValue('dark', 'psychic');

  return (
    <Box
      position="fixed"
      zIndex="overlay"
      width="full"
      backgroundColor={{ dark: 'background.900', light: 'background.100' }}
    >
      <HStack align="center" justify="end" paddingY={2} paddingX={4} spacing={2}>
        <Menu data-cy="language-menu">
          <MenuButton
            data-cy="language-switch"
            aria-label={getText(language, 'navbar.language.label')}
            as={IconButton}
            icon={<LanguageIcon type={language} aria-label={language} />}
          />
          <MenuList backgroundColor={{ light: 'background.200', dark: 'background.800' }}>
            <MenuOptionGroup defaultValue={language} type="radio">
              {languages.map((language) => {
                return (
                  <MenuItem
                    key={language}
                    data-cy={`${language}-language`}
                    backgroundColor={{ light: 'background.200', dark: 'background.800' }}
                    icon={<LanguageIcon type={language} />}
                    onClick={() => changeLanguage(language)}
                    _hover={{
                      backgroundColor: 'background.300',
                    }}
                    _dark={{
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
        <IconButton
          data-cy="color-mode-switch"
          aria-label={getText(language, 'navbar.color.label')}
          variant="solid"
          colorScheme={iconName}
          icon={<TypeIcon type={iconName} color="current" />}
          onClick={toggleColorMode}
        />
      </HStack>
    </Box>
  );
}
