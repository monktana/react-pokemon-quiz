import { Button } from '@/components';
import './MainMenu.css'

type MainMenuProps = {
  startQuiz: () => void
}

export function MainMenu({startQuiz} : MainMenuProps) {
  return (
    <div className="menu-container">
      <span className="menuText">WELCOME</span>
      <Button text="Start Quiz" onClick={startQuiz} variant={'menu'} />
    </div>
  );
}