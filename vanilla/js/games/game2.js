/**
 * Этап 2 — «Найди подделку» (логика из game2.html).
 * Game2.init(container) → Game2.start({ onComplete }) → «Далее →» вызывает onComplete(score, errors).
 */
(function (global) {
  const ROUNDS = [
    {
      question: "Страница входа в Ozon Банк",
      fakeKey: "озон-банк.ru",
      realKey: "ozon.ru/bank",
      fakeLock: false,
      explanation: "«озон-банк.ru» написан кириллицей — это не официальный сайт Ozon.",
      correctTitle: "Верно! Домен на кириллице — фишинг",
      correctBody:
        "«Озон-банк.ru» написан кириллицей. Официальный домен — только ozon.ru. Всегда проверяй адресную строку.",
      wrongTitle: "Ошибка — настоящий сайт безопасен",
      wrongBody:
        "ozon.ru — официальный домен. Поддельным был «озон-банк.ru» с кириллицей в адресе.",
      fakeExtra: "cvv",
    },
    {
      question: "Страница пополнения карты",
      fakeKey: "ozon-pay.ru/card",
      realKey: "ozon.ru/pay",
      fakeLock: true,
      explanation: "«ozon-pay.ru» — не официальный домен. Любой сайт с «ozon» через дефис — фишинг.",
      correctTitle: "Верно! «ozon-pay.ru» — не Ozon",
      correctBody:
        "Мошенники добавляют слова к бренду через дефис: ozon-pay, ozon-bank, ozon-safe. Официальный сайт — только ozon.ru.",
      wrongTitle: "Ошибка — ozon.ru безопасен",
      wrongBody:
        "Поддельным был «ozon-pay.ru». Любой домен с дефисом после «ozon» — не официальный сайт.",
      fakeExtra: "btn",
    },
    {
      question: "Страница акции «Кешбэк 50%»",
      fakeKey: "0zon.ru/promo",
      realKey: "ozon.ru/promo",
      fakeLock: true,
      explanation: "В «0zon.ru» — цифра 0 вместо буквы O. Визуально почти незаметно.",
      correctTitle: "Верно! Ноль вместо буквы «O»",
      correctBody:
        "«0zon.ru» содержит цифру 0 вместо буквы O. Такие замены сложно заметить — всегда читай домен по буквам.",
      wrongTitle: "Ошибка — это был ozon.ru",
      wrongBody:
        "Фейком был «0zon.ru» с нулём вместо O. Визуально похоже, но это другой сайт.",
      fakeExtra: "phone",
    },
    {
      question: "Форма восстановления пароля",
      fakeKey: "ozon.account-restore.ru",
      realKey: "ozon.ru/restore",
      fakeLock: false,
      explanation:
        "Главный домен — «account-restore.ru». «ozon» здесь лишь поддомен чужого сайта.",
      correctTitle: "Верно! Ozon — поддомен, не сайт",
      correctBody:
        "В «ozon.account-restore.ru» настоящий домен — account-restore.ru. Ozon стоит слева от точки — это поддомен чужого сайта.",
      wrongTitle: "Ошибка — читай домен справа налево",
      wrongBody:
        "Фейком был «ozon.account-restore.ru». Главный домен — всегда правее последней точки. Здесь это account-restore.ru.",
      fakeExtra: "cvv",
    },
    {
      question: "Страница службы поддержки",
      fakeKey: "ozon.ru.support-chat.com",
      realKey: "ozon.ru/support",
      fakeLock: true,
      explanation:
        "Главный домен — «support-chat.com». «ozon.ru» здесь лишь часть пути, а не домен.",
      correctTitle: "Верно! Главный домен — support-chat.com",
      correctBody:
        "Мошенники вставляют «ozon.ru» в начало чужого домена. Читай адрес справа: .com — значит главный домен не Ozon.",
      wrongTitle: "Ошибка — ozon.ru/support безопасен",
      wrongBody:
        "Поддельным был «ozon.ru.support-chat.com». Главный домен — support-chat.com, а не ozon.ru.",
      fakeExtra: "btn",
    },
  ];

  const TEMPLATE = `
    <div class="game2-screen">
      <div class="game2-hud">
        <svg class="game2-hud-bg" viewBox="0 0 320 80" fill="none" preserveAspectRatio="xMidYMid slice">
          <line x1="0" y1="28" x2="320" y2="28" stroke="#fff" stroke-width=".4" opacity=".08" stroke-dasharray="3 5"/>
          <line x1="0" y1="65" x2="320" y2="65" stroke="#6EE04A" stroke-width=".4" opacity=".12" stroke-dasharray="3 5"/>
          <polygon points="270,5 292,5 292,24 270,24" stroke="#6EE04A" stroke-width="1" fill="none" opacity=".25"/>
        </svg>
        <div class="game2-hud-c">
          <div class="game2-hud-row">
            <div class="game2-hud-title">🔍 Найди подделку</div>
            <div class="game2-round-pill" data-g2-round-pill>Раунд 1 / 5</div>
          </div>
          <div class="game2-progress-bar"><div class="game2-progress-fill" data-g2-progress></div></div>
          <div class="game2-hud-sub">
            <div class="game2-hud-label">ЭТАП 2 / 4</div>
            <div class="game2-score-disp" data-g2-score>★ 0 очков</div>
          </div>
        </div>
      </div>
      <div class="game2-instruction">
        <div class="game2-instruction-text">Какой сайт <b>поддельный?</b> Свайпни влево 🚩 или нажми кнопку</div>
      </div>
      <div class="game2-arena">
        <div class="game2-card-stack" data-g2-stack></div>
      </div>
      <div class="game2-swipe-btns">
        <div class="game2-btn-wrap">
          <button type="button" class="game2-swipe-btn game2-btn-fake" data-g2-choose="fake">🚩</button>
          <div class="game2-swipe-label">Подделка</div>
        </div>
        <div class="game2-btn-wrap">
          <button type="button" class="game2-swipe-btn game2-btn-real" data-g2-choose="real">✓</button>
          <div class="game2-swipe-label">Настоящий</div>
        </div>
      </div>
      <div class="game2-result-overlay" data-g2-result-overlay>
        <div class="game2-result-panel">
          <div class="game2-result-tag" data-g2-result-tag></div>
          <div class="game2-result-title" data-g2-result-title></div>
          <div class="game2-result-body" data-g2-result-body></div>
          <div class="game2-result-diff">
            <div class="game2-result-diff-label">КЛЮЧЕВОЕ ОТЛИЧИЕ</div>
            <div class="game2-result-diff-text" data-g2-result-diff></div>
          </div>
          <button type="button" class="game2-btn-next" data-g2-btn-next>Следующий →</button>
        </div>
      </div>
      <div class="game2-end-screen" data-g2-end-screen>
        <div class="game2-end-score" data-g2-end-score>+0</div>
        <div class="game2-end-label">очков заработано</div>
        <div class="game2-end-title" data-g2-end-title></div>
        <div class="game2-end-sub" data-g2-end-sub></div>
        <button type="button" class="game2-btn-end" data-g2-btn-end>Далее →</button>
      </div>
    </div>
  `;

  /** @type {HTMLElement | null} */
  let mountEl = null;
  let currentRound = 0;
  let score = 0;
  let errors = 0;
  let answered = false;
  /** @type {ReturnType<typeof setTimeout>[]} */
  let pendingTimeouts = [];
  /** @type {((s: number) => void) | null} */
  let onCompleteCb = null;
  let finishedReported = false;

  function clearAllTimeouts() {
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

  function makeLock(ok) {
    const color = ok ? "#22c55e" : "#d1d5db";
    return `<svg class="game2-card-lock" viewBox="0 0 10 10" fill="none">
      <rect x="1" y="4" width="8" height="6" rx="1.5" fill="${color}"/>
      <rect x="3" y="1.5" width="4" height="4" rx="2" stroke="${color}" stroke-width="1.5" fill="none"/>
    </svg>`;
  }

  function makeCardHTML(url, isReal, r) {
    const lock = isReal ? makeLock(true) : makeLock(r.fakeLock);
    const urlClass = isReal ? "" : " game2-bad";
    const logoText = isReal || r.fakeExtra === "phone" ? "ozon банк" : "0zon банк";
    const logoClass = isReal ? "" : " game2-fake";
    const ctaText =
      isReal ? "Перейти" : r.fakeExtra === "btn" ? "Подтвердить данные" : "Перейти";
    const ctaClass = isReal || r.fakeExtra !== "btn" ? "game2-ok" : "game2-bad";

    const extraCVV =
      !isReal && r.fakeExtra === "cvv"
        ? `<div class="game2-card-fake-field"><div class="game2-card-fake-label">CVV карты:</div><div class="game2-card-fake-input">···</div></div>`
        : "";
    const extraPhone =
      !isReal && r.fakeExtra === "phone"
        ? `<div class="game2-card-fake-field"><div class="game2-card-fake-label">Телефон:</div><div class="game2-card-fake-input">+7 ···</div></div>`
        : "";

    return `
      <div class="game2-card-browser">
        <div class="game2-card-bar">
          ${lock}
          <div class="game2-card-url${urlClass}">${url}</div>
        </div>
        <div class="game2-card-site">
          <div class="game2-card-site-header">
            <div class="game2-card-logo${logoClass}">${logoText}</div>
            <div class="game2-card-nav"><span>Карты</span><span>Войти</span></div>
          </div>
          <div class="game2-card-hero">
            <div class="game2-card-hero-title">${r.question}</div>
            <div class="game2-card-hero-sub">Ozon Банк — надёжно и удобно</div>
            <div class="game2-card-cta ${ctaClass}">${ctaText}</div>
          </div>
          <div class="game2-card-body">
            ${extraCVV}${extraPhone}
            <div class="game2-card-body-row">
              <div class="game2-card-body-title">${isReal ? "Безопасное соединение" : "Введите данные для продолжения"}</div>
              <div class="game2-card-body-text">${isReal ? "Ваши данные защищены шифрованием." : "Для подтверждения личности заполните форму."}</div>
            </div>
          </div>
        </div>
      </div>`;
  }

  function setupDrag(card) {
    let startX = 0;
    let curX = 0;
    let dragging = false;

    const getX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

    function onStart(e) {
      dragging = true;
      startX = getX(e);
      card.style.transition = "none";
    }
    function onMove(e) {
      if (!dragging) return;
      curX = getX(e) - startX;
      const rot = curX * 0.12;
      card.style.transform = `translateX(${curX}px) rotate(${rot}deg)`;
      const pct = Math.min(Math.abs(curX) / 80, 1);
      const lr = card.querySelector(".game2-label-real");
      const lf = card.querySelector(".game2-label-fake");
      if (lr) lr.style.opacity = curX > 20 ? String(pct) : "0";
      if (lf) lf.style.opacity = curX < -20 ? String(pct) : "0";
      e.preventDefault();
    }
    function onEnd() {
      if (!dragging) return;
      dragging = false;
      card.style.transition = "transform 300ms ease";
      if (curX > 70) {
        animateOut(card, "right");
        choose("real");
      } else if (curX < -70) {
        animateOut(card, "left");
        choose("fake");
      } else {
        card.style.transform = "";
        const lr = card.querySelector(".game2-label-real");
        const lf = card.querySelector(".game2-label-fake");
        if (lr) lr.style.opacity = "0";
        if (lf) lf.style.opacity = "0";
      }
      curX = 0;
    }

    card.addEventListener("mousedown", onStart);
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseup", onEnd);
    card.addEventListener("mouseleave", onEnd);
    card.addEventListener("touchstart", onStart, { passive: true });
    card.addEventListener("touchmove", onMove, { passive: false });
    card.addEventListener("touchend", onEnd);
  }

  function animateOut(card, dir) {
    card.style.transition = "transform 350ms ease, opacity 350ms ease";
    card.style.transform = `translateX(${dir === "right" ? 360 : -360}px) rotate(${dir === "right" ? 22 : -22}deg)`;
    card.style.opacity = "0";
  }

  function choose(choice) {
    if (!mountEl || answered) return;
    answered = true;

    const r = ROUNDS[currentRound];
    const front = mountEl.querySelector(".game2-site-card.game2-front");
    if (!front) return;
    const frontIsFake = front.dataset.isFake === "true";
    const correct =
      (choice === "fake" && frontIsFake) || (choice === "real" && !frontIsFake);

    if (front.style.transform === "" || front.style.transform === "none") {
      animateOut(front, choice === "fake" ? "left" : "right");
    }

    if (correct) {
      score += 150;
    } else {
      errors++;
      score = Math.max(0, score - 30);
    }

    const scoreDisp = qs("[data-g2-score]");
    if (scoreDisp) scoreDisp.textContent = "★ " + score + " очков";

    after(380, () => showResult(correct, r));
  }

  function showResult(correct, r) {
    if (!mountEl) return;
    const ov = qs("[data-g2-result-overlay]");
    if (!ov) return;

    ov.className =
      "game2-result-overlay game2-show " + (correct ? "game2-tone-correct" : "game2-tone-wrong");

    const tag = qs("[data-g2-result-tag]");
    if (tag) {
      tag.textContent = correct ? "✓ ВЕРНО" : "✗ ОШИБКА";
      tag.className = "game2-result-tag " + (correct ? "game2-tag-ok" : "game2-tag-bad");
    }

    const rt = qs("[data-g2-result-title]");
    const rb = qs("[data-g2-result-body]");
    const rd = qs("[data-g2-result-diff]");
    if (rt) rt.textContent = correct ? r.correctTitle : r.wrongTitle;
    if (rb) rb.textContent = correct ? r.correctBody : r.wrongBody;
    if (rd) rd.textContent = r.explanation;

    const isLast = currentRound >= ROUNDS.length - 1;
    const btnNext = qs("[data-g2-btn-next]");
    if (btnNext) btnNext.textContent = isLast ? "Завершить →" : "Следующий →";
  }

  function nextRound() {
    if (!mountEl) return;
    const ov = qs("[data-g2-result-overlay]");
    if (ov) ov.className = "game2-result-overlay";

    currentRound++;
    if (currentRound >= ROUNDS.length) {
      endGame();
      return;
    }
    buildRound(currentRound);
  }

  function endGame() {
    if (!mountEl) return;
    const prog = qs("[data-g2-progress]");
    if (prog) prog.style.width = "100%";

    const es = qs("[data-g2-end-screen]");
    const endScore = qs("[data-g2-end-score]");
    const endTitle = qs("[data-g2-end-title]");
    const endSub = qs("[data-g2-end-sub]");
    if (!es || !endScore || !endTitle || !endSub) return;

    endScore.textContent = "+" + score;

    if (errors === 0) {
      endTitle.textContent = "🔒 Броня получена! Идеально!";
      endSub.textContent =
        "Ты распознал все поддельные сайты без единой ошибки. Главное правило — читай домен справа налево.";
    } else {
      endTitle.textContent = "🔒 Броня «Пароль для покупок» получена";
      endSub.textContent =
        "Ошибок: " +
        errors +
        ". Запомни: официальный сайт — только ozon.ru. Всё остальное — проверяй.";
    }

    es.classList.add("game2-show");
  }

  function buildRound(idx) {
    if (!mountEl) return;
    const r = ROUNDS[idx];
    const stack = qs("[data-g2-stack]");
    if (!stack) return;
    stack.innerHTML = "";

    const fakeIsLeft = Math.random() > 0.5;

    const back = document.createElement("div");
    back.className = "game2-site-card game2-back";
    back.innerHTML = makeCardHTML(fakeIsLeft ? r.realKey : r.fakeKey, fakeIsLeft, r);
    stack.appendChild(back);

    const front = document.createElement("div");
    front.className = "game2-site-card game2-front";
    front.dataset.isFake = fakeIsLeft ? "true" : "false";
    front.innerHTML = `
      <div class="game2-choice-label game2-label-real">✓ Настоящий</div>
      <div class="game2-choice-label game2-label-fake">🚩 Подделка</div>
      ${makeCardHTML(fakeIsLeft ? r.fakeKey : r.realKey, !fakeIsLeft, r)}`;
    stack.appendChild(front);

    setupDrag(front);
    answered = false;

    const pill = qs("[data-g2-round-pill]");
    if (pill) pill.textContent = "Раунд " + (idx + 1) + " / " + ROUNDS.length;
    const fill = qs("[data-g2-progress]");
    if (fill) fill.style.width = (idx / ROUNDS.length) * 100 + "%";
  }

  function onBtnEnd() {
    if (finishedReported || !onCompleteCb) return;
    finishedReported = true;
    onCompleteCb(score, errors);
  }

  function bindUi() {
    mountEl?.querySelectorAll("[data-g2-choose]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const ch = btn.getAttribute("data-g2-choose");
        if (ch === "fake" || ch === "real") choose(ch);
      });
    });
    qs("[data-g2-btn-next]")?.addEventListener("click", nextRound);
    qs("[data-g2-btn-end]")?.addEventListener("click", onBtnEnd);
  }

  const Game2 = {
    /**
     * @param {HTMLElement} containerEl — #game-container
     */
    init(containerEl) {
      this.destroy();
      mountEl = containerEl;
      mountEl.classList.add("game2-root");
      mountEl.innerHTML = TEMPLATE;
      bindUi();
    },

    /**
     * @param {{ onComplete: (score: number, errors: number) => void }} options
     */
    start(options) {
      if (!mountEl) return;
      clearAllTimeouts();
      onCompleteCb = options.onComplete;
      finishedReported = false;
      currentRound = 0;
      score = 0;
      errors = 0;
      answered = false;

      const es = qs("[data-g2-end-screen]");
      es?.classList.remove("game2-show");
      const ov = qs("[data-g2-result-overlay]");
      if (ov) ov.className = "game2-result-overlay";

      const scoreDisp = qs("[data-g2-score]");
      if (scoreDisp) scoreDisp.textContent = "★ 0 очков";

      buildRound(0);
    },

    destroy() {
      clearAllTimeouts();
      onCompleteCb = null;
      finishedReported = false;
      if (mountEl) {
        mountEl.classList.remove("game2-root");
        mountEl.innerHTML = "";
      }
      mountEl = null;
    },
  };

  global.Game2 = Game2;
})(typeof window !== "undefined" ? window : globalThis);
