import { Center, Container, Text, useColorModeValue } from '@chakra-ui/react';

import { useLocalization } from '@/hooks';
import { useLanguage } from '@/stores';

export const Loading = () => {
  const language = useLanguage();
  const { getText } = useLocalization();

  const fontColor = useColorModeValue('font.800', 'font.100');

  return (
    <Container height="100vh">
      <Center height="100%">
        <Text color={fontColor}>{getText(language, 'loading.text')}</Text>
      </Center>
    </Container>
  );
};
