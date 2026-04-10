/**
 * Мини-игра «Детектор лжи» — логика и разметка из game1.html.
 * Game1.init(container) → Game1.start({ onComplete }) → при «Далее» вызывается onComplete(score, errors).
 */
(function (global) {
  const MESSAGES = [
    {
      text: "Здравствуйте! Меня зовут Алексей, я сотрудник службы безопасности Ozon Банка.",
      time: "14:32",
      danger: false,
      wrongTitle: "Это не признак мошенничества",
      wrongBody:
        "Представиться — нормально. Мошенники обычно раскрываются позже, когда просят данные или торопят вас.",
    },
    {
      text: "По вашему счёту зафиксирована подозрительная активность. Нам нужно срочно проверить данные.",
      time: "14:32",
      danger: true,
      correctTitle: "Правильно — это давление через страх",
      correctBody:
        "«Срочно», «подозрительная активность» — классические триггеры. Реальный банк не требует немедленных действий по телефону.",
    },
    {
      text: "Назовите код из SMS, который только что пришёл на ваш номер.",
      time: "14:33",
      danger: true,
      correctTitle: "Правильно — банк никогда не просит SMS-код",
      correctBody:
        "Ни один сотрудник банка не имеет права запрашивать одноразовые коды из SMS. Это главный признак мошенника.",
    },
    {
      text: "Это стандартная процедура верификации, займёт не более двух минут.",
      time: "14:33",
      danger: false,
      wrongTitle: "Эта реплика не опасна сама по себе",
      wrongBody:
        "Слова о «стандартной процедуре» звучат убедительно, но не являются признаком мошенничества. Опасны конкретные просьбы — назвать код, перевести деньги.",
    },
    {
      text: "Для вашей защиты нам нужно перевести средства на безопасный счёт прямо сейчас.",
      time: "14:34",
      danger: true,
      correctTitle: "Правильно — «безопасный счёт» не существует",
      correctBody:
        "Банки никогда не просят переводить деньги на «защитный» счёт. Это и есть мошеннический счёт.",
    },
    {
      text: "Пожалуйста, никому не сообщайте о нашем разговоре — это конфиденциально.",
      time: "14:34",
      danger: true,
      correctTitle: "Правильно — просьба о секретности это красный флаг",
      correctBody:
        "Настоящий банк никогда не просит скрывать разговор. Эта просьба нужна, чтобы вы не успели посоветоваться с близкими.",
    },
    {
      text: "Если хотите — можете перезвонить нам по номеру на обороте вашей карты.",
      time: "14:35",
      danger: false,
      wrongTitle: "Это признак настоящего банка",
      wrongBody:
        "Предложение перезвонить по официальному номеру — правильное поведение. Мошенники никогда так не говорят, потому что боятся потерять контакт.",
    },
  ];

  const SCORE_CORRECT = 150;
  const SCORE_PENALTY = 50;
  const TOTAL_DANGER = MESSAGES.filter((m) => m.danger).length;

  const TEMPLATE = `
    <div class="g1-screen">
      <div class="hud">
        <svg class="hud-bg" viewBox="0 0 320 90" fill="none" preserveAspectRatio="xMidYMid slice">
          <line x1="0" y1="30" x2="320" y2="30" stroke="#fff" stroke-width=".4" opacity=".08" stroke-dasharray="3 5"/>
          <line x1="0" y1="70" x2="320" y2="70" stroke="#6EE04A" stroke-width=".4" opacity=".12" stroke-dasharray="3 5"/>
          <polygon points="270,6 290,6 290,26 270,26" stroke="#6EE04A" stroke-width="1" fill="none" opacity=".25"/>
          <polygon points="16,58 24,70 16,82 8,70" stroke="#fff" stroke-width=".8" fill="none" opacity=".12"/>
        </svg>
        <div class="hud-content">
          <div class="hud-row">
            <div class="hud-title">⚡ Детектор лжи</div>
            <div class="timer" data-g1-timer-wrap>
              <div class="timer-dot"></div>
              <div class="timer-text" data-g1-timer-display>0:45</div>
            </div>
          </div>
          <div class="progress-bar"><div class="progress-fill" data-g1-progress></div></div>
          <div class="hud-sub">
            <div class="hud-label">ЭТАП 1 / 4</div>
            <div class="flags-count" data-g1-flags>🚩 0 флагов</div>
          </div>
        </div>
      </div>
      <div class="chat" data-g1-chat>
        <div class="caller-bar">
          <div class="caller-avatar">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="6" r="3" fill="#fff"/>
              <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            </svg>
          </div>
          <div>
            <div class="caller-name">Служба безопасности Ozon</div>
            <div class="caller-sub">+7 (800) 234-56-78</div>
          </div>
          <div class="caller-badge">⚠ Проверь</div>
        </div>
        <div class="msg visible">
          <div class="bubble system">Звонок начался · 14:32</div>
        </div>
      </div>
      <div class="hint">
        <div class="hint-text">Тапни на реплику → <span>🚩 отметь мошенника</span></div>
      </div>
      <div class="tooltip" data-g1-tooltip>
        <div class="tooltip-header">
          <div class="tooltip-tag" data-g1-tooltip-tag></div>
          <button type="button" class="tooltip-close" data-g1-tooltip-close>✕</button>
        </div>
        <div class="tooltip-title" data-g1-tooltip-title></div>
        <div class="tooltip-body" data-g1-tooltip-body></div>
      </div>
      <div class="end-screen" data-g1-end-screen>
        <div class="end-score" data-g1-end-score>+720</div>
        <div class="end-label">очков заработано</div>
        <div class="end-title" data-g1-end-title>Шлем получен!</div>
        <div class="end-sub" data-g1-end-sub></div>
        <button type="button" class="btn-end" data-g1-btn-end>Далее →</button>
      </div>
    </div>
  `;

  /** @type {HTMLElement | null} */
  let mountEl = null;
  /** @type {ReturnType<typeof setInterval> | null} */
  let timerInterval = null;
  /** @type {ReturnType<typeof setTimeout> | null} */
  let tooltipTimer = null;
  /** @type {ReturnType<typeof setTimeout>[] } */
  let pendingTimeouts = [];

  let flagCount = 0;
  let errorCount = 0;
  let revealed = 0;
  let score = 0;
  let gameOver = false;
  let timeLeft = 45;
  /** @type {((s: number) => void) | null} */
  let onCompleteCb = null;
  let finishedReported = false;

  function clearAllTimers() {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    if (tooltipTimer !== null) {
      clearTimeout(tooltipTimer);
      tooltipTimer = null;
    }
    pendingTimeouts.forEach((id) => clearTimeout(id));
    pendingTimeouts = [];
  }

  function after(ms, fn) {
    const id = setTimeout(() => {
      const i = pendingTimeouts.indexOf(id);
      if (i !== -1) pendingTimeouts.splice(i, 1);
      fn();
    }, ms);
    pendingTimeouts.push(id);
    return id;
  }

  function qs(sel) {
    return mountEl ? mountEl.querySelector(sel) : null;
  }

  function updateProgress() {
    const el = qs("[data-g1-progress]");
    if (el) el.style.width = Math.round((revealed / MESSAGES.length) * 100) + "%";
  }

  function updateFlagDisplay() {
    const el = qs("[data-g1-flags]");
    if (!el) return;
    const n = flagCount;
    const word = n === 1 ? "флаг" : n < 5 ? "флага" : "флагов";
    el.textContent = "🚩 " + n + " " + word;
  }

  function closeTooltip() {
    qs("[data-g1-tooltip]")?.classList.remove("show");
    if (tooltipTimer !== null) {
      clearTimeout(tooltipTimer);
      tooltipTimer = null;
    }
  }

  function showTooltip(isCorrect, msg) {
    const tt = qs("[data-g1-tooltip]");
    const tag = qs("[data-g1-tooltip-tag]");
    const title = qs("[data-g1-tooltip-title]");
    const body = qs("[data-g1-tooltip-body]");
    if (!tt || !tag || !title || !body) return;

    if (isCorrect) {
      tag.textContent = "✓ ВЕРНО";
      tag.className = "tooltip-tag correct";
      title.textContent = msg.correctTitle;
      body.textContent = msg.correctBody;
    } else {
      tag.textContent = "✗ ОШИБКА";
      tag.className = "tooltip-tag wrong";
      title.textContent = msg.wrongTitle;
      body.textContent = msg.wrongBody;
    }

    tt.classList.add("show");
    if (tooltipTimer !== null) clearTimeout(tooltipTimer);
    tooltipTimer = setTimeout(() => {
      tooltipTimer = null;
      closeTooltip();
    }, 4500);
  }

  function addBadge(parent, className, text) {
    const b = document.createElement("div");
    b.className = className;
    b.textContent = text;
    parent.appendChild(b);
  }

  function checkWin() {
    if (flagCount >= TOTAL_DANGER) {
      after(800, endGame);
    }
  }

  function endGame() {
    if (gameOver) return;
    gameOver = true;
    clearInterval(timerInterval);
    timerInterval = null;
    closeTooltip();

    const es = qs("[data-g1-end-screen]");
    const title = qs("[data-g1-end-title]");
    const sub = qs("[data-g1-end-sub]");
    const scoreEl = qs("[data-g1-end-score]");
    if (!es || !title || !sub || !scoreEl) return;

    scoreEl.textContent = "+" + score;

    if (errorCount === 0) {
      title.textContent = "🪖 Шлем получен! Без единой ошибки!";
      sub.textContent =
        "Ты распознал все мошеннические реплики и не попался ни разу. Отличная реакция!";
    } else if (errorCount <= 2) {
      title.textContent = "🪖 Шлем получен!";
      sub.textContent =
        "Ты нашёл всех мошенников, но допустил " +
        errorCount +
        (errorCount === 1 ? " ошибку" : " ошибки") +
        ". В следующий раз будет точнее.";
    } else {
      title.textContent = "🪖 Шлем получен, но с трудом";
      sub.textContent =
        "Ошибок: " +
        errorCount +
        ". Потренируйся отличать нейтральные реплики от реально опасных.";
    }

    es.classList.add("show");
  }

  function handleTap(bubble, msg) {
    if (bubble.classList.contains("done") || gameOver) return;
    bubble.classList.add("done");

    if (msg.danger) {
      flagCount++;
      score += SCORE_CORRECT;
      bubble.classList.add("flagged");
      addBadge(bubble, "flag-badge", "🚩");
      showTooltip(true, msg);
      updateFlagDisplay();
      checkWin();
    } else {
      errorCount++;
      score = Math.max(0, score - SCORE_PENALTY);
      bubble.classList.add("wrong");
      addBadge(bubble, "wrong-badge", "✗");
      showTooltip(false, msg);
      after(1200, () => {
        if (!bubble.isConnected) return;
        bubble.classList.remove("wrong");
        bubble.classList.add("safe-ok");
        bubble.querySelector(".wrong-badge")?.remove();
        addBadge(bubble, "safe-badge", "✓");
      });
    }
  }

  function revealNext() {
    if (revealed >= MESSAGES.length || gameOver) return;
    const msg = MESSAGES[revealed];
    const chat = qs("[data-g1-chat]");
    if (!chat) return;

    const msgEl = document.createElement("div");
    msgEl.className = "msg";

    const bubble = document.createElement("div");
    bubble.className = "bubble caller";
    bubble.textContent = msg.text;
    bubble.addEventListener("click", () => handleTap(bubble, msg));

    const timeEl = document.createElement("div");
    timeEl.className = "msg-time";
    timeEl.textContent = msg.time;

    msgEl.appendChild(bubble);
    msgEl.appendChild(timeEl);
    chat.appendChild(msgEl);

    requestAnimationFrame(() =>
      requestAnimationFrame(() => msgEl.classList.add("visible")),
    );

    chat.scrollTop = chat.scrollHeight;
    revealed++;
    updateProgress();

    if (revealed < MESSAGES.length) {
      after(1400 + Math.random() * 700, revealNext);
    } else {
      after(8000, () => {
        if (!gameOver) endGame();
      });
    }
  }

  function startTimer() {
    const timerWrap = qs("[data-g1-timer-wrap]");
    const timerDisplay = qs("[data-g1-timer-display]");
    if (!timerWrap || !timerDisplay) return;

    timeLeft = 45;
    timerWrap.classList.remove("urgent");
    timerDisplay.textContent = "0:45";

    timerInterval = setInterval(() => {
      if (gameOver) {
        clearInterval(timerInterval);
        timerInterval = null;
        return;
      }
      timeLeft--;
      if (timeLeft < 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        endGame();
        return;
      }
      const m = Math.floor(timeLeft / 60);
      const s = timeLeft % 60;
      timerDisplay.textContent = m + ":" + (s < 10 ? "0" : "") + s;
      if (timeLeft <= 10) timerWrap.classList.add("urgent");
    }, 1000);
  }

  function resetPlayState() {
    flagCount = 0;
    errorCount = 0;
    revealed = 0;
    score = 0;
    gameOver = false;
    finishedReported = false;
    closeTooltip();
    const chat = qs("[data-g1-chat]");
    if (chat) {
      chat.innerHTML = `
        <div class="caller-bar">
          <div class="caller-avatar">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="6" r="3" fill="#fff"/>
              <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            </svg>
          </div>
          <div>
            <div class="caller-name">Служба безопасности Ozon</div>
            <div class="caller-sub">+7 (800) 234-56-78</div>
          </div>
          <div class="caller-badge">⚠ Проверь</div>
        </div>
        <div class="msg visible">
          <div class="bubble system">Звонок начался · 14:32</div>
        </div>
      `;
    }
    qs("[data-g1-end-screen]")?.classList.remove("show");
    const prog = qs("[data-g1-progress]");
    if (prog) prog.style.width = "0%";
    updateFlagDisplay();
    const tw = qs("[data-g1-timer-wrap]");
    if (tw) tw.classList.remove("urgent");
    const td = qs("[data-g1-timer-display]");
    if (td) td.textContent = "0:45";
  }

  function onBtnEnd() {
    if (finishedReported || !onCompleteCb) return;
    finishedReported = true;
    onCompleteCb(score, errorCount);
  }

  const Game1 = {
    /**
     * @param {HTMLElement} containerEl — обычно #game-container
     */
    init(containerEl) {
      this.destroy();
      mountEl = containerEl;
      mountEl.classList.add("game1-root");
      mountEl.innerHTML = TEMPLATE;

      qs("[data-g1-tooltip-close]")?.addEventListener("click", closeTooltip);
      qs("[data-g1-btn-end]")?.addEventListener("click", onBtnEnd);
    },

    /**
     * @param {{ onComplete: (score: number, errors: number) => void }} options
     */
    start(options) {
      if (!mountEl) return;
      clearAllTimers();
      onCompleteCb = options.onComplete;
      resetPlayState();
      after(700, revealNext);
      startTimer();
    },

    destroy() {
      clearAllTimers();
      onCompleteCb = null;
      finishedReported = false;
      if (mountEl) {
        mountEl.classList.remove("game1-root");
        mountEl.innerHTML = "";
      }
      mountEl = null;
    },
  };

  global.Game1 = Game1;
})(typeof window !== "undefined" ? window : globalThis);
