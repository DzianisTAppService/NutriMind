import { memo, useCallback, useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import type { Domain, MentorType } from '../../types';
import { useApp } from '../../context/AppContext';
import styles from './styles.module.scss';

const PRIORITY_OPTIONS: { domain: Domain; label: string; emoji: string }[] = [
  { domain: 'food', label: 'Еда', emoji: '🍽' },
  { domain: 'sport', label: 'Спорт', emoji: '🏃' },
  { domain: 'thoughts', label: 'Мысли', emoji: '💭' },
];

const MENTOR_OPTIONS: {
  type: MentorType;
  label: string;
  emoji: string;
  description: string;
}[] = [
  {
    type: 'stoic',
    label: 'Стоик в кроссовках',
    emoji: '🏛️',
    description: 'Мотивирует действием',
  },
  {
    type: 'grandma',
    label: 'Добрая бабушка-психолог',
    emoji: '🤗',
    description: 'Утешает и поддерживает',
  },
  {
    type: 'neutral',
    label: 'Нейтральный голос',
    emoji: '🔘',
    description: 'Минимум эмоций',
  },
];

const PROMISES = [
  'Не скажем «просто улыбнись»',
  'Не посчитаем калории',
  'Не заставим бежать марафон',
];

export const Onboarding = memo(function Onboarding() {
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState(0);
  const [priority, setPriority] = useState<Domain>('food');
  const [mentor, setMentor] = useState<MentorType>('stoic');

  const handleNext = useCallback(() => setStep((s) => s + 1), []);

  const handleSelectPriority = useCallback(
    (domain: Domain) => {
      setPriority(domain);
      handleNext();
    },
    [handleNext],
  );

  const handleSelectMentor = useCallback(
    (type: MentorType) => {
      setMentor(type);
      handleNext();
    },
    [handleNext],
  );

  const handleFinish = useCallback(() => {
    completeOnboarding(priority, mentor);
  }, [completeOnboarding, priority, mentor]);

  const dots = useMemo(
    () =>
      [0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={`${styles.dot} ${step === i ? styles.dotActive : ''}`}
        />
      )),
    [step],
  );

  if (step === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.welcomeCircle}>
          <span className={`${styles.vibrateDot} ${styles.dotFood}`} />
          <span className={`${styles.vibrateDot} ${styles.dotSport}`} />
          <span className={`${styles.vibrateDot} ${styles.dotThoughts}`} />
        </div>
        <h1 className={styles.title}>
          Еда, спорт и мысли всегда связаны. Но мы привыкли ругать себя за каждую.
          Давай иначе?
        </h1>
        <button type="button" className={styles.primaryBtn} onClick={handleNext}>
          Начать
        </button>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className={styles.page}>
        <div className={styles.stepIndicator}>{dots}</div>
        <h2 className={styles.question}>Что для вас сейчас тяжелее всего?</h2>
        <div className={styles.options}>
          {PRIORITY_OPTIONS.map(({ domain, label, emoji }) => (
            <button
              key={domain}
              type="button"
              className={`${styles.optionCard} ${styles[domain]}`}
              onClick={() => handleSelectPriority(domain)}
            >
              <span className={styles.optionEmoji}>{emoji}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className={styles.page}>
        <div className={styles.stepIndicator}>{dots}</div>
        <h2 className={styles.question}>Выберите наставника</h2>
        <div className={styles.mentorList}>
          {MENTOR_OPTIONS.map(({ type, label, emoji, description }) => (
            <button
              key={type}
              type="button"
              className={styles.mentorCard}
              onClick={() => handleSelectMentor(type)}
            >
              <span className={styles.mentorEmoji}>{emoji}</span>
              <div>
                <p className={styles.mentorLabel}>{label}</p>
                <p className={styles.mentorDesc}>{description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.stepIndicator}>{dots}</div>
      <h2 className={styles.question}>Наше обещание</h2>
      <ul className={styles.promiseList}>
        {PROMISES.map((text) => (
          <li key={text} className={styles.promiseItem}>
            <Check size={18} className={styles.checkIcon} />
            <span>{text}</span>
          </li>
        ))}
      </ul>
      <button type="button" className={styles.primaryBtn} onClick={handleFinish}>
        Перейти к первому заданию
      </button>
    </div>
  );
});
