const SECURITY_GUIDE_URL = "https://finance.ozon.ru/promo/security";

type Props = {
  onRestart?: () => void;
};

function FinalBg() {
  return (
    <svg className="cyber-final__bg" viewBox="0 0 320 620" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <line x1="0" y1="100" x2="320" y2="100" stroke="var(--ds-cyber-purple)" strokeWidth=".5" strokeDasharray="4 7" opacity=".2" />
      <line x1="0" y1="240" x2="320" y2="240" stroke="var(--ds-cyber-purple)" strokeWidth=".5" strokeDasharray="4 7" opacity=".12" />
      <line x1="0" y1="400" x2="320" y2="400" stroke="var(--ds-cyber-green)" strokeWidth=".5" strokeDasharray="4 7" opacity=".15" />
      <line x1="0" y1="530" x2="320" y2="530" stroke="var(--ds-cyber-purple)" strokeWidth=".5" strokeDasharray="4 7" opacity=".1" />
      <line x1="64" y1="0" x2="64" y2="620" stroke="var(--ds-cyber-purple)" strokeWidth=".5" strokeDasharray="4 7" opacity=".1" />
      <line x1="160" y1="0" x2="160" y2="620" stroke="var(--ds-cyber-purple)" strokeWidth=".5" strokeDasharray="4 7" opacity=".07" />
      <line x1="256" y1="0" x2="256" y2="620" stroke="var(--ds-cyber-purple)" strokeWidth=".5" strokeDasharray="4 7" opacity=".1" />
      <circle cx="160" cy="280" r="150" stroke="var(--ds-cyber-purple)" strokeWidth="1.2" fill="none" opacity=".12" strokeDasharray="6 8" />
      <circle cx="160" cy="280" r="115" stroke="var(--ds-cyber-green)" strokeWidth="1" fill="none" opacity=".12" strokeDasharray="4 6" />
      <circle cx="160" cy="280" r="80" stroke="var(--ds-cyber-purple)" strokeWidth=".8" fill="none" opacity=".1" strokeDasharray="3 5" />
      <circle cx="160" cy="280" r="140" fill="var(--ds-cyber-purple)" opacity=".05" />
      <circle cx="160" cy="280" r="82" fill="var(--ds-cyber-green)" opacity=".05" />
      <polyline points="10,28 10,10 28,10" stroke="var(--ds-cyber-green)" strokeWidth="2.5" fill="none" opacity=".7" />
      <polyline points="292,10 310,10 310,28" stroke="var(--ds-cyber-green)" strokeWidth="2.5" fill="none" opacity=".7" />
      <polyline points="10,592 10,610 28,610" stroke="var(--ds-cyber-purple)" strokeWidth="2.5" fill="none" opacity=".5" />
      <polyline points="292,610 310,610 310,592" stroke="var(--ds-cyber-purple)" strokeWidth="2.5" fill="none" opacity=".5" />
      <polygon points="160,118 172,138 160,158 148,138" stroke="var(--ds-cyber-green)" strokeWidth="1.2" fill="none" opacity=".35" />
      <polygon points="36,400 44,413 36,426 28,413" stroke="var(--ds-cyber-magenta)" strokeWidth="1" fill="var(--ds-cyber-magenta)" opacity=".12" />
      <polygon points="284,330 292,343 284,356 276,343" stroke="var(--ds-cyber-purple)" strokeWidth="1" fill="var(--ds-cyber-purple)" opacity=".15" />
      <rect x="0" y="279" width="320" height="1.5" fill="var(--ds-cyber-green)" opacity=".07" />
    </svg>
  );
}

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <polygon
        points="7,1 8.8,5.3 13.5,5.7 10,8.8 11.1,13.4 7,10.8 2.9,13.4 4,8.8 0.5,5.7 5.2,5.3"
        fill="var(--ds-cyber-green)"
      />
    </svg>
  );
}

