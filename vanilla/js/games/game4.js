/**
 * Этап 4 — «Красная кнопка» (логика из game4.html).
 * Game4.init(container) → Game4.start({ onComplete }) → «Далее →» вызывает onComplete(score, errors).
 */
(function (global) {
  const CARDS = [
    {
      avatar: "💼",
      sender: "Работа Онлайн",
      badge: "badge-job",
      badgeText: "Вакансия",
      title: "Менеджер по приёму платежей — 80 000 ₽/мес",
      text: "Принимай переводы на свою карту, оставляй 10% себе. Работа удалённая, без опыта.",
      highlight: "Принимай переводы на карту",
      highlightClass: "scam",
      isScam: true,
      correctTitle: "Скам — классическая схема дроппера",
      correctBody:
        "«Принимать переводы на карту» — это работа дроппером. Тебя используют для отмывания денег, а уголовная ответственность ляжет на тебя.",
      wrongTitle: "Это скам — ты пропустил дроппера",
      wrongBody:
        "«Принимать переводы на карту» — незаконная схема отмывания денег мошенников.",
    },
    {
      avatar: "📈",
      sender: "InvestPro",
      badge: "badge-invest",
      badgeText: "Инвестиции",
      title: "Вложи 5 000 ₽ — получи 50 000 за 3 дня",
      text: "Уникальная стратегия с гарантией 1000% прибыли. Только 10 мест осталось!",
      highlight: "Гарантия 1000% прибыли",
      highlightClass: "scam",
      isScam: true,
      correctTitle: "Скам — гарантированной прибыли не бывает",
      correctBody:
        "Любое предложение с «гарантией прибыли» — мошенничество. Настоящие инвестиции всегда несут риск потери.",
      wrongTitle: "Это скам — гарантий прибыли не существует",
      wrongBody: "1000% за 3 дня — пирамида. Никто не может гарантировать такую доходность.",
    },
    {
      avatar: "🏪",
      sender: "Ozon Маркет",
      badge: "badge-news",
      badgeText: "Акция",
      title: "Скидка 30% на электронику до конца недели",
      text: "Официальная акция Ozon. Скидки на смартфоны, ноутбуки и аксессуары. Проверь в приложении.",
      highlight: "Официальная акция Ozon",
      highlightClass: "",
      isScam: false,
      correctTitle: "Верно — это обычная акция",
      correctBody:
        "Нормальное рекламное предложение: скидка, ограниченный срок, предложение проверить в официальном приложении.",
      wrongTitle: "Это обычная акция, не скам",
      wrongBody:
        "Обычные скидки — нормальная практика. Скам — нереальные обещания прибыли или просьбы передать данные карты.",
    },
    {
      avatar: "🎁",
      sender: "Призы для вас",
      badge: "badge-prize",
      badgeText: "Розыгрыш",
      title: "Вы выиграли iPhone 15! Заберите приз сейчас",
      text: "Вы стали победителем нашего розыгрыша. Для получения приза оплатите доставку — 299 ₽.",
      highlight: "Оплатите доставку 299 ₽",
      highlightClass: "scam",
      isScam: true,
      correctTitle: "Скам — приза нет, есть только «доставка»",
      correctBody:
        "«Оплати доставку приза» — стандартная схема. После оплаты ничего не придёт. Настоящие призы не требуют оплаты.",
      wrongTitle: "Это скам — ты не участвовал в розыгрыше",
      wrongBody:
        "Если ты не участвовал в розыгрыше, ты не мог выиграть. «Оплата доставки» — способ украсть деньги.",
    },
    {
      avatar: "☕",
      sender: "Кофейня Бодрость",
      badge: "badge-news",
      badgeText: "Новость",
      title: "Открылась новая точка на Ленинском проспекте",
      text: "Приходи на открытие — первый кофе бесплатно. Покажи этот пост на кассе.",
      highlight: "Первый кофе бесплатно",
      highlightClass: "",
      isScam: false,
      correctTitle: "Верно — это обычная реклама",
      correctBody:
        "Стандартное промо: скидка при показе поста, конкретный адрес, реальная выгода. Никаких подозрительных запросов.",
      wrongTitle: "Это обычная реклама кофейни",
      wrongBody:
        "Бесплатный кофе при показе поста — обычный маркетинг. Скамом было бы требование ввести данные карты.",
    },
    {
      avatar: "💰",
      sender: "Быстрые Деньги",
      badge: "badge-transfer",
      badgeText: "Перевод",
      title: "Срочный займ 50 000 ₽ без проверки кредитной истории",
      text: "Одобрение за 5 минут. Для получения переведи страховой взнос 2 000 ₽ на наш счёт.",
      highlight: "Переведи страховой взнос",
      highlightClass: "scam",
      isScam: true,
      correctTitle: "Скам — легальные займы не требуют предоплаты",
      correctBody:
        "Требование заплатить «взнос» перед займом — классический развод. Банки никогда не берут предоплату.",
      wrongTitle: "Это скам — займы без предоплаты",
      wrongBody:
        "«Переведи взнос, чтобы получить займ» — мошенническая схема. Настоящие кредиторы вычитают комиссию из суммы займа.",
    },
    {
      avatar: "🎓",
      sender: "Курсы Онлайн",
      badge: "badge-job",
      badgeText: "Обучение",
      title: "Курс Python с нуля — 3 месяца, сертификат",
      text: "Записывайся на бесплатное пробное занятие. Преподаватели из Яндекса и Mail.ru.",
      highlight: "Бесплатное пробное занятие",
      highlightClass: "",
      isScam: false,
      correctTitle: "Верно — это обычный образовательный курс",
      correctBody:
        "Бесплатное пробное занятие — стандартная практика онлайн-школ. Нет давления, нет запросов данных карты.",
      wrongTitle: "Это обычный курс, не скам",
      wrongBody:
        "Бесплатное первое занятие — нормальный маркетинг. Скам был бы, если бы просили предоплату.",
    },
    {
      avatar: "🤖",
      sender: "CryptoBot",
      badge: "badge-invest",
      badgeText: "Крипта",
      title: "Автоторговля криптой — пассивный доход от 300% в месяц",
      text: "Наш ИИ-бот торгует за тебя. Минимальный вклад — 10 000 ₽. Выводи прибыль каждый день.",
      highlight: "300% в месяц",
      highlightClass: "scam",
      isScam: true,
      correctTitle: "Скам — 300% в месяц невозможно",
      correctBody:
        "Даже лучшие инвесторы зарабатывают 20–30% в год. 300% в месяц — явная ложь. Это пирамида.",
      wrongTitle: "Это скам — 300% в месяц не существует",
      wrongBody:
        "Никакой «ИИ-бот» не даёт 300% в месяц стабильно. Классическая инвестиционная пирамида.",
    },
  ];

  const TOTAL = CARDS.length;

  const TEMPLATE = `
    <div class="game4-screen">
      <div class="game4-hud">
        <svg class="game4-hud-bg" viewBox="0 0 320 80" fill="none" preserveAspectRatio="xMidYMid slice">
          <line x1="0" y1="28" x2="320" y2="28" stroke="#fff" stroke-width=".4" opacity=".08" stroke-dasharray="3 5"/>
          <line x1="0" y1="65" x2="320" y2="65" stroke="#6EE04A" stroke-width=".4" opacity=".12" stroke-dasharray="3 5"/>
          <polygon points="270,5 292,5 292,24 270,24" stroke="#6EE04A" stroke-width="1" fill="none" opacity=".25"/>
        </svg>
        <div class="game4-hud-c">
          <div class="game4-hud-row">
            <div class="game4-hud-title">🔴 Красная кнопка</div>
            <div class="game4-progress-pill" data-g4-pill>1 / 8</div>
          </div>
          <div class="game4-progress-bar"><div class="game4-progress-fill" data-g4-progress></div></div>
          <div class="game4-hud-sub">
            <div class="game4-hud-label">ЭТАП 4 / 4</div>
            <div class="game4-score-disp" data-g4-score>★ 0 очков</div>
          </div>
        </div>
      </div>
      <div class="game4-feed" data-g4-feed></div>
      <div class="game4-tooltip" data-g4-tooltip>
        <div class="game4-tooltip-header">
          <div class="game4-tooltip-tag" data-g4-tooltip-tag></div>
          <button type="button" class="game4-tooltip-close" data-g4-tooltip-close>✕</button>
        </div>
        <div class="game4-tooltip-title" data-g4-tooltip-title></div>
        <div class="game4-tooltip-body" data-g4-tooltip-body></div>
      </div>
      <div class="game4-end-screen" data-g4-end-screen>
        <div class="game4-end-score" data-g4-end-score>+0</div>
        <div class="game4-end-label">очков заработано</div>
        <div class="game4-end-title" data-g4-end-title></div>
        <div class="game4-end-sub" data-g4-end-sub></div>
        <button type="button" class="game4-btn-end" data-g4-btn-end>Далее →</button>
      </div>
    </div>
  `;

  /** @type {HTMLElement | null} */
  let mountEl = null;
  let answered = 0;
  let score = 0;
  let errors = 0;
  /** @type {ReturnType<typeof setTimeout> | null} */
  let tooltipTimer = null;
  /** @type {ReturnType<typeof setTimeout> | null} */
  let endGameTimer = null;
  /** @type {ReturnType<typeof setTimeout> | null} */
  let wrongShakeTimer = null;
  /** @type {((s: number) => void) | null} */
  let onCompleteCb = null;
  let finishedReported = false;

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
    if (wrongShakeTimer !== null) {
      clearTimeout(wrongShakeTimer);
      wrongShakeTimer = null;
    }
  }

  function closeTooltip() {
    qs("[data-g4-tooltip]")?.classList.remove("game4-show");
    if (tooltipTimer !== null) {
      clearTimeout(tooltipTimer);
      tooltipTimer = null;
    }
  }

  function showTooltip(correct, title, body) {
    const tt = qs("[data-g4-tooltip]");
    const tag = qs("[data-g4-tooltip-tag]");
    const tEl = qs("[data-g4-tooltip-title]");
    const bEl = qs("[data-g4-tooltip-body]");
    if (!tt || !tag || !tEl || !bEl) return;

    tag.textContent = correct ? "✓ ВЕРНО" : "✗ ОШИБКА";
    tag.className = "game4-tooltip-tag " + (correct ? "game4-tag-ok" : "game4-tag-bad");
    tEl.textContent = title;
    bEl.textContent = body;
    tt.classList.add("game4-show");
    if (tooltipTimer !== null) clearTimeout(tooltipTimer);
    tooltipTimer = setTimeout(() => {
      tooltipTimer = null;
      closeTooltip();
    }, 4500);
  }

  function handleChoice(i, choseScam) {
    if (!mountEl) return;
    const card = CARDS[i];
    const cardEl = mountEl.querySelector(`[data-g4-card="${i}"]`);
    if (!cardEl) return;
    const actionsEl = cardEl.querySelector(".game4-card-actions");
    const resultEl = cardEl.querySelector(".game4-card-result");
    if (!actionsEl || !resultEl) return;

    actionsEl.querySelectorAll("button").forEach((b) => {
      b.disabled = true;
    });

    const correct = choseScam === card.isScam;

    if (correct) {
      score += 150;
      cardEl.classList.add(card.isScam ? "game4-correct-scam" : "game4-correct-ok");
      resultEl.className = "game4-card-result game4-show game4-right";
      resultEl.innerHTML = card.isScam ? "🚩 Правильно — это скам" : "✓ Правильно — это норм";
      showTooltip(true, card.correctTitle, card.correctBody);
    } else {
      errors++;
      score = Math.max(0, score - 40);
      cardEl.classList.add("game4-wrong");
      wrongShakeTimer = setTimeout(() => {
        wrongShakeTimer = null;
        cardEl.classList.remove("game4-wrong");
      }, 400);
      resultEl.className = "game4-card-result game4-show game4-wrong-r";
      resultEl.innerHTML = card.isScam ? "✓ Ошибка — это был скам" : "🚩 Ошибка — это было норм";
      showTooltip(false, card.wrongTitle, card.wrongBody);
    }

    const scoreDisp = qs("[data-g4-score]");
    if (scoreDisp) scoreDisp.textContent = "★ " + score + " очков";
    answered++;
    const prog = qs("[data-g4-progress]");
    if (prog) prog.style.width = (answered / TOTAL) * 100 + "%";
    const pill = qs("[data-g4-pill]");
    if (pill) pill.textContent = answered + " / " + TOTAL;

    if (answered >= TOTAL) {
      endGameTimer = setTimeout(() => {
        endGameTimer = null;
        endGame();
      }, 1200);
    }
  }

  function endGame() {
    if (!mountEl) return;
    closeTooltip();
    const endScore = qs("[data-g4-end-score]");
    const endTitle = qs("[data-g4-end-title]");
    const endSub = qs("[data-g4-end-sub]");
    const es = qs("[data-g4-end-screen]");
    if (!endScore || !endTitle || !endSub || !es) return;

    endScore.textContent = "+" + score;

    if (errors === 0) {
      endTitle.textContent = "🌌 Плащ получен! Безупречно!";
      endSub.textContent =
        "Ты распознал все схемы без единой ошибки. Твои близкие в безопасности.";
    } else {
      endTitle.textContent = "🌌 Плащ «Скрытый баланс» получен";
      endSub.textContent =
        "Ошибок: " +
        errors +
        ". Главное правило: если обещают лёгкие деньги — это ловушка.";
    }

    es.classList.add("game4-show");
  }

  function buildFeed() {
    const feed = qs("[data-g4-feed]");
    if (!feed) return;
    feed.innerHTML = "";

    CARDS.forEach((card, i) => {
      const el = document.createElement("div");
      el.className = "game4-feed-card";
      el.setAttribute("data-g4-card", String(i));

      const badgeClass = "game4-card-badge game4-" + card.badge;
      const highlightHtml = card.highlight
        ? `<div class="game4-card-highlight${card.highlightClass === "scam" ? " game4-highlight-scam" : ""}">${card.highlight}</div>`
        : "";

      el.innerHTML = `
        <div class="game4-card-header">
          <div class="game4-card-avatar">${card.avatar}</div>
          <div><div class="game4-card-sender">${card.sender} <span class="${badgeClass}">${card.badgeText}</span></div></div>
          <div class="game4-card-time">сейчас</div>
        </div>
        <div class="game4-card-body">
          <div class="game4-card-title">${card.title}</div>
          <div class="game4-card-text">${card.text}</div>
          ${highlightHtml}
        </div>
        <div class="game4-card-result"></div>
        <div class="game4-card-actions">
          <button type="button" class="game4-btn-norm">✓ Норм</button>
          <button type="button" class="game4-btn-scam">🚩 Скам</button>
        </div>`;

      const actions = el.querySelector(".game4-card-actions");
      const norm = actions?.querySelector(".game4-btn-norm");
      const scam = actions?.querySelector(".game4-btn-scam");
      norm?.addEventListener("click", () => handleChoice(i, false));
      scam?.addEventListener("click", () => handleChoice(i, true));

      feed.appendChild(el);
    });
  }

  function onBtnEnd() {
    if (finishedReported || !onCompleteCb) return;
    finishedReported = true;
    onCompleteCb(score, errors);
  }

  function bindUi() {
    qs("[data-g4-tooltip-close]")?.addEventListener("click", closeTooltip);
    qs("[data-g4-btn-end]")?.addEventListener("click", onBtnEnd);
  }

  const Game4 = {
    /**
     * @param {HTMLElement} containerEl — #game-container
     */
    init(containerEl) {
      this.destroy();
      mountEl = containerEl;
      mountEl.classList.add("game4-root");
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
      answered = 0;
      score = 0;
      errors = 0;

      closeTooltip();
      qs("[data-g4-end-screen]")?.classList.remove("game4-show");

      const scoreDisp = qs("[data-g4-score]");
      if (scoreDisp) scoreDisp.textContent = "★ 0 очков";
      const prog = qs("[data-g4-progress]");
      if (prog) prog.style.width = "0%";
      const pill = qs("[data-g4-pill]");
      if (pill) pill.textContent = "1 / " + TOTAL;

      buildFeed();
    },

    destroy() {
      clearAllTimers();
      onCompleteCb = null;
      finishedReported = false;
      if (mountEl) {
        mountEl.classList.remove("game4-root");
        mountEl.innerHTML = "";
      }
      mountEl = null;
    },
  };

  global.Game4 = Game4;
})(typeof window !== "undefined" ? window : globalThis);
