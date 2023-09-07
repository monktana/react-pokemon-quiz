import { Center, Container, Text, useColorModeValue } from '@chakra-ui/react';

import { useLocalization } from '@/hooks/useLocalization';
import { useLanguageStore } from '@/stores';

const Loading = () => {
  const language = useLanguageStore((state) => state.language);
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

export default Loading;
