import { useCallback, useState, type ReactNode } from "react";
import type { StageIndex } from "../types/scene";

type Props = {
  children: ReactNode;
  /** Если задан — в шапке показывается «Этап X из 4». */
  progressStage: StageIndex | null;
  /** Полноэкранные кибер-экраны несут свой «хром» — шапку можно скрыть. */
  showHeader?: boolean;
};

export function AppShell({ children, progressStage, showHeader = true }: Props) {
  const [soundOn, setSoundOn] = useState(true);

  const toggleSound = useCallback(() => {
    setSoundOn((v) => !v);
  }, []);

  return (
    <div className="shell">
      {showHeader ? (
        <header className="shell__header">
          {progressStage !== null ? (
            <span className="shell__progress" aria-live="polite">
              Этап {progressStage} из 4
            </span>
          ) : (
            <span className="shell__progress shell__progress--muted">Кибер.рыцарь</span>
          )}
          <button
            type="button"
            className="shell__sound"
            onClick={toggleSound}
            aria-pressed={soundOn}
            aria-label={soundOn ? "Выключить звук" : "Включить звук"}
            title={soundOn ? "Звук вкл" : "Звук выкл"}
          >
            {soundOn ? "🔊" : "🔇"}
          </button>
        </header>
      ) : null}
      <div className="shell__main">{children}</div>
    </div>
  );
}
