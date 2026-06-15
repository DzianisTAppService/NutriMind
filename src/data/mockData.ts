import type { Bridge, Practice, ResourceMemory, TimelineEntry } from '../types';

export const MENTOR_QUOTES: Record<string, string> = {
  stoic: 'Один шаг — уже победа',
  grandma: 'Ты делаешь достаточно, родная',
  neutral: 'Замечай. Дыши. Продолжай.',
};

export const MENTOR_LABELS: Record<string, string> = {
  stoic: 'Стоик в кроссовках',
  grandma: 'Добрая бабушка-психолог',
  neutral: 'Нейтральный голос',
};

export const DOMAIN_LABELS: Record<string, string> = {
  food: 'Еда',
  sport: 'Спорт',
  thoughts: 'Мысли',
};

export const INITIAL_TIMELINE: TimelineEntry[] = [
  {
    id: '1',
    time: '09:00',
    domain: 'food',
    text: 'Завтрак: голод 8/10, эмоция — тревога',
  },
  {
    id: '2',
    time: '12:30',
    domain: 'bridge',
    text: 'Мост: страх чата → быстрый обед',
  },
  {
    id: '3',
    time: '18:00',
    domain: 'sport',
    text: '1 приседание → +2 к энергии',
  },
  {
    id: '4',
    time: '21:00',
    domain: 'thoughts',
    text: 'Переформулировала: «мало успела» → «4 из 6 задач»',
  },
];

export const PRACTICES: Practice[] = [
  {
    id: 'food-1',
    domain: 'food',
    title: 'Осознанный укус',
    duration: '1 мин',
    isPro: false,
    description: 'Жуйте медленно, замечая текстуру и вкус',
  },
  {
    id: 'food-2',
    domain: 'food',
    title: 'Анализ срыва',
    duration: '3 мин',
    isPro: false,
    description: 'Разберите триггер без самообвинения',
  },
  {
    id: 'food-3',
    domain: 'food',
    title: 'Дневник вкусов',
    duration: '2 мин',
    isPro: false,
    description: 'Запишите ощущения: хруст, температура, аромат',
  },
  {
    id: 'food-4',
    domain: 'food',
    title: 'Анти-диета',
    duration: '3 мин',
    isPro: false,
    description: 'Добавьте один цветной овощ или ешьте десерт медленно',
  },
  {
    id: 'food-5',
    domain: 'food',
    title: 'Осознанный приём пищи',
    duration: '5 мин',
    isPro: false,
    description: 'Оцените голод и эмоцию до и после еды',
  },
  {
    id: 'food-6',
    domain: 'food',
    title: 'Глубокий разбор триггеров',
    duration: '10 мин',
    isPro: true,
    description: 'Расширенный анализ паттернов переедания',
  },
  {
    id: 'sport-1',
    domain: 'sport',
    title: 'Договор с ленью',
    duration: '2 мин',
    isPro: false,
    description: '1 приседание — и можете остановиться',
  },
  {
    id: 'sport-2',
    domain: 'sport',
    title: 'После тренировки',
    duration: '2 мин',
    isPro: false,
    description: 'Оцените настроение и энергию, не калории',
  },
  {
    id: 'sport-3',
    domain: 'sport',
    title: 'Спорт без страха',
    duration: '3 мин',
    isPro: false,
    description: 'Аудио-настройка перед стартом',
  },
  {
    id: 'sport-4',
    domain: 'sport',
    title: 'Мотив сценарист',
    duration: '5 мин',
    isPro: true,
    description: 'Выберите роль: исследователь, воин, танцор',
  },
  {
    id: 'sport-5',
    domain: 'sport',
    title: '5 приседаний с благодарностью',
    duration: '3 мин',
    isPro: false,
    description: 'Думайте о том, как приятно спине',
  },
  {
    id: 'thoughts-1',
    domain: 'thoughts',
    title: 'Переформулируй',
    duration: '3 мин',
    isPro: false,
    description: 'Найдите факты и 3 реалистичные альтернативы',
  },
  {
    id: 'thoughts-2',
    domain: 'thoughts',
    title: 'Лови момент',
    duration: '1 мин',
    isPro: false,
    description: '10 секунд заземления: что видите, слышите, чувствуете',
  },
  {
    id: 'thoughts-3',
    domain: 'thoughts',
    title: 'Банк ресурсов',
    duration: '2 мин',
    isPro: false,
    description: 'Запишите момент гордости или спокойствия',
  },
  {
    id: 'thoughts-4',
    domain: 'thoughts',
    title: 'Спасибо мозгу',
    duration: '5 мин',
    isPro: false,
    description: 'Спорьте с вредными установками и получайте баллы',
  },
  {
    id: 'thoughts-5',
    domain: 'thoughts',
    title: 'Глубокое переформулирование',
    duration: '10 мин',
    isPro: true,
    description: 'Расширенная работа с когнитивными искажениями',
  },
];

export const BRIDGES: Bridge[] = [
  {
    id: 'b1',
    leftDomain: 'food',
    leftText: 'Пицца + чувство вины',
    leftTime: '14:20',
    rightDomain: 'thoughts',
    rightText: '«Я слабак»',
    rightTime: '14:40',
    action: 'Сыграем в переформулирование?',
    resolved: false,
  },
  {
    id: 'b2',
    leftDomain: 'sport',
    leftText: 'Пропустила тренировку 3 дня',
    leftTime: 'вчера',
    rightDomain: 'thoughts',
    rightText: '«Я безволная»',
    rightTime: 'сегодня',
    action: '1 минута на переформулирование?',
    resolved: false,
  },
  {
    id: 'b3',
    leftDomain: 'food',
    leftText: 'Страх чата → быстрый обед',
    leftTime: '12:30',
    rightDomain: 'thoughts',
    rightText: 'Разобрали паттерн',
    rightTime: '12:45',
    action: 'Завершено',
    resolved: true,
  },
];

export const RESOURCES: ResourceMemory[] = [
  {
    id: 'r1',
    text: 'Спасла кота на улице — почувствовала силу',
    tag: '#гордость',
  },
  {
    id: 'r2',
    text: 'Коллега похвалил презентацию',
    tag: '#похвалили',
  },
  {
    id: 'r3',
    text: 'Утренний кофе на балконе в тишине',
    tag: '#спокойствие',
  },
  {
    id: 'r4',
    text: 'Закончила сложный проект в срок',
    tag: '#гордость',
  },
];

export const MICRO_CHALLENGES = [
  {
    domain: 'food' as const,
    text: 'Пожуйте изюм, как будто видите его впервые',
  },
  {
    domain: 'sport' as const,
    text: 'Сделайте 5 приседаний, думая о том, как приятно спине',
  },
  {
    domain: 'thoughts' as const,
    text: 'Напишите 1 факт: что сегодня было не ужасно',
  },
];

export const THOUGHT_ALTERNATIVES = [
  'Я получил опыт и узнал слабые места',
  'В 2 вопросах был неточен, в остальном — хорош',
  'Это один эпизод, не приговор',
];

export const EMOJIS = ['😐', '😟', '😰', '😊', '😢', '🥱'];
