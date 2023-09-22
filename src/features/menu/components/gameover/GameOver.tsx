import { Button, Text, VStack } from '@chakra-ui/react';

import { useLocalization } from '@/hooks/useLocalization';
import { useAppStateStore, useLanguageStore, useScoreStore } from '@/stores';

export function GameOver() {
  const startGame = useAppStateStore((state) => state.startQuiz);
  const openMenu = useAppStateStore((state) => state.openMenu);
  const score = useScoreStore((state) => state.score);
  const resetScore = useScoreStore((state) => state.reset);
  const language = useLanguageStore((state) => state.language);
  const { getText } = useLocalization();

  return (
    <VStack spacing={2}>
      <Text my={1} fontSize="2xl" color="font.100">
        {getText(language, 'gameover.text.blackout')}
      </Text>
      <Text my={2} fontSize="sm" color="gray.300">
        {getText(language, 'gameover.text.score')} {score}
      </Text>
      <VStack spacing={4} mt="8">
        <Button
          data-cy="new-game-button"
          size="lg"
          variant="primary"
          width="full"
          onClick={() => {
            resetScore();
            startGame();
          }}
        >
          {getText(language, 'gameover.button.newgame').toUpperCase()}
        </Button>
        <Button
          data-cy="main-menu-button"
          size="lg"
          variant="primary"
          width="full"
          onClick={() => {
            resetScore();
            openMenu();
          }}
        >
          {getText(language, 'gameover.button.mainmenu').toUpperCase()}
        </Button>
      </VStack>
    </VStack>
  );
}
