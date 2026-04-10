type Props = {
  onContinue: () => void;
};

export function TrainingSummaryScreen({ onContinue }: Props) {
  return (
    <main className="screen">
      <h2 className="screen__title">Тренировка пройдена</h2>
      <ul className="screen__list">
        <li>Звонки и фишинг — ты знаешь, на что смотреть.</li>
        <li>Вредонос на «рабочем столе» — ты его отметил.</li>
        <li>Слишком лёгкие деньги — ты не повёлся.</li>
      </ul>
      <button type="button" className="btn btn--primary" onClick={onContinue}>
        Дальше
      </button>
    </main>
  );
}
