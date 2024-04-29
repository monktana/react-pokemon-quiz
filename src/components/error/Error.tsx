import { Button, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { FallbackProps } from 'react-error-boundary';

import { useLocalization } from '@/hooks';
import { useLanguage } from '@/stores';

import { GhostIcon } from '../icons';

export const Error = ({ resetErrorBoundary }: FallbackProps) => {
  const language = useLanguage();
  const { getText } = useLocalization();

  return (
    <Container height="100vh">
      <Flex flexDirection="column" height="full" alignItems="center" justifyContent="center">
        <GhostIcon width="12" height="12" marginBottom={4} />
        <Heading as="h2" marginBottom={2} size="xl">
          {getText(language, 'error.title')}
        </Heading>
        <Text color={{ light: 'font.800', dark: 'font.100' }}>
          {getText(language, 'error.info')}
        </Text>
        <Button variant="primary" marginTop="8" onClick={resetErrorBoundary}>
          {getText(language, 'error.button')}
        </Button>
      </Flex>
    </Container>
  );
};
