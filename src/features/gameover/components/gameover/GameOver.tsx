import { Button, Text, VStack } from '@chakra-ui/react';

import { useLocalization } from '@/hooks/useLocalization';
import { useAppStateStore, useScoreStore } from '@/stores';

export function GameOver() {
  const startGame = useAppStateStore((state) => state.startQuiz);
  const openMenu = useAppStateStore((state) => state.openMenu);
  const resetScore = useScoreStore((state) => state.reset);
  const { getText } = useLocalization();

  return (
    <VStack>
      <Text my={4} fontSize="2xl" color="font.100">{getText("en", "gameover.text.blackout")}</Text>
      <Button
        width="xs"
        height="12"
        mt="8"
        fontSize="lg"
        fontWeight="bold"
        rounded="md"
        color="gray.900"
        bgGradient="linear(red.500 0%, red.500 50%, white 50%)"
        onClick={() => { resetScore(); startGame(); }}
        _hover={{
          bgGradient: "linear(blue.500 0%, blue.500 50%, white 50%)"
        }}
      >
        {getText("en", "gameover.button.newgame").toUpperCase()}
      </Button>
      <Button
        width="xs"
        height="12"
        fontSize="lg"
        rounded="md"
        color="font.100"
        backgroundColor="background.500"
        onClick={() => { resetScore(); openMenu(); }}
      >
        {getText("en", "gameover.button.mainmenu").toUpperCase()}
      </Button>
    </VStack>
  );
}