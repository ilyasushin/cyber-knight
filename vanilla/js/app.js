/**
 * Роутер экранов и флоу: main → stage-intro → game → stage-result → … ×4 → final
 */
const gameState = {
  /** 0 — главный; 1–4 — текущий игровой этап */
  currentStage: 0,
  totalScore: 0,
  errors: 0,
};

/** @type {number | null} */
let lastRoundScore = null;

/** Текущая мини-игра (Game1…Game4) — выставляется перед init/start. */
let currentGame = null;

function showScreen(id) {
  document.querySelectorAll(".phone .screen").forEach((el) => {
    el.classList.toggle("active", el.getAttribute("data-screen") === id);
  });
}

function syncStageIntroDots(stage) {
  const root = document.querySelector('[data-screen="stage-intro"]');
  if (!root) return;
  const dots = root.querySelectorAll(".stage-dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === stage - 1);
  });
  const badge = root.querySelector("#stage-intro-badge");
  if (badge) {
    badge.textContent = `◆ ЭТАП ${stage} ИЗ 4`;
  }
}

/** Тексты карточки награды на экране результата — по завершённому этапу */
const RESULT_SCREEN_COPY = {
  1: {
    title: "Получен: Шлем «Кодовое слово»",
    sub: "Если мошенники выдают себя за банк — без кодового слова им не поверят",
  },
  2: {
    title: "Получена: Броня «Пароль для покупок»",
    sub: "Даже если троян в телефоне — без пароля покупки на Ozon не пройдут",
  },
  3: {
    title: "Получен: Щит «Лимиты на траты»",
    sub: "Даже если карта скомпрометирована — лимиты не дадут украсть много",
  },
  4: {
    title: "Получен: Плащ «Скрытый баланс»",
    sub: "Лишний слой защиты — мошенники не увидят полную картину твоих средств",
  },
};

/**
 * Подгружает разметку онбординга этапа из assets/stage-intro/{n}.html
 * (нужен HTTP; при открытии file:// покажется запасной блок с подсказкой).
 */
function syncStageIntro(stage) {
  syncStageIntroDots(stage);
  const host = document.getElementById("stage-intro-host");
  if (!host) return;
  const url = `assets/stage-intro/${stage}.html`;
  fetch(url)
    .then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.text();
    })
    .then((html) => {
      host.innerHTML = html;
    })
    .catch(() => {
      host.innerHTML = `<div class="ob"><svg class="ob-bg" viewBox="0 0 320 640" fill="none" preserveAspectRatio="xMidYMid slice"><circle cx="160" cy="280" r="120" fill="#1A55E3" opacity=".06"/></svg><div class="ob-content" style="min-height:480px;justify-content:center"><p class="ob-text">Не удалось загрузить экран этапа. Откройте страницу через локальный HTTP-сервер (например Live Server), чтобы подтягивались файлы из папки assets.</p><button type="button" class="ob-btn btn-play-stage">Начать этап →</button></div></div>`;
    });
}

function syncResultScreen() {
  const stage = gameState.currentStage;
  const chip = document.getElementById("result-chip-stage");
  if (chip) chip.textContent = `${stage} / 4`;

  const scoreEl = document.getElementById("result-score-num");
  if (scoreEl && lastRoundScore != null) {
    scoreEl.textContent = `+${lastRoundScore}`;
  }

  const nextBtn = document.getElementById("btn-result-next");
  if (nextBtn) {
    nextBtn.textContent = stage >= 4 ? "В финал →" : "Следующий этап →";
  }

  document.querySelectorAll("[data-result-knight]").forEach((el) => {
    const k = Number.parseInt(el.getAttribute("data-result-knight") || "0", 10);
    el.hidden = k !== stage;
  });

  const copy = RESULT_SCREEN_COPY[stage];
  if (copy) {
    const titleEl = document.getElementById("result-card-title");
    const subEl = document.getElementById("result-card-sub");
    if (titleEl) titleEl.textContent = copy.title;
    if (subEl) subEl.textContent = copy.sub;
  }
}

function syncFinalScreen() {
  const total = document.getElementById("final-total-score");
  if (total) total.textContent = String(gameState.totalScore);

  const err = document.getElementById("final-errors-count");
  if (err) {
    err.textContent = String(gameState.errors);
    err.classList.toggle("bad", gameState.errors > 0);
  }
}

/**
 * Колбэк завершения раунда: onComplete(score [, errors]) — score в gameState.totalScore,
 * экран награды: data-screen="stage-result" (после 4-го этапа кнопка ведёт на final).
 */
function beginStageFromIntro() {
  const stage = gameState.currentStage;
  if (stage < 1 || stage > 4) return;

  showScreen("game");
  const mount = document.getElementById("game-container");
  if (!mount) return;

  Game1.destroy();
  Game2.destroy();
  Game3.destroy();
  Game4.destroy();
  currentGame = null;

  const games = [null, Game1, Game2, Game3, Game4];
  currentGame = games[stage];
  if (!currentGame) return;

  const onRoundComplete = (score, roundErrors = 0) => {
    lastRoundScore = score;
    gameState.totalScore += score;
    if (typeof roundErrors === "number" && roundErrors > 0) {
      gameState.errors += roundErrors;
    }
    showScreen("stage-result");
    syncResultScreen();
  };

  currentGame.init(mount);
  currentGame.start({ onComplete: onRoundComplete });
}

function onResultNext() {
  const stage = gameState.currentStage;
  if (stage < 4) {
    gameState.currentStage = stage + 1;
    Game1.destroy();
    Game2.destroy();
    Game3.destroy();
    Game4.destroy();
    currentGame = null;
    showScreen("stage-intro");
    syncStageIntro(gameState.currentStage);
    return;
  }

  Game1.destroy();
  Game2.destroy();
  Game3.destroy();
  Game4.destroy();
  currentGame = null;
  syncFinalScreen();
  showScreen("final");
}

function wire() {
  document.getElementById("btn-intro-start")?.addEventListener("click", () => {
    gameState.currentStage = 1;
    gameState.totalScore = 0;
    gameState.errors = 0;
    lastRoundScore = null;
    showScreen("stage-intro");
    syncStageIntro(1);
  });

  document.getElementById("stage-intro-host")?.addEventListener("click", (e) => {
    if (e.target.closest(".btn-play-stage")) {
      beginStageFromIntro();
    }
  });

  document.getElementById("btn-result-next")?.addEventListener("click", () => {
    onResultNext();
  });

  document.getElementById("btn-share")?.addEventListener("click", async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Кибер.рыцарь",
          text: "Прошёл тренировку по кибербезопасности",
          url: window.location.href,
        });
      }
    } catch {
      /* отмена */
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  showScreen("main");
  wire();
});

globalThis.showScreen = showScreen;
globalThis.gameState = gameState;
