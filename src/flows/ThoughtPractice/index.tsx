import { memo, useCallback, useMemo, useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import { FlowShell } from '../../components/FlowShell';
import { THOUGHT_ALTERNATIVES } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import styles from './styles.module.scss';

type Step = 'input' | 'analysis' | 'select' | 'done';

export const ThoughtPracticeFlow = memo(function ThoughtPracticeFlow() {
  const { setActiveFlow, updateSector, addTimelineEntry } = useApp();
  const [step, setStep] = useState<Step>('input');
  const [thought, setThought] = useState('');
  const [selectedAlt, setSelectedAlt] = useState<number | null>(null);

  const handleClose = useCallback(() => setActiveFlow(null), [setActiveFlow]);
  const handleSubmit = useCallback(() => {
    if (thought.trim()) setStep('analysis');
  }, [thought]);
  const handleContinue = useCallback(() => setStep('select'), []);

  const handleSelect = useCallback(
    (index: number) => {
      setSelectedAlt(index);
      updateSector('thoughts', 15);
      addTimelineEntry(
        'thoughts',
        `Переформулировала: «${thought.slice(0, 20)}...»`,
      );
      setStep('done');
    },
    [updateSector, addTimelineEntry, thought],
  );

  const handleDone = useCallback(() => setActiveFlow(null), [setActiveFlow]);

  const highlightedWord = useMemo(() => {
    const words = ['провалил', 'слабак', 'ужасна', 'безволная', 'ничего'];
    return words.find((w) => thought.toLowerCase().includes(w));
  }, [thought]);

  return (
    <FlowShell onClose={handleClose}>
      {step === 'input' && (
        <div className={styles.step}>
          <h2 className={styles.title}>Переформулируй</h2>
          <textarea
            className={styles.textarea}
            placeholder="Я провалил собеседование"
            value={thought}
            onChange={(e) => setThought(e.target.value)}
            rows={3}
          />
          <button
            type="button"
            className={styles.primaryBtn}
            onClick={handleSubmit}
            disabled={!thought.trim()}
          >
            Разобрать
          </button>
        </div>
      )}

      {step === 'analysis' && (
        <div className={styles.step}>
          <h2 className={styles.title}>Анализ</h2>
          <p className={styles.thoughtText}>{thought}</p>
          {highlightedWord && (
            <p className={styles.distortion}>
              Обнаружено искажение: «{highlightedWord}» (катастрофизация)
            </p>
          )}
          <p className={styles.question}>Что реально произошло?</p>
          <ul className={styles.factsList}>
            <li>Запишите 1–2 факта без оценок</li>
          </ul>
          <button type="button" className={styles.primaryBtn} onClick={handleContinue}>
            Показать альтернативы
          </button>
        </div>
      )}

      {step === 'select' && (
        <div className={styles.step}>
          <h2 className={styles.title}>Альтернативы</h2>
          <p className={styles.subtitle}>Выберите реалистичную формулировку</p>
          {THOUGHT_ALTERNATIVES.map((alt, i) => (
            <button
              key={alt}
              type="button"
              className={styles.altCard}
              onClick={() => handleSelect(i)}
            >
              {alt}
            </button>
          ))}
        </div>
      )}

      {step === 'done' && selectedAlt !== null && (
        <div className={styles.step}>
          <ThumbsUp size={32} className={styles.thumbIcon} />
          <p className={styles.chosenAlt}>{THOUGHT_ALTERNATIVES[selectedAlt]}</p>
          <div className={styles.pointsBadge}>+10 к «Спасибо мозгу»</div>
          <button type="button" className={styles.primaryBtn} onClick={handleDone}>
            Отлично
          </button>
        </div>
      )}
    </FlowShell>
  );
});
