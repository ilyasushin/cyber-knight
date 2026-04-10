import type { StageIndex } from "../types/scene";
import { miniGames } from "./registry";

type Props = {
  stage: StageIndex;
  onComplete: () => void;
};

export function MiniGameStageView({ stage, onComplete }: Props) {
  const Game = miniGames[stage];
  return <Game onComplete={onComplete} />;
}
