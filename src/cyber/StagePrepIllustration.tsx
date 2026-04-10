import type { StageIndex } from "../types/scene";

/** Иллюстрации подготовки к этапу (векторные SVG). */
export function StagePrepIllustration({ stage }: { stage: StageIndex }) {
  if (stage === 1) {
    return (
      <svg width="240" height="110" viewBox="0 0 240 110" fill="none" aria-hidden>
        <rect x="12" y="8" width="96" height="92" rx="12" fill="rgb(255 255 255 / 10%)" stroke="rgb(255 255 255 / 22%)" strokeWidth="1" />
        <rect x="22" y="20" width="60" height="14" rx="7" fill="rgb(255 255 255 / 22%)" />
        <rect x="22" y="40" width="48" height="14" rx="7" fill="var(--ds-cyber-magenta)" opacity=".7" />
        <rect x="74" y="38" width="10" height="18" rx="2.5" fill="var(--ds-cyber-magenta)" />
        <polygon points="74,38 84,43 74,48" fill="#fff" opacity=".85" />
        <rect x="22" y="60" width="66" height="14" rx="7" fill="rgb(255 255 255 / 18%)" />
        <rect x="22" y="78" width="40" height="14" rx="7" fill="var(--ds-cyber-magenta)" opacity=".5" />
        <rect x="66" y="78" width="10" height="18" rx="2.5" fill="var(--ds-cyber-magenta)" opacity=".6" />
        <circle cx="168" cy="55" r="36" fill="rgb(255 59 107 / 10%)" stroke="var(--ds-cyber-magenta)" strokeWidth="1.5" strokeDasharray="5 4" />
        <text
          x="168"
          y="58"
          textAnchor="middle"
          fill="var(--ds-cyber-magenta)"
          fontSize="22"
          fontWeight="900"
          fontFamily="Inter, sans-serif"
        >
          !
        </text>
        <text
          x="168"
          y="72"
          textAnchor="middle"
          fill="rgb(255 255 255 / 65%)"
          fontSize="9"
          fontWeight="700"
          fontFamily="Inter, sans-serif"
          letterSpacing="1"
        >
          МОШЕННИК
        </text>
        <line x1="118" y1="22" x2="210" y2="22" stroke="var(--ds-cyber-magenta)" strokeWidth=".6" opacity=".25" strokeDasharray="3 4" />
        <line x1="118" y1="90" x2="210" y2="90" stroke="var(--ds-cyber-magenta)" strokeWidth=".6" opacity=".25" strokeDasharray="3 4" />
      </svg>
    );
  }
  if (stage === 2) {
    return (
      <svg width="240" height="110" viewBox="0 0 240 110" fill="none" aria-hidden>
        <rect x="24" y="16" width="88" height="78" rx="10" fill="rgb(255 255 255 / 12%)" stroke="rgb(255 255 255 / 22%)" />
        <rect x="128" y="16" width="88" height="78" rx="10" fill="rgb(255 255 255 / 8%)" stroke="var(--ds-cyber-magenta)" strokeDasharray="4 3" />
        <text x="68" y="58" textAnchor="middle" fill="rgb(255 255 255 / 70%)" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">
          ozon.ru
        </text>
        <text x="172" y="58" textAnchor="middle" fill="var(--ds-cyber-magenta)" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">
          ozón.ru
        </text>
      </svg>
    );
  }
  if (stage === 3) {
    return (
      <svg width="240" height="110" viewBox="0 0 240 110" fill="none" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={16 + i * 42}
            y="28"
            width="34"
            height="34"
            rx="8"
            fill={i === 2 ? "rgb(255 59 107 / 35%)" : "rgb(255 255 255 / 12%)"}
            stroke={i === 2 ? "var(--ds-cyber-magenta)" : "rgb(255 255 255 / 18%)"}
          />
        ))}
        <text x="120" y="92" textAnchor="middle" fill="rgb(255 255 255 / 55%)" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif">
          отметь подозрительные
        </text>
      </svg>
    );
  }
  return (
    <svg width="240" height="110" viewBox="0 0 240 110" fill="none" aria-hidden>
      <rect x="40" y="20" width="160" height="70" rx="14" fill="rgb(255 255 255 / 10%)" stroke="rgb(255 255 255 / 18%)" />
      <rect x="56" y="38" width="56" height="34" rx="8" fill="var(--ds-cyber-green)" opacity=".35" />
      <rect x="128" y="38" width="56" height="34" rx="8" fill="var(--ds-cyber-magenta)" opacity=".45" />
      <text x="120" y="100" textAnchor="middle" fill="rgb(255 255 255 / 55%)" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif">
        свайп влево / вправо
      </text>
    </svg>
  );
}
