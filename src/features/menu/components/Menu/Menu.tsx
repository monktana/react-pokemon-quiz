import { Box, Button, keyframes } from '@chakra-ui/react';
import { motion } from "framer-motion";

import { useLocalization } from '@/hooks/useLocalization';
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
  const { getText } = useLocalization();

  return (
    <Box>
      <Box
        as={motion.div}
        animation={animation}
        position="relative"
        width="xs"
        height="xs"
        rounded="full"
        borderWidth="6px"
        borderColor="black"
        bgGradient="linear(red.500 0%, red.500 50%, white 50%)"
      >
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform={"translate(-50%, -50%)"}
          width="4rem"
          height="4rem"
          bg="white"
          rounded="full"
          borderWidth="6px"
          borderColor="black"
        />
      </Box>
      <Button
        width="xs"
        height="12"
        mt="8"
        fontSize="lg"
        rounded="md"
        color="font.100"
        backgroundColor="background.500"
        onClick={() => { resetScore(); startGame(); }}
      >
        {getText("en", "mainmenu.button.newgame").toUpperCase()}
      </Button>
    </Box>
  );
}