import { Button } from "@/components";
import "./GameOver.css";

type GameOverProps = {
  showMenu: () => void,
  newGame: () => void
}

export function GameOver({showMenu, newGame}: GameOverProps) {
  return (
    <div className="menuContainer">
      <span className="menuText">GAME OVER</span>
      <div className="buttons">
        <Button text="New Game" variant="menu" onClick={newGame} />
        <Button text="Back to Menu" variant="menu" onClick={showMenu} />
      </div>
    </div>
  );
}