import type { ComponentType } from "react";
import type { StageIndex } from "./scene";

/**
 * Единый контракт мини-игры в React: всегда завершается вызовом onComplete
 * (поражения нет — см. спеку).
 */
export type MiniGameProps = {
  onComplete: () => void;
};

export type MiniGameComponent = ComponentType<MiniGameProps>;

export type MiniGameRegistry = Record<StageIndex, MiniGameComponent>;
