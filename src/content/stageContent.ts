import type { StageIndex } from "../types/scene";

export type StageContent = {
  themeEmoji: string;
  themeTag: string;
  prepTitle: string;
  prepDescription: string;
  rewardLabel: string;
  rewardName: string;
  resultCardTitle: string;
  resultCardSub: string;
};

export const STAGE_CONTENT: Record<StageIndex, StageContent> = {
  1: {
    themeEmoji: "⚡",
    themeTag: "Неожиданные звонки",
    prepTitle: "Детектор лжи",
    prepDescription:
      "Фразы приходят как в чате — тапни на подозрительные реплики. Таймер не ждёт.",
    rewardLabel: "Награда за этап",
    rewardName: "Шлем «Кодовое слово»",
    resultCardTitle: "Получен: шлем «Кодовое слово»",
    resultCardSub: "Без него мошенники не выдадут себя за тебя в поддержке.",
  },
  2: {
    themeEmoji: "🌐",
    themeTag: "Поддельные сайты",
    prepTitle: "Найди подделку",
    prepDescription: "Пять пар страниц — ищи отличия между оригиналом и фишингом.",
    rewardLabel: "Награда за этап",
    rewardName: "Броня «Пароль для покупок»",
    resultCardTitle: "Получена: броня «Пароль для покупок»",
    resultCardSub: "Даже троян на телефоне не проведёт покупку без пароля.",
  },
  3: {
    themeEmoji: "🦠",
    themeTag: "Вредоносное ПО",
    prepTitle: "Сапёр",
    prepDescription: "Сетка иконок — отметь всё подозрительное. Без паники: проиграть нельзя.",
    rewardLabel: "Награда за этап",
    rewardName: "Щит «Лимиты на траты»",
    resultCardTitle: "Получен: щит «Лимиты на траты»",
    resultCardSub: "Даже при компрометации карты лимиты удержат ущерб.",
  },
  4: {
    themeEmoji: "💸",
    themeTag: "Лёгкие деньги",
    prepTitle: "Красная кнопка",
    prepDescription: "Лента как в соцсетях — свайпай карточки. Пять решений, без жизней.",
    rewardLabel: "Награда за этап",
    rewardName: "Плащ «Скрытый баланс»",
    resultCardTitle: "Получены: плащ и аура «Забота о близких»",
    resultCardSub: "Скрытый баланс и защита близких — финальный арсенал.",
  },
};

/** Награда, только что полученная перед входом на nextStage (2…4). */
export function getEarnedForInterStage(nextStage: 2 | 3 | 4): {
  rewardName: string;
  rewardLabel: string;
} {
  const completed = (nextStage - 1) as StageIndex;
  const c = STAGE_CONTENT[completed];
  return { rewardName: c.rewardName, rewardLabel: "Ты получил" };
}
