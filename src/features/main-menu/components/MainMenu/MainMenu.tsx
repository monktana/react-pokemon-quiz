import './MainMenu.css'

type MainMenuProps = {
  startQuiz: () => void
}

export function MainMenu({startQuiz} : MainMenuProps) {
  return (
    <div className="menuContainer">
      <span className="menuText">WELCOME</span>
      <button className="startButton" onClick={startQuiz}>Start Quiz</button>
    </div>
  );
}