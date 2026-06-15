import { memo, useCallback, useMemo } from 'react';
import type { Domain } from '../../types';
import styles from './styles.module.scss';

interface TriangleChartProps {
  sectors: Record<Domain, number>;
  onSectorClick?: (domain: Domain) => void;
  mentorQuote: string;
  mentorEmoji: string;
}

const SECTOR_CONFIG: { domain: Domain; label: string; className: string }[] = [
  { domain: 'food', label: 'Еда', className: styles.sectorFood },
  { domain: 'sport', label: 'Спорт', className: styles.sectorSport },
  { domain: 'thoughts', label: 'Мысли', className: styles.sectorThoughts },
];

export const TriangleChart = memo(function TriangleChart({
  sectors,
  onSectorClick,
  mentorQuote,
  mentorEmoji,
}: TriangleChartProps) {
  const handleClick = useCallback(
    (domain: Domain) => () => onSectorClick?.(domain),
    [onSectorClick],
  );

  const sectorStyles = useMemo(
    () =>
      SECTOR_CONFIG.map(({ domain, className }) => {
        const level = Math.round(sectors[domain] / 10) * 10;
        return {
          domain,
          className,
          levelClass: styles[`level${level}` as keyof typeof styles] ?? styles.level0,
        };
      }),
    [sectors],
  );

  return (
    <div className={styles.wrapper}>
      <svg viewBox="0 0 300 280" className={styles.svg}>
        {sectorStyles.map(({ domain, className, levelClass }) => (
          <g key={domain} onClick={handleClick(domain)} className={styles.sectorGroup}>
            <path
              className={`${styles.sector} ${className} ${levelClass}`}
              d={
                domain === 'food'
                  ? 'M150,20 L280,250 L20,250 Z'
                  : domain === 'sport'
                    ? 'M150,20 L20,250 L150,250 Z'
                    : 'M150,20 L280,250 L150,250 Z'
              }
            />
          </g>
        ))}
        <path
          className={styles.outline}
          d="M150,20 L280,250 L20,250 Z"
          fill="none"
        />
        {SECTOR_CONFIG.map(({ domain, label }) => {
          const positions: Record<Domain, { x: number; y: number }> = {
            food: { x: 150, y: 175 },
            sport: { x: 75, y: 230 },
            thoughts: { x: 225, y: 230 },
          };
          const pos = positions[domain];
          return (
            <text
              key={domain}
              x={pos.x}
              y={pos.y}
              className={styles.label}
              textAnchor="middle"
            >
              {label}
            </text>
          );
        })}
      </svg>
      <div className={styles.center}>
        <span className={styles.mentorEmoji}>{mentorEmoji}</span>
        <p className={styles.quote}>{mentorQuote}</p>
      </div>
    </div>
  );
});
