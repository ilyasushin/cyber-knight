import { useCallback, useState } from "react";
import type { Scene, StageIndex } from "../types/scene";

const initialScene: Scene = { kind: "intro" };

export function useAppFlow() {
  const [scene, setScene] = useState<Scene>(initialScene);

  const goToIntro = useCallback(() => {
    setScene({ kind: "intro" });
  }, []);

  const startFromIntro = useCallback(() => {
    setScene({ kind: "stagePrep", stage: 1 });
  }, []);

  const finishStagePrep = useCallback((stage: StageIndex) => {
    setScene({ kind: "game", stage });
  }, []);

  const finishGame = useCallback((stage: StageIndex) => {
    setScene({ kind: "stageResult", stage });
  }, []);

  const finishStageResult = useCallback((stage: StageIndex) => {
    if (stage < 4) {
      setScene({ kind: "interStage", nextStage: (stage + 1) as 2 | 3 | 4 });
      return;
    }
    setScene({ kind: "trainingSummary" });
  }, []);

  const continueAfterInterStage = useCallback((nextStage: 2 | 3 | 4) => {
    setScene({ kind: "stagePrep", stage: nextStage });
  }, []);

  const finishTrainingSummary = useCallback(() => {
    setScene({ kind: "finale" });
  }, []);

  return {
    scene,
    goToIntro,
    startFromIntro,
    finishStagePrep,
    finishGame,
    finishStageResult,
    continueAfterInterStage,
    finishTrainingSummary,
  };
}
