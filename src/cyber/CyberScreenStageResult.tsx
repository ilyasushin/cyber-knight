import { STAGE_CONTENT } from "../content/stageContent";
import type { StageIndex } from "../types/scene";
type Props = {
  stage: StageIndex;
  onNext: () => void;
};

function ResultKnight() {
  return (
    <svg width="120" height="130" viewBox="0 0 120 130" fill="none" aria-hidden>
      <ellipse cx="60" cy="127" rx="34" ry="5" fill="var(--ds-cyber-green)" opacity=".22" />
      <rect x="38" y="116" width="18" height="13" rx="6" fill="var(--ds-cyber-blue)" opacity=".8" />
      <rect x="64" y="116" width="18" height="13" rx="6" fill="var(--ds-cyber-blue)" opacity=".8" />
      <rect x="32" y="70" width="56" height="52" rx="9" fill="var(--ds-cyber-blue)" opacity=".9" />
      <rect x="44" y="82" width="32" height="24" rx="6" fill="var(--ds-cyber-dark)" opacity=".55" />
      <rect x="50" y="87" width="20" height="14" rx="4" fill="var(--ds-cyber-green)" opacity=".75" />
      <circle cx="60" cy="94" r="5" fill="var(--ds-cyber-green)" />
      <circle cx="60" cy="94" r="2.5" fill="#fff" />
      <rect x="16" y="67" width="19" height="30" rx="7" fill="var(--ds-cyber-blue)" />
      <rect x="85" y="67" width="19" height="30" rx="7" fill="var(--ds-cyber-blue)" />
      <rect x="18" y="73" width="15" height="3" rx="1" fill="var(--ds-cyber-green)" opacity=".6" />
      <rect x="87" y="73" width="15" height="3" rx="1" fill="var(--ds-cyber-green)" opacity=".6" />
      <rect x="36" y="28" width="48" height="47" rx="12" fill="var(--ds-cyber-blue)" />
      <rect x="43" y="35" width="34" height="25" rx="7" fill="var(--ds-cyber-dark)" opacity=".7" />
      <rect x="48" y="39" width="24" height="17" rx="5" fill="var(--ds-cyber-green)" opacity=".22" />
      <rect x="51" y="43" width="8" height="7" rx="3" fill="var(--ds-cyber-green)" />
      <rect x="61" y="43" width="8" height="7" rx="3" fill="var(--ds-cyber-green)" />
      <polygon points="60,16 70,28 50,28" fill="var(--ds-cyber-blue)" />
      <rect x="56" y="8" width="8" height="11" rx="3" fill="var(--ds-cyber-magenta)" opacity=".9" />
      <circle cx="60" cy="47" r="30" stroke="var(--ds-cyber-green)" strokeWidth="1.5" fill="none" opacity=".35" strokeDasharray="4 5" />
    </svg>
  );
}

function ResultCardIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <rect x="4" y="10" width="18" height="15" rx="5" fill="var(--ds-cyber-green)" opacity=".8" />
      <rect x="8" y="13" width="10" height="9" rx="2.5" fill="var(--ds-cyber-dark)" />
      <rect x="10" y="4" width="6" height="10" rx="3" fill="var(--ds-cyber-green)" opacity=".8" />
      <circle cx="13" cy="17" r="3" fill="var(--ds-cyber-green)" />
    </svg>
  );
}

export function CyberScreenStageResult({ stage, onNext }: Props) {
  const c = STAGE_CONTENT[stage];
  return (
    <div className="cyber-root">
      <div className="cyber-phone">
        <div className="cyber-screen cyber-result">
          <svg className="cyber-result__bg" viewBox="0 0 320 620" fill="none" preserveAspectRatio="xMidYMid slice">
            <line x1="0" y1="90" x2="320" y2="90" stroke="var(--ds-cyber-green)" strokeWidth=".5" strokeDasharray="4 7" opacity=".14" />
            <line x1="0" y1="200" x2="320" y2="200" stroke="var(--ds-cyber-green)" strokeWidth=".5" strokeDasharray="4 7" opacity=".1" />
            <line x1="0" y1="420" x2="320" y2="420" stroke="var(--ds-cyber-blue)" strokeWidth=".5" strokeDasharray="4 7" opacity=".18" />
            <line x1="80" y1="0" x2="80" y2="620" stroke="var(--ds-cyber-green)" strokeWidth=".5" strokeDasharray="4 7" opacity=".08" />
            <line x1="240" y1="0" x2="240" y2="620" stroke="var(--ds-cyber-green)" strokeWidth=".5" strokeDasharray="4 7" opacity=".08" />
            <circle cx="160" cy="280" r="120" fill="var(--ds-cyber-green)" opacity=".04" />
            <circle cx="160" cy="280" r="72" fill="var(--ds-cyber-green)" opacity=".04" />
            <polygon points="160,120 178,150 160,180 142,150" stroke="var(--ds-cyber-green)" strokeWidth="1.2" fill="none" opacity=".28" />
            <polyline points="10,30 10,10 30,10" stroke="var(--ds-cyber-green)" strokeWidth="2.5" fill="none" opacity=".6" />
            <polyline points="290,10 310,10 310,30" stroke="var(--ds-cyber-green)" strokeWidth="2.5" fill="none" opacity=".6" />
            <rect x="0" y="279" width="320" height="1.5" fill="var(--ds-cyber-green)" opacity=".07" />
          </svg>
          <div className="cyber-result__content">
            <div className="cyber-result__top">
              <div className="cyber-chip-done">✓ Этап пройден</div>
              <div className="cyber-chip-stage">
                {stage} / 4
              </div>
            </div>
            <div className="cyber-result__knight">
              <ResultKnight />
            </div>
            <div className="cyber-result-card">
              <div className="cyber-result-card__icon">
                <ResultCardIcon />
              </div>
              <div>
                <p className="cyber-result-card__title">{c.resultCardTitle}</p>
                <p className="cyber-result-card__sub">{c.resultCardSub}</p>
              </div>
            </div>
            <button type="button" className="cyber-btn-next" onClick={onNext}>
              Дальше →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
