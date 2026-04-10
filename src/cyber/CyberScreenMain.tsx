type Props = {
  onStart: () => void;
};

export function CyberScreenMain({ onStart }: Props) {
  return (
    <div className="cyber-fullbleed">
      <div className="cyber-root">
        <div className="cyber-phone">
          <div className="cyber-screen cyber-main">
            <svg className="cyber-main__bg" viewBox="0 0 320 620" fill="none" preserveAspectRatio="xMidYMid slice">
              <line x1="0" y1="120" x2="320" y2="120" stroke="var(--ds-cyber-blue)" strokeWidth=".5" strokeDasharray="4 7" opacity=".3" />
              <line x1="0" y1="240" x2="320" y2="240" stroke="var(--ds-cyber-blue)" strokeWidth=".5" strokeDasharray="4 7" opacity=".18" />
              <line x1="0" y1="400" x2="320" y2="400" stroke="var(--ds-cyber-green)" strokeWidth=".5" strokeDasharray="4 8" opacity=".18" />
              <line x1="0" y1="520" x2="320" y2="520" stroke="var(--ds-cyber-blue)" strokeWidth=".5" strokeDasharray="4 7" opacity=".12" />
              <line x1="64" y1="0" x2="64" y2="620" stroke="var(--ds-cyber-blue)" strokeWidth=".5" strokeDasharray="4 7" opacity=".12" />
              <line x1="160" y1="0" x2="160" y2="620" stroke="var(--ds-cyber-blue)" strokeWidth=".5" strokeDasharray="4 7" opacity=".08" />
              <line x1="256" y1="0" x2="256" y2="620" stroke="var(--ds-cyber-blue)" strokeWidth=".5" strokeDasharray="4 7" opacity=".12" />
              <circle cx="160" cy="260" r="110" fill="var(--ds-cyber-blue)" opacity=".06" />
              <circle cx="160" cy="260" r="65" fill="var(--ds-cyber-blue)" opacity=".07" />
              <polyline points="10,32 10,10 32,10" stroke="var(--ds-cyber-green)" strokeWidth="2.5" fill="none" opacity=".7" />
              <polyline points="288,10 310,10 310,32" stroke="var(--ds-cyber-green)" strokeWidth="2.5" fill="none" opacity=".7" />
              <polyline points="10,588 10,610 32,610" stroke="var(--ds-cyber-blue)" strokeWidth="2.5" fill="none" opacity=".45" />
              <polyline points="288,610 310,610 310,588" stroke="var(--ds-cyber-blue)" strokeWidth="2.5" fill="none" opacity=".45" />
              <polygon points="160,110 174,132 160,154 146,132" stroke="var(--ds-cyber-green)" strokeWidth="1.2" fill="none" opacity=".35" />
              <polygon points="36,410 44,422 36,434 28,422" stroke="var(--ds-cyber-magenta)" strokeWidth="1" fill="var(--ds-cyber-magenta)" opacity=".1" />
              <polygon points="284,330 292,342 284,354 276,342" stroke="var(--ds-cyber-blue)" strokeWidth="1" fill="var(--ds-cyber-blue)" opacity=".15" />
              <rect x="0" y="259" width="320" height="1.5" fill="var(--ds-cyber-green)" opacity=".07" />
            </svg>
            <div className="cyber-main__content">
              <div className="cyber-main__logo">● Ozon Банк × Funtech</div>
              <div className="cyber-main__hero">
                <svg width="190" height="210" viewBox="0 0 190 210" fill="none" aria-hidden>
                  <ellipse cx="95" cy="205" rx="50" ry="6" fill="var(--ds-cyber-blue)" opacity=".35" />
                  <rect x="62" y="182" width="28" height="22" rx="8" fill="var(--ds-cyber-blue)" opacity=".85" />
                  <rect x="100" y="182" width="28" height="22" rx="8" fill="var(--ds-cyber-blue)" opacity=".85" />
                  <rect x="65" y="187" width="22" height="3" rx="1" fill="var(--ds-cyber-green)" opacity=".55" />
                  <rect x="103" y="187" width="22" height="3" rx="1" fill="var(--ds-cyber-green)" opacity=".55" />
                  <rect x="52" y="108" width="86" height="80" rx="12" fill="var(--ds-cyber-blue)" />
                  <rect x="68" y="124" width="54" height="40" rx="8" fill="var(--ds-cyber-dark)" opacity=".55" />
                  <rect x="76" y="131" width="38" height="26" rx="5" fill="var(--ds-cyber-green)" opacity=".75" />
                  <circle cx="95" cy="144" r="7" fill="var(--ds-cyber-green)" />
                  <circle cx="95" cy="144" r="4" fill="#fff" />
                  <circle cx="95" cy="144" r="2" fill="var(--ds-cyber-green)" />
                  <rect x="30" y="104" width="26" height="44" rx="9" fill="var(--ds-cyber-blue)" />
                  <rect x="134" y="104" width="26" height="44" rx="9" fill="var(--ds-cyber-blue)" />
                  <rect x="33" y="111" width="20" height="4" rx="2" fill="var(--ds-cyber-green)" opacity=".6" />
                  <rect x="137" y="111" width="20" height="4" rx="2" fill="var(--ds-cyber-green)" opacity=".6" />
                  <rect x="60" y="52" width="70" height="62" rx="14" fill="var(--ds-cyber-blue)" />
                  <rect x="68" y="60" width="54" height="36" rx="9" fill="var(--ds-cyber-dark)" opacity=".75" />
                  <rect x="74" y="65" width="42" height="26" rx="6" fill="var(--ds-cyber-green)" opacity=".18" />
                  <rect x="77" y="70" width="12" height="7" rx="3" fill="var(--ds-cyber-green)" />
                  <rect x="101" y="70" width="12" height="7" rx="3" fill="var(--ds-cyber-green)" />
                  <polygon points="95,34 107,52 83,52" fill="var(--ds-cyber-blue)" />
                  <rect x="91" y="24" width="8" height="14" rx="3" fill="var(--ds-cyber-magenta)" opacity=".9" />
                  <circle cx="95" cy="80" r="44" stroke="var(--ds-cyber-green)" strokeWidth="1.2" fill="none" opacity=".2" strokeDasharray="4 5" />
                </svg>
              </div>
              <div className="cyber-main__text">
                <h1 className="cyber-main__title">
                  КИБЕР.<span className="cyber-main__title-accent">РЫЦАРЬ</span>
                </h1>
                <p className="cyber-main__subtitle">
                  Прокачай защиту — обезвредь мошенника.
                  <br />
                  4 этапа, реальные угрозы.
                </p>
              </div>
              <button type="button" className="cyber-btn-main" onClick={onStart}>
                Начать игру →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
