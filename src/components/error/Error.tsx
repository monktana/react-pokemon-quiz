import { Button, Container, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { FallbackProps } from 'react-error-boundary';

import { GhostIcon } from '@/components/icons';
import { useLocalization } from '@/hooks';
import { useLanguageStore } from '@/stores';

const Error = ({ resetErrorBoundary }: FallbackProps) => {
  const language = useLanguageStore((state) => state.language);
  const { getText } = useLocalization();

  const fontColor = useColorModeValue('font.800', 'font.100');

  return (
    <Container height="100vh">
      <Flex flexDirection="column" height="full" alignItems="center" justifyContent="center">
        <GhostIcon width="12" height="12" marginBottom={4} />
        <Heading as="h2" mb={2} size="xl">
          {getText(language, 'error.title')}
        </Heading>
        <Text color={fontColor}>{getText(language, 'error.info')}</Text>
        <Button variant="primary" marginTop="8" onClick={resetErrorBoundary}>
          {getText(language, 'error.button')}
        </Button>
      </Flex>
    </Container>
  );
};

export default Error;
