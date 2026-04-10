import { getEarnedForInterStage } from "../content/stageContent";
import { RewardLockIcon } from "./RewardLockIcon";
import { StageDots } from "./StageDots";

type Props = {
  nextStage: 2 | 3 | 4;
  onContinue: () => void;
};

function InterArmorVisual() {
  return (
    <svg width="200" height="120" viewBox="0 0 200 120" fill="none" aria-hidden>
      <circle cx="100" cy="60" r="48" stroke="var(--ds-cyber-green)" strokeWidth="1.5" fill="rgb(110 224 74 / 8%)" opacity=".9" strokeDasharray="5 4" />
      <path
        d="M100 22 L118 38 L118 82 L100 98 L82 82 L82 38 Z"
        fill="var(--ds-cyber-blue)"
        opacity=".85"
      />
      <path d="M100 32 L108 40 L108 78 L100 86 L92 78 L92 40 Z" fill="var(--ds-cyber-dark)" opacity=".5" />
      <circle cx="100" cy="58" r="6" fill="var(--ds-cyber-green)" />
    </svg>
  );
}

/** Межэтаповый экран: доспех надет, короткий продуктовый текст. */
export function CyberScreenInterStage({ nextStage, onContinue }: Props) {
  const earned = getEarnedForInterStage(nextStage);
  return (
    <div className="cyber-root">
      <div className="cyber-phone">
        <div className="cyber-screen cyber-stage">
          <div className="cyber-stage__top">
            <svg className="cyber-stage__top-bg" viewBox="0 0 320 180" fill="none" preserveAspectRatio="xMidYMid slice">
              <line x1="0" y1="48" x2="320" y2="48" stroke="#fff" strokeWidth=".5" opacity=".08" strokeDasharray="3 6" />
              <line x1="0" y1="110" x2="320" y2="110" stroke="#fff" strokeWidth=".5" opacity=".06" strokeDasharray="3 6" />
              <line x1="0" y1="160" x2="320" y2="160" stroke="var(--ds-cyber-green)" strokeWidth=".5" opacity=".14" strokeDasharray="3 6" />
            </svg>
            <div className="cyber-stage__top-inner">
              <div className="cyber-stage__head">
                <div className="cyber-stage__badge">◆ ЭТАП {nextStage} ИЗ 4</div>
                <StageDots activeStage={nextStage} />
              </div>
              <div className="cyber-stage__illo">
                <InterArmorVisual />
              </div>
            </div>
          </div>
          <div className="cyber-stage__body">
            <div className="cyber-stage__tag">🛡 Новый слой защиты</div>
            <h2 className="cyber-stage__title">Новый доспех</h2>
            <p className="cyber-stage__desc">
              Снаряжение встало на место. Дальше — следующая угроза из реальной жизни.
            </p>
            <div className="cyber-reward-row cyber-reward-row--spaced">
              <div className="cyber-reward-icon">
                <RewardLockIcon />
              </div>
              <div>
                <div className="cyber-reward-label">{earned.rewardLabel}</div>
                <div className="cyber-reward-name">{earned.rewardName}</div>
              </div>
            </div>
            <button type="button" className="cyber-btn-play" onClick={onContinue}>
              Продолжить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
