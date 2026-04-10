import { getVanillaAppHref } from "../lib/vanillaAppHref";
import type { MiniGameProps } from "../types/miniGame";

/** Этап 2: полная реализация — vanilla/js/games/game2.js (game2.html). */
export function GamePhishing({ onComplete }: MiniGameProps) {
  const href = getVanillaAppHref();
  return (
    <main className="screen screen--game">
      <h2 className="screen__title">Найди подделку</h2>
      <p className="screen__lead">
        <a href={href} target="_blank" rel="noopener noreferrer">
          Открыть полную игру (vanilla)
        </a>
      </p>
      <p className="screen__lead">В React-оболочке — переход к экрану награды.</p>
      <button type="button" className="btn btn--primary" onClick={onComplete}>
        К экрану награды
      </button>
    </main>
  );
}
