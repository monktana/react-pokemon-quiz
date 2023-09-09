import { Container, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';

import { GhostIcon } from '@/features/quiz/components/icons';
import { useLocalization } from '@/hooks/useLocalization';
import { useLanguageStore } from '@/stores';

const Error = () => {
  const language = useLanguageStore((state) => state.language);
  const { getText } = useLocalization();

  const fontColor = useColorModeValue('font.800', 'font.100');

  return (
    <Container height="100vh">
      <Flex flexDirection="column" height="full" alignItems="center" justifyContent="center">
        <GhostIcon width="12" height="12" marginBottom={4} />
        <Heading as="h2" mb={2} size="xl" colorScheme="red">
          {getText(language, 'error.title')}
        </Heading>
        <Text color={fontColor}>{getText(language, 'error.info')}</Text>
      </Flex>
    </Container>
  );
};

export default Error;
