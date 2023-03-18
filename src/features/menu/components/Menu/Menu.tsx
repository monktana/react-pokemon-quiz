import { useContext } from 'react';

import { Button } from '@/components';
import { LocalizationContext } from '@/providers';
import { useAppStateStore, useScoreStore } from '@/stores';
import './Menu.css'

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
    <div className="menu-container">
      <span className="menuText">{Localization.getText('en', `${variant}.title`)}</span>
      { variant === 'gameover' && (<><span>{score}</span></>)}
      <div className="buttons">
        <Button 
          text={Localization.getText('en', `${variant}.button.newgame`)} 
          variant="menu" 
          onClick={() => { resetScore(); startGame(); }} 
        />
        { 
          variant === 'gameover' && 
          <Button 
            text={Localization.getText('en', `${variant}.button.mainmenu`)} 
            variant="menu" 
            onClick={() => { resetScore(); backToMainMenu(); }} 
          />
        }
      </div>
    </div>
  );
}