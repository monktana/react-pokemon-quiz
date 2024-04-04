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
import { useLanguageStore } from '@/stores';

export function Navbar() {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const { getText } = useLocalization();
  const { toggleColorMode } = useColorMode();

  const iconName = useColorModeValue('dark', 'psychic');
  const backgroundColor = useColorModeValue('background.200', 'background.800');
  const hoverColor = useColorModeValue('background.300', 'background.700');

  return (
    <Box
      position="fixed"
      zIndex="overlay"
      width="full"
      backgroundColor={{ dark: 'background.900', light: 'background.100' }}
    >
      <HStack align="center" justify="end" px={4} spacing={2}>
        <Menu>
          <MenuButton
            data-cy="language-switch"
            aria-label="change language"
            as={IconButton}
            icon={<LanguageIcon type={language} aria-label={language} />}
          />
          <MenuList backgroundColor={backgroundColor}>
            <MenuOptionGroup defaultValue={language} type="radio">
              {languages.map((language) => {
                return (
                  <MenuItem
                    key={language}
                    data-cy={`${language}-language`}
                    backgroundColor={backgroundColor}
                    icon={<LanguageIcon type={language} />}
                    onClick={() => setLanguage(language)}
                    _hover={{
                      backgroundColor: hoverColor,
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
          aria-label="change color mode"
          variant="solid"
          colorScheme={iconName}
          icon={<TypeIcon type={iconName} color="current" />}
          onClick={toggleColorMode}
        />
      </HStack>
    </Box>
  );
}
