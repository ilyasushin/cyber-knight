/**
 * Этап 3 — «Сапёр» (логика из game3.html).
 * Game3.init(container) → Game3.start({ onComplete }) → «Далее →» вызывает onComplete(score, errors).
 */
(function (global) {
  const APPS = [
    { name: "Ozon", icon: "🛍️", bg: "#E5EDFF", danger: false },
    {
      name: "FastCleaner",
      icon: "⚡",
      bg: "#FEF3C7",
      danger: true,
      title: "«Очистители» — замаскированные трояны",
      body: "Приложения-«очистители» почти всегда содержат шпионский код и запрашивают доступ ко всему телефону.",
    },
    { name: "ВКонтакте", icon: "💙", bg: "#DBEAFE", danger: false },
    { name: "Telegram", icon: "✈️", bg: "#E0F2FE", danger: false },
    {
      name: "SpyTracker",
      icon: "👁️",
      bg: "#F3E8FF",
      danger: true,
      title: "SpyTracker — шпионская программа",
      body: "Название буквально говорит о слежке. Любое приложение с «Spy», «Track», «Monitor» в названии — красный флаг.",
    },
    { name: "Камера", icon: "📷", bg: "#F1F5F9", danger: false },
    { name: "Карты", icon: "🗺️", bg: "#DCFCE7", danger: false },
    {
      name: "BankHelper",
      icon: "💳",
      bg: "#FEF9C3",
      danger: true,
      title: "Поддельный «банковский помощник»",
      body: "Нет официального приложения с таким названием. Банковские приложения устанавливай только из официальных магазинов.",
    },
    { name: "Музыка", icon: "🎵", bg: "#FFE4E6", danger: false },
    { name: "Заметки", icon: "📝", bg: "#FEF3C7", danger: false },
    {
      name: "FreeVPN Pro",
      icon: "🔓",
      bg: "#E0E7FF",
      danger: true,
      title: "Бесплатный VPN — классическая ловушка",
      body: "Бесплатные VPN зарабатывают на твоих данных: перехватывают трафик и читают незашифрованные данные.",
    },
    { name: "Погода", icon: "⛅", bg: "#E0F2FE", danger: false },
    {
      name: "RootAccess",
      icon: "🔧",
      bg: "#FEE2E2",
      danger: true,
      title: "RootAccess — получает полный контроль",
      body: "Приложения с «Root» в названии пытаются получить системный доступ: читать SMS, перехватывать пароли.",
    },
    { name: "Калькулятор", icon: "🔢", bg: "#EDE9FE", danger: false },
    { name: "YouTube", icon: "▶️", bg: "#FEE2E2", danger: false },
    { name: "Контакты", icon: "👥", bg: "#DBEAFE", danger: false },
  ];

  const TOTAL_DANGER = APPS.filter((a) => a.danger).length;

  const TEMPLATE = `
    <div class="game3-screen">
      <div class="game3-hud">
        <svg class="game3-hud-bg" viewBox="0 0 320 80" fill="none" preserveAspectRatio="xMidYMid slice">
          <line x1="0" y1="28" x2="320" y2="28" stroke="#fff" stroke-width=".4" opacity=".08" stroke-dasharray="3 5"/>
          <line x1="0" y1="65" x2="320" y2="65" stroke="#6EE04A" stroke-width=".4" opacity=".12" stroke-dasharray="3 5"/>
          <polygon points="270,5 292,5 292,24 270,24" stroke="#6EE04A" stroke-width="1" fill="none" opacity=".25"/>
        </svg>
        <div class="game3-hud-c">
          <div class="game3-hud-row">
            <div class="game3-hud-title">💣 Сапёр</div>
            <div class="game3-found-pill" data-g3-found-pill>💣 0 / 5</div>
          </div>
          <div class="game3-progress-bar"><div class="game3-progress-fill" data-g3-progress></div></div>
          <div class="game3-hud-sub">
            <div class="game3-hud-label">ЭТАП 3 / 4</div>
            <div class="game3-error-disp" data-g3-errors>Ошибок: 0</div>
          </div>
        </div>
      </div>
      <div class="game3-instruction">
        <div class="game3-instruction-text">Найди все <b>вредоносные приложения</b> — тапни на каждое</div>
      </div>
      <div class="game3-desktop">
        <div class="game3-desktop-bar">
          <div class="game3-desktop-time">📱 Мой телефон</div>
          <div class="game3-desktop-icons-top">
            <div class="game3-desktop-icon-sm">📶</div>
            <div class="game3-desktop-icon-sm">🔋</div>
          </div>
        </div>
        <div class="game3-app-grid" data-g3-grid></div>
      </div>
      <div class="game3-tooltip" data-g3-tooltip>
        <div class="game3-tooltip-header">
          <div class="game3-tooltip-tag" data-g3-tooltip-tag></div>
          <button type="button" class="game3-tooltip-close" data-g3-tooltip-close>✕</button>
        </div>
        <div class="game3-tooltip-title" data-g3-tooltip-title></div>
        <div class="game3-tooltip-body" data-g3-tooltip-body></div>
      </div>
      <div class="game3-end-screen" data-g3-end-screen>
        <div class="game3-end-score" data-g3-end-score>+0</div>
        <div class="game3-end-label">очков заработано</div>
        <div class="game3-end-title" data-g3-end-title></div>
        <div class="game3-end-sub" data-g3-end-sub></div>
        <button type="button" class="game3-btn-end" data-g3-btn-end>Далее →</button>
      </div>
    </div>
  `;

  /** @type {HTMLElement | null} */
  let mountEl = null;
  let found = 0;
  let errors = 0;
  let score = 0;
  /** @type {ReturnType<typeof setTimeout> | null} */
  let tooltipTimer = null;
  /** @type {ReturnType<typeof setTimeout> | null} */
  let endGameTimer = null;
  /** @type {ReturnType<typeof setTimeout>[]} */
  let wrongTapTimers = [];
  /** @type {((s: number) => void) | null} */
  let onCompleteCb = null;
  let finishedReported = false;

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function qs(sel) {
    return mountEl ? mountEl.querySelector(sel) : null;
  }

  function clearAllTimers() {
    if (tooltipTimer !== null) {
      clearTimeout(tooltipTimer);
      tooltipTimer = null;
    }
    if (endGameTimer !== null) {
      clearTimeout(endGameTimer);
      endGameTimer = null;
    }
    wrongTapTimers.forEach((id) => clearTimeout(id));
    wrongTapTimers = [];
  }

  function updateHUD() {
    const pill = qs("[data-g3-found-pill]");
    const prog = qs("[data-g3-progress]");
    const err = qs("[data-g3-errors]");
    if (pill) pill.textContent = "💣 " + found + " / " + TOTAL_DANGER;
    if (prog) prog.style.width = (found / TOTAL_DANGER) * 100 + "%";
    if (err) err.textContent = "Ошибок: " + errors;
  }

  function closeTooltip() {
    qs("[data-g3-tooltip]")?.classList.remove("game3-show");
    if (tooltipTimer !== null) {
      clearTimeout(tooltipTimer);
      tooltipTimer = null;
    }
  }

  function showTooltip(correct, title, body) {
    const tt = qs("[data-g3-tooltip]");
    const tag = qs("[data-g3-tooltip-tag]");
    const tEl = qs("[data-g3-tooltip-title]");
    const bEl = qs("[data-g3-tooltip-body]");
    if (!tt || !tag || !tEl || !bEl) return;

    tag.textContent = correct ? "✓ ОБЕЗВРЕЖЕНО" : "✗ ОШИБКА";
    tag.className = "game3-tooltip-tag " + (correct ? "game3-tag-ok" : "game3-tag-bad");
    tEl.textContent = title;
    bEl.textContent = body;
    tt.classList.add("game3-show");
    if (tooltipTimer !== null) clearTimeout(tooltipTimer);
    tooltipTimer = setTimeout(() => {
      tooltipTimer = null;
      closeTooltip();
    }, 4200);
  }

  function handleTap(app, icon, check) {
    if (!mountEl) return;
    if (
      icon.classList.contains("game3-danger-found") ||
      icon.classList.contains("game3-exploded")
    ) {
      return;
    }

    if (app.danger) {
      found++;
      score += 150;
      icon.classList.add("game3-danger-found");
      check.classList.add("game3-show");
      updateHUD();
      showTooltip(true, app.title, app.body);
      if (found >= TOTAL_DANGER) {
        endGameTimer = setTimeout(() => {
          endGameTimer = null;
          endGame();
        }, 900);
      }
    } else {
      errors++;
      score = Math.max(0, score - 40);
      icon.classList.add("game3-safe-wrong");
      showTooltip(
        false,
        "Это обычное приложение",
        "Ты отметил безопасное приложение как вредоносное. Смотри на название — признаки опасных: Spy, Root, Free VPN, неизвестные «банковские помощники».",
      );
      const tid = setTimeout(() => {
        const i = wrongTapTimers.indexOf(tid);
        if (i !== -1) wrongTapTimers.splice(i, 1);
        icon.classList.remove("game3-safe-wrong");
        icon.classList.add("game3-exploded");
      }, 400);
      wrongTapTimers.push(tid);
      updateHUD();
    }
  }

  function endGame() {
    if (!mountEl) return;
    closeTooltip();
    const es = qs("[data-g3-end-screen]");
    const endScore = qs("[data-g3-end-score]");
    const endTitle = qs("[data-g3-end-title]");
    const endSub = qs("[data-g3-end-sub]");
    if (!es || !endScore || !endTitle || !endSub) return;

    endScore.textContent = "+" + score;

    if (errors === 0) {
      endTitle.textContent = "🛡️ Щит получен! Идеально!";
      endSub.textContent =
        "Ты нашёл все вредоносные приложения без единой ошибки. Настоящий сапёр.";
    } else {
      endTitle.textContent = "🛡️ Щит «Лимиты на траты» получен";
      endSub.textContent =
        "Ошибок: " +
        errors +
        ". Запомни признаки: Spy, Root, Free VPN, поддельные банковские приложения.";
    }

    es.classList.add("game3-show");
  }

  function buildGrid() {
    const grid = qs("[data-g3-grid]");
    if (!grid) return;
    grid.innerHTML = "";

    shuffle(APPS).forEach((app) => {
      const wrap = document.createElement("div");
      wrap.className = "game3-app";

      const icon = document.createElement("div");
      icon.className = "game3-app-icon";
      icon.style.background = app.bg;
      const span = document.createElement("span");
      span.style.fontSize = "26px";
      span.textContent = app.icon;
      icon.appendChild(span);

      const check = document.createElement("div");
      check.className = "game3-app-check";
      check.textContent = "✓";
      icon.appendChild(check);

      const name = document.createElement("div");
      name.className = "game3-app-name";
      name.textContent = app.name;

      wrap.appendChild(icon);
      wrap.appendChild(name);
      wrap.addEventListener("click", () => handleTap(app, icon, check));
      grid.appendChild(wrap);
    });
  }

  function onBtnEnd() {
    if (finishedReported || !onCompleteCb) return;
    finishedReported = true;
    onCompleteCb(score, errors);
  }

  function bindUi() {
    qs("[data-g3-tooltip-close]")?.addEventListener("click", closeTooltip);
    qs("[data-g3-btn-end]")?.addEventListener("click", onBtnEnd);
  }

  const Game3 = {
    /**
     * @param {HTMLElement} containerEl — #game-container
     */
    init(containerEl) {
      this.destroy();
      mountEl = containerEl;
      mountEl.classList.add("game3-root");
      mountEl.innerHTML = TEMPLATE;
      bindUi();
    },

    /**
     * @param {{ onComplete: (score: number, errors: number) => void }} options
     */
    start(options) {
      if (!mountEl) return;
      clearAllTimers();
      onCompleteCb = options.onComplete;
      finishedReported = false;
      found = 0;
      errors = 0;
      score = 0;

      closeTooltip();
      qs("[data-g3-end-screen]")?.classList.remove("game3-show");

      buildGrid();
      updateHUD();
    },

    destroy() {
      clearAllTimers();
      onCompleteCb = null;
      finishedReported = false;
      if (mountEl) {
        mountEl.classList.remove("game3-root");
        mountEl.innerHTML = "";
      }
      mountEl = null;
    },
  };

  global.Game3 = Game3;
})(typeof window !== "undefined" ? window : globalThis);
