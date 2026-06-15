import { memo, useCallback, useState } from 'react';
import { Zap } from 'lucide-react';
import { FlowShell } from '../../components/FlowShell';
import { useApp } from '../../context/AppContext';
import styles from './styles.module.scss';

type Step = 'intro' | 'squat' | 'checkin' | 'done';

const MOODS = ['😫', '😐', '😊', '⚡'];

export const SportPracticeFlow = memo(function SportPracticeFlow() {
  const { setActiveFlow, updateSector, addTimelineEntry } = useApp();
  const [step, setStep] = useState<Step>('intro');
  const [squatCount, setSquatCount] = useState(0);
  const [mood, setMood] = useState(2);
  const [energy, setEnergy] = useState(5);

  const handleClose = useCallback(() => setActiveFlow(null), [setActiveFlow]);

  const handleAgree = useCallback(() => {
    setSquatCount(1);
    setStep('squat');
  }, []);

  const handleContinue = useCallback(() => {
    setSquatCount((c) => {
      const next = c + 1;
      if (next >= 8) setStep('checkin');
      return next;
    });
  }, []);

  const handleStop = useCallback(() => setStep('checkin'), []);

  const handleFinish = useCallback(() => {
    updateSector('sport', 20);
    addTimelineEntry('sport', `${squatCount} приседаний → +2 к энергии`);
    setStep('done');
  }, [updateSector, addTimelineEntry, squatCount]);

  const handleDone = useCallback(() => setActiveFlow(null), [setActiveFlow]);

  return (
    <FlowShell onClose={handleClose}>
      {step === 'intro' && (
        <div className={styles.step}>
          <h2 className={styles.title}>Договор с ленью</h2>
          <p className={styles.text}>
            Не хочется? Нормально. Договоримся: сделайте 1 приседание и можете
            остановиться.
          </p>
          <button type="button" className={styles.primaryBtn} onClick={handleAgree}>
            Ок, 1 приседание
          </button>
        </div>
      )}

      {step === 'squat' && (
        <div className={styles.step}>
          <div className={styles.squatCounter}>{squatCount}</div>
          <p className={styles.text}>
            {squatCount === 1
              ? 'Можете остановиться или продолжить'
              : 'Отлично! Ещё одно или остановиться?'}
          </p>
          <div className={styles.btnRow}>
            <button type="button" className={styles.secondaryBtn} onClick={handleStop}>
              Хватит
            </button>
            <button type="button" className={styles.primaryBtn} onClick={handleContinue}>
              Ещё одно
            </button>
          </div>
        </div>
      )}

      {step === 'checkin' && (
        <div className={styles.step}>
          <h2 className={styles.title}>После тренировки</h2>
          <p className={styles.question}>Настроение</p>
          <div className={styles.moodRow}>
            {MOODS.map((emoji, i) => (
              <button
                key={emoji}
                type="button"
                className={`${styles.moodBtn} ${mood === i ? styles.moodActive : ''}`}
                onClick={() => setMood(i)}
              >
                {emoji}
              </button>
            ))}
          </div>
          <p className={styles.question}>Энергия</p>
          <input
            type="range"
            min={1}
            max={10}
            value={energy}
            onChange={(e) => setEnergy(Number(e.target.value))}
            className={styles.slider}
          />
          <span className={styles.energyValue}>{energy}/10</span>
          <button type="button" className={styles.primaryBtn} onClick={handleFinish}>
            Записать
          </button>
        </div>
      )}

      {step === 'done' && (
        <div className={styles.step}>
          <div className={styles.resultCard}>
            <Zap size={24} />
            <span>Спорт +2 к настроению</span>
          </div>
          <p className={styles.text}>
            Вы сделали {squatCount} приседаний. Сектор «Спорт» зажёгся ✨
          </p>
          <button type="button" className={styles.primaryBtn} onClick={handleDone}>
            Отлично
          </button>
        </div>
      )}
    </FlowShell>
  );
});
