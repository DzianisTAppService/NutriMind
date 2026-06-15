import { memo, useMemo } from 'react';
import type { Domain, TimelineEntry } from '../../types';
import styles from './styles.module.scss';

interface TimelineEventProps {
  entry: TimelineEntry;
}

const DOMAIN_ICON: Record<Domain | 'bridge', string> = {
  food: '🍽',
  sport: '🏃',
  thoughts: '💭',
  bridge: '🔗',
};

export const TimelineEvent = memo(function TimelineEvent({
  entry,
}: TimelineEventProps) {
  const icon = useMemo(() => DOMAIN_ICON[entry.domain], [entry.domain]);

  return (
    <div className={styles.event}>
      <span className={styles.time}>{entry.time}</span>
      <span className={styles.icon}>{icon}</span>
      <p className={styles.text}>{entry.text}</p>
    </div>
  );
});
