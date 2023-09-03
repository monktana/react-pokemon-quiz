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

import { TypeIcon } from '@/features/quiz/components/icons';
import { Languages } from '@/hooks/i18n';
import { useLanguageStore } from '@/stores';

import { LanguageIcon } from '../icons';

export function Navbar() {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const { toggleColorMode } = useColorMode();
  const iconName = useColorModeValue('dark', 'psychic');

  return (
    <Box position="fixed" zIndex="overlay" width="full" background="background.500">
      <HStack align="center" justify="end" px={4} spacing={2}>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<LanguageIcon type={language} aria-label={language} />}
            aria-label="change language"
          />
          <MenuList>
            {Languages.map((language) => {
              return (
                <MenuItem
                  key={language}
                  icon={<LanguageIcon type={language} />}
                  onClick={() => setLanguage(language)}
                >
                  <Text>{language}</Text>
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
        <IconButton
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