function FinalKnightFull() {
  return (
    <svg width="230" height="250" viewBox="0 0 230 250" fill="none" aria-hidden>
      <ellipse cx="115" cy="244" rx="62" ry="7" fill="var(--ds-cyber-purple)" opacity=".35" />
      <path
        d="M64 128 Q32 170 26 212 Q44 232 76 226 Q96 206 115 206 Q134 206 154 226 Q186 232 204 212 Q198 170 166 128 Q146 160 115 165 Q84 160 64 128Z"
        fill="var(--ds-cyber-purple)"
        opacity=".85"
      />
      <path d="M84 133 Q68 165 62 197 Q82 207 115 204 Q99 182 94 155Z" fill="#fff" opacity=".06" />
      <path
        d="M26 212 Q44 234 76 228 Q96 208 115 208 Q134 208 154 228 Q186 234 204 212"
        stroke="var(--ds-cyber-purple)"
        strokeWidth="1.5"
        fill="none"
        opacity=".5"
      />
      <rect x="78" y="218" width="26" height="28" rx="9" fill="var(--ds-cyber-blue)" opacity=".9" />
      <rect x="126" y="218" width="26" height="28" rx="9" fill="var(--ds-cyber-blue)" opacity=".9" />
      <rect x="81" y="225" width="20" height="3" rx="1.5" fill="var(--ds-cyber-green)" opacity=".6" />
      <rect x="129" y="225" width="20" height="3" rx="1.5" fill="var(--ds-cyber-green)" opacity=".6" />
      <rect x="66" y="132" width="98" height="92" rx="14" fill="var(--ds-cyber-blue)" />
      <rect x="78" y="143" width="74" height="54" rx="9" fill="var(--ds-cyber-dark)" opacity=".55" />
      <rect x="86" y="150" width="58" height="40" rx="7" fill="var(--ds-cyber-green)" opacity=".72" />
      <rect x="100" y="158" width="30" height="24" rx="5" fill="var(--ds-cyber-dark)" opacity=".8" />
      <circle cx="115" cy="167" r="7" stroke="var(--ds-cyber-green)" strokeWidth="1.5" fill="none" />
      <rect x="113" y="163" width="4" height="7" rx="2" fill="var(--ds-cyber-green)" />
      <rect x="108" y="170" width="14" height="9" rx="2" fill="var(--ds-cyber-green)" opacity=".7" />
      <circle cx="115" cy="174" r="1.5" fill="var(--ds-cyber-dark)" />
      <rect x="86" y="182" width="58" height="6" rx="3" fill="var(--ds-cyber-dark)" opacity=".6" />
      <rect x="86" y="182" width="44" height="6" rx="3" fill="var(--ds-cyber-green)" opacity=".8" />
      <rect x="38" y="126" width="32" height="56" rx="12" fill="var(--ds-cyber-blue)" />
      <rect x="160" y="126" width="32" height="56" rx="12" fill="var(--ds-cyber-blue)" />
      <rect x="41" y="134" width="26" height="4" rx="2" fill="var(--ds-cyber-green)" opacity=".65" />
      <rect x="163" y="134" width="26" height="4" rx="2" fill="var(--ds-cyber-green)" opacity=".65" />
      <rect x="41" y="142" width="26" height="2" rx="1" fill="var(--ds-cyber-green)" opacity=".3" />
      <rect x="163" y="142" width="26" height="2" rx="1" fill="var(--ds-cyber-green)" opacity=".3" />
      <rect x="41" y="148" width="18" height="2" rx="1" fill="var(--ds-cyber-purple)" opacity=".5" />
      <rect x="163" y="148" width="18" height="2" rx="1" fill="var(--ds-cyber-purple)" opacity=".5" />
      <rect x="10" y="136" width="34" height="46" rx="9" fill="var(--ds-cyber-blue)" opacity=".9" />
      <rect x="14" y="140" width="26" height="38" rx="6" fill="var(--ds-cyber-dark)" opacity=".5" />
      <polygon points="27,146 32,158 27,170 22,158" fill="var(--ds-cyber-green)" opacity=".8" />
      <rect x="14" y="162" width="26" height="3" rx="1" fill="var(--ds-cyber-green)" opacity=".4" />
      <rect x="14" y="168" width="20" height="3" rx="1" fill="var(--ds-cyber-green)" opacity=".25" />
      <rect x="74" y="56" width="82" height="80" rx="16" fill="var(--ds-cyber-blue)" />
      <rect x="84" y="66" width="62" height="44" rx="10" fill="var(--ds-cyber-dark)" opacity=".75" />
      <rect x="90" y="71" width="50" height="34" rx="7" fill="var(--ds-cyber-purple)" opacity=".18" />
      <rect x="92" y="77" width="16" height="10" rx="4" fill="var(--ds-cyber-purple)" />
      <rect x="92" y="77" width="16" height="10" rx="4" fill="#fff" opacity=".3" />
      <rect x="122" y="77" width="16" height="10" rx="4" fill="var(--ds-cyber-purple)" />
      <rect x="122" y="77" width="16" height="10" rx="4" fill="#fff" opacity=".3" />
      <rect x="84" y="94" width="62" height="1.5" fill="var(--ds-cyber-purple)" opacity=".4" />
      <polygon points="115,38 130,56 100,56" fill="var(--ds-cyber-blue)" />
      <rect x="111" y="22" width="8" height="20" rx="3" fill="var(--ds-cyber-magenta)" opacity=".9" />
      <rect x="109" y="18" width="12" height="7" rx="3" fill="var(--ds-cyber-magenta)" opacity=".6" />
      <circle cx="115" cy="88" r="54" stroke="var(--ds-cyber-purple)" strokeWidth="1.5" fill="none" opacity=".3" strokeDasharray="5 6" />
      <circle cx="115" cy="88" r="62" stroke="var(--ds-cyber-green)" strokeWidth=".8" fill="none" opacity=".18" strokeDasharray="3 7" />
      <circle cx="52" cy="92" r="3.5" fill="var(--ds-cyber-purple)" opacity=".6" />
      <circle cx="178" cy="80" r="3" fill="var(--ds-cyber-green)" opacity=".6" />
      <circle cx="46" cy="178" r="2.5" fill="var(--ds-cyber-green)" opacity=".5" />
      <circle cx="184" cy="190" r="3.5" fill="var(--ds-cyber-purple)" opacity=".5" />
      <circle cx="84" cy="48" r="2.5" fill="var(--ds-cyber-magenta)" opacity=".55" />
      <circle cx="146" cy="42" r="2" fill="var(--ds-cyber-purple)" opacity=".6" />
      <circle cx="28" cy="148" r="2" fill="var(--ds-cyber-purple)" opacity=".4" />
      <circle cx="200" cy="164" r="2.5" fill="var(--ds-cyber-green)" opacity=".4" />
    </svg>
  );
}

