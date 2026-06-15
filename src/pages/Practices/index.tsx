import { memo, useCallback, useMemo, useState } from 'react';
import { PracticeCard } from '../../components/PracticeCard';
import { PRACTICES } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import type { Domain } from '../../types';
import styles from './styles.module.scss';

type Filter = 'all' | Domain;

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'food', label: 'Еда' },
  { key: 'sport', label: 'Спорт' },
  { key: 'thoughts', label: 'Мысли' },
];

const PRACTICE_FLOW_MAP: Record<string, 'food' | 'sport' | 'thoughts'> = {
  'food-1': 'food',
  'food-2': 'food',
  'food-3': 'food',
  'food-4': 'food',
  'food-5': 'food',
  'sport-1': 'sport',
  'sport-2': 'sport',
  'sport-3': 'sport',
  'sport-5': 'sport',
  'thoughts-1': 'thoughts',
  'thoughts-2': 'thoughts',
  'thoughts-3': 'thoughts',
  'thoughts-4': 'thoughts',
};

export const PracticesPage = memo(function PracticesPage() {
  const { setActiveFlow } = useApp();
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(
    () =>
      filter === 'all'
        ? PRACTICES
        : PRACTICES.filter((p) => p.domain === filter),
    [filter],
  );

  const handleFilter = useCallback(
    (key: Filter) => () => setFilter(key),
    [],
  );

  const handleStart = useCallback(
    (id: string) => {
      const flow = PRACTICE_FLOW_MAP[id];
      if (flow) setActiveFlow(flow);
    },
    [setActiveFlow],
  );

  return (
    <div className={styles.page}>
      <h1 className="pageTitle">Практики</h1>
      <p className="pageSubtitle">Микро-упражнения для трёх осей</p>

      <div className={styles.filters}>
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            className={`${styles.chip} ${filter === key ? styles.chipActive : ''} ${key !== 'all' ? styles[key] : ''}`}
            onClick={handleFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={styles.list}>
        {filtered.map((practice) => (
          <PracticeCard
            key={practice.id}
            practice={practice}
            onStart={handleStart}
          />
        ))}
      </div>
    </div>
  );
});
