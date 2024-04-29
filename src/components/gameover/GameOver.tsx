import { Button, Text, VStack } from '@chakra-ui/react';

import { useLocalization } from '@/hooks';
import { useAppStateActions, useLanguage, useScore, useScoreActions } from '@/stores';

export function GameOver() {
  const { startQuiz, openMenu } = useAppStateActions();
  const score = useScore();
  const { reset } = useScoreActions();
  const language = useLanguage();
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
            reset();
            startQuiz();
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
            reset();
            openMenu();
          }}
        >
          {getText(language, 'gameover.button.mainmenu').toUpperCase()}
        </Button>
      </VStack>
    </VStack>
  );
}
