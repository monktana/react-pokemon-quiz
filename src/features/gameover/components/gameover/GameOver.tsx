import { Button, Text, VStack } from '@chakra-ui/react';

import { Score } from '@/features/quiz/components/score';
import { useLocalization } from '@/hooks/useLocalization';
import { useAppStateStore, useScoreStore } from '@/stores';

export function GameOver() {
  const startGame = useAppStateStore((state) => state.startQuiz);
  const openMenu = useAppStateStore((state) => state.openMenu);
  const resetScore = useScoreStore((state) => state.reset);
  const { getText } = useLocalization();

  return (
    <VStack spacing={2}>
      <Score />
      <Text my={4} fontSize="2xl" color="font.100">{getText("en", "gameover.text.blackout")}</Text>
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