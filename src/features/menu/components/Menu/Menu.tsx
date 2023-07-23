import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useContext } from 'react';

import { LocalizationContext } from '@/providers';
import { useAppStateStore, useScoreStore } from '@/stores';

type MenuProps = {
  variant: 'mainmenu' | 'gameover'
}

export function Menu({variant}: MenuProps) {
  const startGame = useAppStateStore((state) => state.startQuiz);
  const backToMainMenu = useAppStateStore((state) => state.openMenu);

  const score = useScoreStore((state) => state.score);
  const resetScore = useScoreStore((state) => state.reset);

  const Localization = useContext(LocalizationContext);

  return (
    <Flex alignItems="center" justifyContent="center" gap={4} p={2}>
      <Heading as="h1" size="4xl">{Localization.getText('en', `${variant}.title`)}</Heading>
      { variant === 'gameover' && (<Text>{score}</Text>)}
      <Flex alignItems="center" justifyContent="center">
        <Button 
          onClick={() => { resetScore(); startGame(); }} 
        >
          {Localization.getText('en', `${variant}.button.newgame`)} 
        </Button>
        { 
          variant === 'gameover' && 
          <Button 
            onClick={() => { resetScore(); backToMainMenu(); }} 
          >
            {Localization.getText('en', `${variant}.button.mainmenu`)} 
          </Button>
        }
      </Flex>
    </Flex>
  );
}