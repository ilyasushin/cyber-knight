import type { MiniGameProps } from "../types/miniGame";

/** Этап 2: пять раундов «настоящий / фишинг», отличия между парами. */
export function GamePhishing({ onComplete }: MiniGameProps) {
  return (
    <main className="screen screen--game">
      <h2 className="screen__title">Найди подделку</h2>
      <p className="screen__lead">Заглушка: 5 пар страниц — позже.</p>
      <button type="button" className="btn btn--primary" onClick={onComplete}>
        Завершить этап (заглушка)
      </button>
    </main>
  );
}
