import { Box } from '@chakra-ui/react';

import { useAppStateStore, useScoreStore } from '@/stores';

export function Menu() {
  const startGame = useAppStateStore((state) => state.startQuiz);
  const resetScore = useScoreStore((state) => state.reset);

  return (
    <Box
      position="relative"
      w="xs"
      h="xs"
      backgroundColor="white"
      rounded="full"
      borderWidth="6px"
      borderColor="black"
    >
      <Box
        h="50%"
        backgroundColor="red.500"
        borderTopRadius="full"
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform={"translate(-50%, -50%)"}
        w="4rem"
        h="4rem"
        backgroundColor="white"
        rounded="full"
        borderWidth="6px"
        borderColor="black"
        onClick={() => { resetScore(); startGame(); }}
      />
      {/* <Flex alignItems="center" justifyContent="center">
      </Flex> */}
    </Box>
  );
}