import React from 'react';
import { Center, Grid, Skeleton, VStack } from '@chakra-ui/react';

export const Loading = () => {
  return (
    <Center height="100vh">
      <VStack data-testid="loading-container" width="360px">
        <Skeleton variant="quiz" height={12} width="full" />
        <Skeleton variant="quiz" height="218px" width="full" />
        <Skeleton variant="quiz" height="218px" width="full" />
        <Skeleton variant="quiz" height={12} width="full" />
        <Grid
          gridTemplateColumns="repeat(2, 1fr)"
          gap={2}
          padding={2}
          width="full"
          rounded="md"
          backgroundColor="background.200"
          _dark={{
            backgroundColor: 'background.800',
          }}
        >
          <Skeleton variant="quiz" height={10} width="full" />
          <Skeleton variant="quiz" height={10} width="full" />
          <Skeleton variant="quiz" height={10} width="full" />
          <Skeleton variant="quiz" height={10} width="full" />
        </Grid>
      </VStack>
    </Center>
  );
};
