import { Box, Button, Center, VStack, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { useLocalization } from '@/hooks/useLocalization';
import { useAppStateStore, useLanguageStore, useScoreStore } from '@/stores';

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
  const language = useLanguageStore((state) => state.language);
  const { getText } = useLocalization();

  return (
    <VStack spacing={2}>
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
          transform={'translate(-50%, -50%)'}
          width="4rem"
          height="4rem"
          bg="white"
          rounded="full"
          borderWidth="6px"
          borderColor="black"
        />
      </Box>
      <Center>
        <Button
          data-cy="start-game-button"
          size="lg"
          variant="primary"
          marginTop="8"
          onClick={() => {
            resetScore();
            startGame();
          }}
        >
          {getText(language, 'mainmenu.button.newgame').toUpperCase()}
        </Button>
      </Center>
    </VStack>
  );
}
