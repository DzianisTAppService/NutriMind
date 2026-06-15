import { memo, useCallback } from 'react';
import { Lock } from 'lucide-react';
import type { Practice } from '../../types';
import { DomainBadge } from '../DomainBadge';
import styles from './styles.module.scss';

interface PracticeCardProps {
  practice: Practice;
  onStart: (id: string) => void;
}

export const PracticeCard = memo(function PracticeCard({
  practice,
  onStart,
}: PracticeCardProps) {
  const handleClick = useCallback(
    () => {
      if (!practice.isPro) onStart(practice.id);
    },
    [practice.id, practice.isPro, onStart],
  );

  return (
    <button
      type="button"
      className={`${styles.card} ${styles[practice.domain]} ${practice.isPro ? styles.locked : ''}`}
      onClick={handleClick}
      disabled={practice.isPro}
    >
      <div className={styles.header}>
        <DomainBadge domain={practice.domain} />
        <span className={styles.duration}>{practice.duration}</span>
      </div>
      <h3 className={styles.title}>{practice.title}</h3>
      <p className={styles.description}>{practice.description}</p>
      {practice.isPro && (
        <div className={styles.proBadge}>
          <Lock size={12} />
          <span>PRO</span>
        </div>
      )}
    </button>
  );
});
