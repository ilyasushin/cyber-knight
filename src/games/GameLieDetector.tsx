import { getVanillaAppHref } from "../lib/vanillaAppHref";
import type { MiniGameProps } from "../types/miniGame";

/** Этап 1: полная реализация — vanilla/js/games/game1.js (логика из game1.html). */
export function GameLieDetector({ onComplete }: MiniGameProps) {
  const href = getVanillaAppHref();
  return (
    <main className="screen screen--game">
      <h2 className="screen__title">Детектор лжи</h2>
      <p className="screen__lead">
        Полная мини-игра встроена в сборку по ссылке ниже (тот же origin, что и это приложение).
      </p>
      <p className="screen__lead">
        <a href={href} target="_blank" rel="noopener noreferrer">
          Открыть полную игру (vanilla)
        </a>
      </p>
      <p className="screen__lead">В React-оболочке — переход к экрану награды по сценарию тренировки.</p>
      <button type="button" className="btn btn--primary" onClick={onComplete}>
        К экрану награды
      </button>
    </main>
  );
}
