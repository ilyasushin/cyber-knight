import { STAGE_CONTENT } from "../content/stageContent";
import type { StageIndex } from "../types/scene";
import { RewardLockIcon } from "./RewardLockIcon";
import { StageDots } from "./StageDots";
import { StagePrepIllustration } from "./StagePrepIllustration";

type Props = {
  stage: StageIndex;
  onPlay: () => void;
};

export function CyberScreenStagePrep({ stage, onPlay }: Props) {
  const c = STAGE_CONTENT[stage];
  return (
    <div className="cyber-root">
      <div className="cyber-phone">
        <div className="cyber-screen cyber-stage">
          <div className="cyber-stage__top">
            <svg className="cyber-stage__top-bg" viewBox="0 0 320 180" fill="none" preserveAspectRatio="xMidYMid slice">
              <line x1="0" y1="48" x2="320" y2="48" stroke="#fff" strokeWidth=".5" opacity=".08" strokeDasharray="3 6" />
              <line x1="0" y1="110" x2="320" y2="110" stroke="#fff" strokeWidth=".5" opacity=".06" strokeDasharray="3 6" />
              <line x1="0" y1="160" x2="320" y2="160" stroke="var(--ds-cyber-green)" strokeWidth=".5" opacity=".14" strokeDasharray="3 6" />
              <polygon points="240,12 264,12 264,36 240,36" stroke="var(--ds-cyber-green)" strokeWidth="1.2" fill="none" opacity=".28" />
              <polygon points="36,140 48,128 60,140 48,152" stroke="var(--ds-cyber-magenta)" strokeWidth="1" fill="none" opacity=".22" />
              <circle cx="290" cy="120" r="30" stroke="#fff" strokeWidth=".6" fill="none" opacity=".06" />
            </svg>
            <div className="cyber-stage__top-inner">
              <div className="cyber-stage__head">
                <div className="cyber-stage__badge">◆ ЭТАП {stage} ИЗ 4</div>
                <StageDots activeStage={stage} />
              </div>
              <div className="cyber-stage__illo">
                <StagePrepIllustration stage={stage} />
              </div>
            </div>
          </div>
          <div className="cyber-stage__body">
            <div className="cyber-stage__tag">
              {c.themeEmoji} {c.themeTag}
            </div>
            <h2 className="cyber-stage__title">{c.prepTitle}</h2>
            <p className="cyber-stage__desc">{c.prepDescription}</p>
            <div className="cyber-reward-row">
              <div className="cyber-reward-icon">
                <RewardLockIcon />
              </div>
              <div>
                <div className="cyber-reward-label">{c.rewardLabel}</div>
                <div className="cyber-reward-name">{c.rewardName}</div>
              </div>
            </div>
            <button type="button" className="cyber-btn-play" onClick={onPlay}>
              Играть →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
