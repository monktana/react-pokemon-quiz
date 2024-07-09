import { Grid, Skeleton, useColorModeValue, VStack } from '@chakra-ui/react';

export const Loading = () => {
  useColorModeValue('font.800', 'font.100');
  return (
    <VStack data-cy="loading-container" width="360px">
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
        border="1px solid"
        borderColor="border.500"
        backgroundColor="background.200"
        _dark={{
          borderColor: 'border.100',
          backgroundColor: 'background.800',
        }}
      >
        <Skeleton variant="quiz" height={10} width="full" />
        <Skeleton variant="quiz" height={10} width="full" />
        <Skeleton variant="quiz" height={10} width="full" />
        <Skeleton variant="quiz" height={10} width="full" />
      </Grid>
    </VStack>
  );
};
