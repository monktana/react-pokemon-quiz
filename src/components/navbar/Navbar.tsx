import {
  Box,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

import { TypeIcon, LanguageIcon } from '@/components/icons';
import { languages } from '@/hooks/i18n';
import { useLocalization } from '@/hooks/useLocalization';
import { useLanguageStore } from '@/stores';

export function Navbar() {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const { getText } = useLocalization();
  const { toggleColorMode } = useColorMode();

  const iconName = useColorModeValue('dark', 'psychic');

  return (
    <Box position="fixed" zIndex="overlay" width="full" background="background.500">
      <HStack align="center" justify="end" px={4} spacing={2}>
        <Menu>
          <MenuButton
            data-cy="language-switch"
            aria-label="change language"
            as={IconButton}
            icon={<LanguageIcon type={language} aria-label={language} />}
          />
          <MenuList>
            {languages.map((language) => {
              return (
                <MenuItem
                  key={language}
                  data-cy={`${language}-language`}
                  icon={<LanguageIcon type={language} />}
                  onClick={() => setLanguage(language)}
                >
                  <Text>{getText(language, 'language')}</Text>
                </MenuItem>
              );
            })}
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
