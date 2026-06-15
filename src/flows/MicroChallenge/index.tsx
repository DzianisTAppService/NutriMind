import { memo, useCallback, useMemo, useState } from 'react';
import { FlowShell } from '../../components/FlowShell';
import { MICRO_CHALLENGES } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import styles from './styles.module.scss';

export const MicroChallengeFlow = memo(function MicroChallengeFlow() {
  const { setActiveFlow, updateSector, addTimelineEntry } = useApp();
  const [done, setDone] = useState(false);

  const challenge = useMemo(
    () => MICRO_CHALLENGES[Math.floor(Math.random() * MICRO_CHALLENGES.length)],
    [],
  );

  const handleClose = useCallback(() => setActiveFlow(null), [setActiveFlow]);

  const handleComplete = useCallback(() => {
    updateSector(challenge.domain, 10);
    addTimelineEntry(challenge.domain, `Микро-вызов: ${challenge.text.slice(0, 40)}...`);
    setDone(true);
  }, [updateSector, addTimelineEntry, challenge]);

  const handleFinish = useCallback(() => setActiveFlow(null), [setActiveFlow]);

  return (
    <FlowShell onClose={handleClose}>
      {!done ? (
        <div className={styles.step}>
          <span className={styles.badge}>3 минуты</span>
          <h2 className={styles.title}>Микро-вызов</h2>
          <p className={styles.challengeText}>{challenge.text}</p>
          <button type="button" className={styles.primaryBtn} onClick={handleComplete}>
            Сделано!
          </button>
        </div>
      ) : (
        <div className={styles.step}>
          <span className={styles.doneEmoji}>✨</span>
          <h2 className={styles.title}>Молодец!</h2>
          <p className={styles.subtitle}>Сектор обновлён</p>
          <button type="button" className={styles.primaryBtn} onClick={handleFinish}>
            Закрыть
          </button>
        </div>
      )}
    </FlowShell>
  );
});
