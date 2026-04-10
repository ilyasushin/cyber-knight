import type { Scene, StageIndex } from "../types/scene";

/** Какой этап показывать в шапке оболочки (1–4) или скрыть полосу прогресса. */
export function getShellProgressStage(scene: Scene): StageIndex | null {
  switch (scene.kind) {
    case "intro":
    case "trainingSummary":
    case "finale":
      return null;
    case "stagePrep":
    case "game":
    case "stageResult":
      return scene.stage;
    case "interStage":
      return scene.nextStage;
    default: {
      const _exhaustive: never = scene;
      return _exhaustive;
    }
  }
}
