import { memo, useCallback, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { TriangleChart } from '../../components/TriangleChart';
import { TimelineEvent } from '../../components/TimelineEvent';
import { useApp } from '../../context/AppContext';
import { MENTOR_QUOTES } from '../../data/mockData';
import type { Domain } from '../../types';
import styles from './styles.module.scss';

const MENTOR_EMOJI: Record<string, string> = {
  stoic: '🏛️',
  grandma: '🤗',
  neutral: '🔘',
};

const FLOW_MAP: Record<Domain, 'food' | 'sport' | 'thoughts'> = {
  food: 'food',
  sport: 'sport',
  thoughts: 'thoughts',
};

export const TodayPage = memo(function TodayPage() {
  const { sectors, timeline, mentor, setActiveFlow, addTimelineEntry, updateSector } =
    useApp();

  const mentorQuote = useMemo(() => MENTOR_QUOTES[mentor], [mentor]);
  const mentorEmoji = useMemo(() => MENTOR_EMOJI[mentor], [mentor]);

  const todayLabel = useMemo(() => {
    const date = new Date();
    const formatted = date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
    });
    return `Сегодня, ${formatted}`;
  }, []);

  const handleSectorClick = useCallback(
    (domain: Domain) => {
      setActiveFlow(FLOW_MAP[domain]);
    },
    [setActiveFlow],
  );

  const handleMicroChallenge = useCallback(() => {
    setActiveFlow('micro');
  }, [setActiveFlow]);

  const handleFirstTask = useCallback(() => {
    updateSector('thoughts', 10);
    addTimelineEntry('thoughts', 'Первое слово о своём состоянии');
  }, [updateSector, addTimelineEntry]);

  const showFirstTask = useMemo(
    () => sectors.food === 60 && sectors.sport === 30 && sectors.thoughts === 80,
    [sectors],
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.date}>{todayLabel}</h1>
        <span className={styles.streak}>🔥 7 дней</span>
      </header>

      <TriangleChart
        sectors={sectors}
        onSectorClick={handleSectorClick}
        mentorQuote={mentorQuote}
        mentorEmoji={mentorEmoji}
      />

      <button
        type="button"
        className={styles.microBtn}
        onClick={handleMicroChallenge}
      >
        <Sparkles size={18} />
        Что сделаем за 3 минуты?
      </button>

      {showFirstTask && (
        <div className={styles.firstTask}>
          <p>Сделайте 3 вдоха и напишите 1 слово о своём состоянии</p>
          <button type="button" onClick={handleFirstTask}>
            Готово
          </button>
        </div>
      )}

      <section className={styles.timeline}>
        <h2 className={styles.sectionTitle}>Лента дня</h2>
        {timeline.map((entry) => (
          <TimelineEvent key={entry.id} entry={entry} />
        ))}
      </section>
    </div>
  );
});
