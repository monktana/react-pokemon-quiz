import { Button } from '@/components';
import { useAppStateStore, useScoreStore } from '@/stores';
import './Menu.css'

type MenuProps = {
  variant: 'Main' | 'End'
}

export function Menu({variant}: MenuProps) {
  const startGame = useAppStateStore((state) => state.startQuiz);
  const backToMainMenu = useAppStateStore((state) => state.openMenu);

  const score = useScoreStore((state) => state.score);
  const resetScore = useScoreStore((state) => state.reset);

  const text = variant === 'Main' ? "WELCOME" : "GAME OVER";

  return (
    <div className="menu-container">
      <span className="menuText">{text}</span>
      { variant === 'End' && (<><span>{score}</span></>)}
      <div className="buttons">
        <Button text="New Game" variant="menu" onClick={() => {resetScore(); startGame(); }} />
        { variant === 'End' && <Button text="Back to Menu" variant="menu" onClick={() => {resetScore(); backToMainMenu(); }} />}
      </div>
    </div>
  );
}