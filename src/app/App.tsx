import { useAppFlow } from "../state/useAppFlow";
import { CyberScreenFinal } from "../cyber/CyberScreenFinal";
import { CyberScreenInterStage } from "../cyber/CyberScreenInterStage";
import { CyberScreenMain } from "../cyber/CyberScreenMain";
import { CyberScreenStagePrep } from "../cyber/CyberScreenStagePrep";
import { CyberScreenStageResult } from "../cyber/CyberScreenStageResult";
import { AppShell } from "../shell/AppShell";
import { getShellProgressStage } from "../shell/shellProgress";
import { TrainingSummaryScreen } from "../screens/TrainingSummaryScreen";
import { MiniGameStageView } from "../games/MiniGameStageView";
import "./app.css";

export function App() {
  const {
    scene,
    goToIntro,
    startFromIntro,
    finishStagePrep,
    finishGame,
    finishStageResult,
    continueAfterInterStage,
    finishTrainingSummary,
  } = useAppFlow();

  const progressStage = getShellProgressStage(scene);

  switch (scene.kind) {
    case "intro":
      return <CyberScreenMain onStart={startFromIntro} />;
    case "stagePrep":
      return (
        <AppShell progressStage={progressStage} showHeader={false}>
          <div className="shell__cyber-wrap">
            <CyberScreenStagePrep
              stage={scene.stage}
              onPlay={() => finishStagePrep(scene.stage)}
            />
          </div>
        </AppShell>
      );
    case "game":
      return (
        <AppShell progressStage={progressStage}>
          <MiniGameStageView
            stage={scene.stage}
            onComplete={() => finishGame(scene.stage)}
          />
        </AppShell>
      );
    case "stageResult":
      return (
        <AppShell progressStage={progressStage} showHeader={false}>
          <div className="shell__cyber-wrap">
            <CyberScreenStageResult
              stage={scene.stage}
              onNext={() => finishStageResult(scene.stage)}
            />
          </div>
        </AppShell>
      );
    case "interStage":
      return (
        <AppShell progressStage={progressStage} showHeader={false}>
          <div className="shell__cyber-wrap">
            <CyberScreenInterStage
              nextStage={scene.nextStage}
              onContinue={() => continueAfterInterStage(scene.nextStage)}
            />
          </div>
        </AppShell>
      );
    case "trainingSummary":
      return (
        <AppShell progressStage={progressStage}>
          <TrainingSummaryScreen onContinue={finishTrainingSummary} />
        </AppShell>
      );
    case "finale":
      return (
        <AppShell progressStage={progressStage} showHeader={false}>
          <div className="shell__cyber-wrap">
            <CyberScreenFinal onRestart={goToIntro} />
          </div>
        </AppShell>
      );
    default: {
      const _exhaustive: never = scene;
      return _exhaustive;
    }
  }
}
