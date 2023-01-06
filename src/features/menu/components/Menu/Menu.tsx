import { Button } from '@/components';
// eslint-disable-next-line no-restricted-imports
import { useRoundScore } from '@/features/quiz/hooks';
import { useAppStateStore } from '@/stores';
import './Menu.css'

type MenuProps = {
  variant: 'Main' | 'End'
}

export function Menu({variant}: MenuProps) {
  const startGame = useAppStateStore((state) => state.startQuiz);
  const backToMainMenu = useAppStateStore((state) => state.openMenu);

  const { roundScore, resetScore } = useRoundScore();

  const text = variant === 'Main' ? "WELCOME" : "GAME OVER";

  return (
    <div className="menu-container">
      <span className="menuText">{text}</span>
      { variant === 'End' && (<><span>{roundScore}</span></>)}
      <div className="buttons">
        <Button text="New Game" variant="menu" onClick={() => {resetScore(); startGame(); }} />
        { variant === 'End' && <Button text="Back to Menu" variant="menu" onClick={() => {resetScore(); backToMainMenu(); }} />}
      </div>
    </div>
  );
}