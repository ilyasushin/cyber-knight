import type { MiniGameProps } from "../types/miniGame";

/** Этап 1: расшифровка звонка, флаги, общий таймер → onComplete. */
export function GameLieDetector({ onComplete }: MiniGameProps) {
  return (
    <main className="screen screen--game">
      <h2 className="screen__title">Детектор лжи</h2>
      <p className="screen__lead">
        Заглушка: таймер и фразы — позже (CodePen / своя логика).
      </p>
      <button type="button" className="btn btn--primary" onClick={onComplete}>
        Завершить этап (заглушка)
      </button>
    </main>
  );
}
