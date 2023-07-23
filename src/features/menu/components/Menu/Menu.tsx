import { Box, Button, keyframes } from '@chakra-ui/react';
import { motion } from "framer-motion";

import { useAppStateStore, useScoreStore } from '@/stores';

const animationKeyframes = keyframes`
  0% { transform: rotate(0) }
  10% { transform: rotate(-25deg) }
  30% { transform: rotate(17deg) }
  60% { transform: rotate(-10deg) }
  80% { transform: rotate(5deg) }
  90% { transform: rotate(0) }
  100% { transform: rotate(0) }
`;

const animation = `${animationKeyframes} 4s ease-in-out infinite`;

export function Menu() {
  const startGame = useAppStateStore((state) => state.startQuiz);
  const resetScore = useScoreStore((state) => state.reset);

  return (
    <Box
      as={motion.div}
      animation={animation}
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
      <Button
        position="absolute"
        top="50%"
        left="50%"
        transform={"translate(-50%, -50%)"}
        w="4rem"
        h="4rem"
        bg="white"
        rounded="full"
        borderWidth="6px"
        borderColor="black"
        onClick={() => { resetScore(); startGame(); }}
      />
    </Box>
  );
}