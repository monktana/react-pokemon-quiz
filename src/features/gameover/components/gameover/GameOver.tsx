import { Button, Text, VStack } from '@chakra-ui/react';

import { useLocalization } from '@/hooks/useLocalization';
import { useAppStateStore, useScoreStore } from '@/stores';

export function GameOver() {
  const startGame = useAppStateStore((state) => state.startQuiz);
  const openMenu = useAppStateStore((state) => state.openMenu);
  const resetScore = useScoreStore((state) => state.reset);
  const score = useScoreStore((state) => state.score);
  const { getText } = useLocalization();

  return (
    <VStack spacing={2}>
      <Text my={1} fontSize="2xl" color="font.100">{getText("en", "gameover.text.blackout")}</Text>
      <Text my={2} fontSize="sm" color="gray.300">
        {getText("en", "gameover.text.score")} {score}
      </Text>
      <VStack spacing={4} mt="8">
        <Button
          size="lg"
          variant="primary"
          width="full"
          onClick={() => { resetScore(); startGame(); }}
        >
          {getText("en", "gameover.button.newgame").toUpperCase()}
        </Button>
        <Button
          size="lg"
          variant="primary"
          width="full"
          onClick={() => { resetScore(); openMenu(); }}
        >
          {getText("en", "gameover.button.mainmenu").toUpperCase()}
        </Button>
      </VStack>
    </VStack>
  );
}