import { useContext } from 'react';

import { Button } from '@/components';
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

  const Localization = useContext(LocalizationContext)

  return (
    <div className='flex flex-col items-center justify-center gap-4 h-full p-2'>
      <span className='text-5xl font-semibold p-2'>{Localization.getText('en', `${variant}.title`)}</span>
      { variant === 'gameover' && (<><span>{score}</span></>)}
      <div className="flex flex-col items-center justify-center">
        <Button 
          text={Localization.getText('en', `${variant}.button.newgame`)} 
          onClick={() => { resetScore(); startGame(); }} 
        />
        { 
          variant === 'gameover' && 
          <Button 
            text={Localization.getText('en', `${variant}.button.mainmenu`)} 
            onClick={() => { resetScore(); backToMainMenu(); }} 
          />
        }
      </div>
    </div>
  );
}