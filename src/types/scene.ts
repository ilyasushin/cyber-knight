/** Состояние навигации по мини-аппу. */
export type Scene =
  | { kind: "intro" }
  | { kind: "stagePrep"; stage: StageIndex }
  | { kind: "game"; stage: StageIndex }
  | { kind: "stageResult"; stage: StageIndex }
  | { kind: "interStage"; nextStage: 2 | 3 | 4 }
  | { kind: "trainingSummary" }
  | { kind: "finale" };

export type StageIndex = 1 | 2 | 3 | 4;