const FINAL_ITEMS = [
  { icon: "🪖", name: "Кодовое слово" },
  { icon: "🔒", name: "Пароль для покупок" },
  { icon: "🛡️", name: "Лимиты" },
  { icon: "🌌", name: "Скрытый баланс" },
] as const;

/** Экран 4 из reference/screens.html — полный доспех, CTA, «поделиться». */
export function CyberScreenFinal({ onRestart }: Props) {
  const handleShare = async () => {
    const shareData = {
      title: "Кибер.рыцарь",
      text: "Я прошёл тренировку по кибербезопасности с Ozon Банк × funtech",
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      }
    } catch {
      /* отмена или нет Web Share API */
    }
  };

  return (
    <div className="cyber-root">
      <div className="cyber-phone">
        <div className="cyber-screen cyber-final">
          <FinalBg />
          <div className="cyber-final__content">
            <div className="cyber-final__top-row">
              <div className="cyber-final__label">★ МИССИЯ ВЫПОЛНЕНА</div>
              <div className="cyber-final__stars" aria-hidden>
                <Star />
                <Star />
                <Star />
              </div>
            </div>

            <div className="cyber-final__title-block">
              <h1 className="cyber-final__title">
                КИБЕР.<span className="cyber-final__title-accent">РЫЦАРЬ</span>
              </h1>
              <p className="cyber-final__sub">Ты полностью защищён</p>
            </div>

            <div className="cyber-final__knight">
              <FinalKnightFull />
            </div>

            <div className="cyber-final__score-row" aria-hidden>
              <div className="cyber-final__score-card">
                <div className="cyber-final__fsn">3250</div>
                <div className="cyber-final__fsl">очков</div>
              </div>
              <div className="cyber-final__score-card">
                <div className="cyber-final__fsn">4/4</div>
                <div className="cyber-final__fsl">этапа</div>
              </div>
              <div className="cyber-final__score-card">
                <div className="cyber-final__fsn cyber-final__fsn--bad">3</div>
                <div className="cyber-final__fsl">ошибки</div>
              </div>
            </div>

            <div className="cyber-final__items">
              {FINAL_ITEMS.map((it) => (
                <div key={it.name} className="cyber-final__item">
                  <div className="cyber-final__item-icon">{it.icon}</div>
                  <div className="cyber-final__item-name">{it.name}</div>
                </div>
              ))}
            </div>

            <a
              className="cyber-btn-cta"
              href={SECURITY_GUIDE_URL}
              target="_blank"
              rel="noreferrer noopener"
            >
              Полный гайд по защите →
            </a>
            <button type="button" className="cyber-btn-share" onClick={handleShare}>
              Поделиться результатом
            </button>
            {onRestart ? (
              <button type="button" className="cyber-btn-restart" onClick={onRestart}>
                Сначала
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
