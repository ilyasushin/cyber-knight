import type { MiniGameProps } from "../types/miniGame";

/** Этап 4: лента карточек, свайп влево/вправо, 5 решений. */
export function GameEasyMoneySwipe({ onComplete }: MiniGameProps) {
  return (
    <main className="screen screen--game">
      <h2 className="screen__title">Красная кнопка</h2>
      <p className="screen__lead">Заглушка: свайпы по 5 карточкам — позже.</p>
      <button type="button" className="btn btn--primary" onClick={onComplete}>
        Завершить этап (заглушка)
      </button>
    </main>
  );
}
