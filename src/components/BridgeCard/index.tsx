import { memo, useCallback } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import type { Bridge } from '../../types';
import { DomainBadge } from '../DomainBadge';
import styles from './styles.module.scss';

interface BridgeCardProps {
  bridge: Bridge;
  onAction?: (id: string) => void;
}

export const BridgeCard = memo(function BridgeCard({
  bridge,
  onAction,
}: BridgeCardProps) {
  const handleAction = useCallback(
    () => onAction?.(bridge.id),
    [bridge.id, onAction],
  );

  if (bridge.resolved) {
    return (
      <div className={`${styles.card} ${styles.resolved}`}>
        <Check size={16} className={styles.checkIcon} />
        <p className={styles.resolvedText}>
          Разобрали: {bridge.leftText} → {bridge.rightText}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.nodes}>
        <div className={styles.node}>
          <DomainBadge domain={bridge.leftDomain} />
          <p className={styles.nodeText}>{bridge.leftText}</p>
          <span className={styles.time}>{bridge.leftTime}</span>
        </div>
        <ArrowRight size={20} className={styles.arrow} />
        <div className={styles.node}>
          <DomainBadge domain={bridge.rightDomain} />
          <p className={styles.nodeText}>{bridge.rightText}</p>
          <span className={styles.time}>{bridge.rightTime}</span>
        </div>
      </div>
      <button type="button" className={styles.actionBtn} onClick={handleAction}>
        {bridge.action}
      </button>
    </div>
  );
});
