import { memo, useMemo } from 'react';
import { MENTOR_LABELS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import styles from './styles.module.scss';

const MENTOR_EMOJI: Record<string, string> = {
  stoic: '🏛️',
  grandma: '🤗',
  neutral: '🔘',
};

export const ProfilePage = memo(function ProfilePage() {
  const { mentor, resources } = useApp();

  const mentorLabel = useMemo(() => MENTOR_LABELS[mentor], [mentor]);
  const mentorEmoji = useMemo(() => MENTOR_EMOJI[mentor], [mentor]);

  const stats = useMemo(
    () => [
      { value: '7', label: 'дней подряд' },
      { value: '23', label: 'практики' },
      { value: '12', label: 'мостов разобрано' },
    ],
    [],
  );

  return (
    <div className={styles.page}>
      <div className={styles.profileHeader}>
        <div className={styles.avatar}>А</div>
        <div>
          <h1 className={styles.name}>Анна</h1>
          <p className={styles.mentor}>
            {mentorEmoji} {mentorLabel}
          </p>
        </div>
      </div>

      <div className={styles.stats}>
        {stats.map(({ value, label }) => (
          <div key={label} className={styles.stat}>
            <span className={styles.statValue}>{value}</span>
            <span className={styles.statLabel}>{label}</span>
          </div>
        ))}
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Банк ресурсов</h2>
          <span className={styles.counter}>
            {resources.length} / 30 записей
          </span>
        </div>
        <div className={styles.resourceScroll}>
          {resources.map((r) => (
            <div key={r.id} className={styles.resourceCard}>
              <span className={styles.resourceTag}>{r.tag}</span>
              <p className={styles.resourceText}>{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Настройки</h2>
        <ul className={styles.settingsList}>
          <li>Уведомления (макс. 3/день)</li>
          <li>Наставник</li>
          <li>Экспорт дневника</li>
          <li>О приложении</li>
        </ul>
      </section>

      <div className={styles.proBanner}>
        <p className={styles.proTitle}>
          7 дней с NutriMind — попробуйте Pro бесплатно
        </p>
        <p className={styles.proDesc}>
          40+ практик, безлимитный Банк, голосовой ввод
        </p>
        <button type="button" className={styles.proBtn}>
          Узнать больше
        </button>
      </div>
    </div>
  );
});
