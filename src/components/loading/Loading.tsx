import { Center, Container, Text, useColorModeValue } from '@chakra-ui/react';

import { useLocalization } from '@/hooks';

export const Loading = () => {
  const { getText } = useLocalization();

  const fontColor = useColorModeValue('font.800', 'font.100');

  return (
    <Container height="100vh">
      <Center height="100%">
        <Text color={fontColor}>{getText('loading.text')}</Text>
      </Center>
    </Container>
  );
};
