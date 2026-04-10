import type { StageIndex } from "../types/scene";

type Props = {
  /** Текущий этап 1–4: подсвечивается сегмент с индексом stage - 1. */
  activeStage: StageIndex;
};

export function StageDots({ activeStage }: Props) {
  const activeIndex = activeStage - 1;
  return (
    <div className="cyber-stage__dots" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`cyber-stage__dot${i === activeIndex ? " cyber-stage__dot--active" : ""}`}
        />
      ))}
    </div>
  );
}
