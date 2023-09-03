import { Center, Heading, Text, useColorModeValue } from '@chakra-ui/react';

import { GhostIcon } from '@/features/quiz/components/icons';
import { useLocalization } from '@/hooks/useLocalization';
import { useLanguageStore } from '@/stores';

const Error = () => {
  const language = useLanguageStore((state) => state.language);
  const { getText } = useLocalization();

  const fontColor = useColorModeValue('font.800', 'font.100');

  return (
    <Center>
      <GhostIcon />
      <Heading as="h2" mb={2} size="xl" colorScheme="red">
        {getText(language, 'mainmenu.title')}
      </Heading>
      <Text color={fontColor}>{getText(language, 'mainmenu.title')}</Text>
    </Center>
  );
};

export default Error;
