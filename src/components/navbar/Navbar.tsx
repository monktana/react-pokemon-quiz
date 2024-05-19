import { Box, HStack, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';

import { LanguageMenu, TypeIcon } from '@/components';
import { useLocalization } from '@/hooks';
import { useLanguage } from '@/stores';

export function Navbar() {
  const language = useLanguage();
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
        <LanguageMenu />
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
