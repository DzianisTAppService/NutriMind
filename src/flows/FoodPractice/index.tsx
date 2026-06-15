import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { FlowShell } from '../../components/FlowShell';
import { EMOJIS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import styles from './styles.module.scss';

type Step = 'checkin' | 'exercise' | 'reflection' | 'done';

export const FoodPracticeFlow = memo(function FoodPracticeFlow() {
  const { setActiveFlow, updateSector, addTimelineEntry } = useApp();
  const [step, setStep] = useState<Step>('checkin');
  const [selectedEmoji, setSelectedEmoji] = useState(0);
  const [hunger, setHunger] = useState(5);
  const [timer, setTimer] = useState(60);
  const [reflection, setReflection] = useState<string | null>(null);

  useEffect(() => {
    if (step !== 'exercise' || timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [step, timer]);

  const handleClose = useCallback(() => setActiveFlow(null), [setActiveFlow]);
  const handleStartExercise = useCallback(() => setStep('exercise'), []);
  const handleFinishExercise = useCallback(() => setStep('reflection'), []);

  const handleReflection = useCallback(
    (answer: string) => {
      setReflection(answer);
      updateSector('food', 15);
      addTimelineEntry('food', `Осознанный укус: голод ${hunger}/10`);
      setStep('done');
    },
    [updateSector, addTimelineEntry, hunger],
  );

  const handleDone = useCallback(() => setActiveFlow(null), [setActiveFlow]);

  const timerProgress = useMemo(() => ((60 - timer) / 60) * 100, [timer]);

  return (
    <FlowShell onClose={handleClose}>
      {step === 'checkin' && (
        <div className={styles.step}>
          <h2 className={styles.title}>Осознанный приём пищи</h2>
          <p className={styles.question}>Что вы сейчас чувствуете?</p>
          <div className={styles.emojiRow}>
            {EMOJIS.map((emoji, i) => (
              <button
                key={emoji}
                type="button"
                className={`${styles.emojiBtn} ${selectedEmoji === i ? styles.emojiActive : ''}`}
                onClick={() => setSelectedEmoji(i)}
              >
                {emoji}
              </button>
            ))}
          </div>
          <p className={styles.question}>Голод</p>
          <input
            type="range"
            min={1}
            max={10}
            value={hunger}
            onChange={(e) => setHunger(Number(e.target.value))}
            className={styles.slider}
          />
          <div className={styles.scaleLabels}>
            <span>Голод</span>
            <span>{hunger}/10</span>
            <span>Сытость</span>
          </div>
          <button type="button" className={styles.primaryBtn} onClick={handleStartExercise}>
            Начать упражнение
          </button>
        </div>
      )}

      {step === 'exercise' && (
        <div className={styles.step}>
          <h2 className={styles.title}>Осознанный укус</h2>
          <div className={styles.timerCircle}>
            <svg viewBox="0 0 100 100" className={styles.timerSvg}>
              <circle cx="50" cy="50" r="45" className={styles.timerBg} />
              <circle
                cx="50"
                cy="50"
                r="45"
                className={styles.timerProgress}
                strokeDasharray={`${timerProgress * 2.83} 283`}
              />
            </svg>
            <span className={styles.timerText}>{timer > 0 ? timer : '✓'}</span>
          </div>
          <p className={styles.instruction}>
            Возьмите один кусочек. Жуйте 30 секунд, не глотая. Замечайте текстуру и вкус.
          </p>
          <button
            type="button"
            className={styles.primaryBtn}
            onClick={handleFinishExercise}
            disabled={timer > 30}
          >
            {timer > 30 ? `Подождите ${timer - 30} сек...` : 'Завершить'}
          </button>
        </div>
      )}

      {step === 'reflection' && (
        <div className={styles.step}>
          <h2 className={styles.title}>Рефлексия</h2>
          <p className={styles.question}>Стало ли вам спокойнее?</p>
          <div className={styles.pills}>
            {['Да', 'Нет', 'Так же'].map((label) => (
              <button
                key={label}
                type="button"
                className={styles.pill}
                onClick={() => handleReflection(label)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'done' && (
        <div className={styles.step}>
          <span className={styles.doneEmoji}>✨</span>
          <h2 className={styles.title}>Сектор «Еда» зажёгся</h2>
          {reflection === 'Да' && (
            <div className={styles.bridgeHint}>
              Хотите записать мысль? → Перейдите в «Мысли»
            </div>
          )}
          <button type="button" className={styles.primaryBtn} onClick={handleDone}>
            Отлично
          </button>
        </div>
      )}
    </FlowShell>
  );
});
