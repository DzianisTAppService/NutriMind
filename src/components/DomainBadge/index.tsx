import { memo, useMemo } from 'react';
import type { Domain } from '../../types';
import styles from './styles.module.scss';

interface DomainBadgeProps {
  domain: Domain;
}

const DOMAIN_CLASS: Record<Domain, string> = {
  food: styles.food,
  sport: styles.sport,
  thoughts: styles.thoughts,
};

const DOMAIN_LABEL: Record<Domain, string> = {
  food: 'Еда',
  sport: 'Спорт',
  thoughts: 'Мысли',
};

export const DomainBadge = memo(function DomainBadge({ domain }: DomainBadgeProps) {
  const className = useMemo(
    () => `${styles.badge} ${DOMAIN_CLASS[domain]}`,
    [domain],
  );

  return <span className={className}>{DOMAIN_LABEL[domain]}</span>;
});
