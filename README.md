# NutriMind

Mobile-first кликабельный прототип приложения для благополучия, которое объединяет три сферы — **еду**, **спорт** и **мысли** — в одну осознанную практику. Без подсчёта калорий, таймеров и навязанного позитива.

Подробное описание идеи, механик и открытых вопросов — в [`CONCEPT.md`](./CONCEPT.md) (RU) и [`CONCEPT.en.md`](./CONCEPT.en.md) (EN).

> UI прототипа на английском (экспорт из v0.dev).

## Стек

- Next.js 16 (App Router, RSC) + TypeScript
- React 19
- Tailwind CSS v4
- shadcn / base-ui компоненты
- lucide-react (иконки)

Данные мок-овые (`lib/nutrimind-data.ts`), бэкенда нет — это фронтенд-прототип.

## Запуск

```bash
pnpm install
pnpm dev
```

Откроется на http://localhost:3000/

## Сборка

```bash
pnpm build
pnpm start
```

## Что внутри

- **Onboarding** — выбор наставника (Stoic / Grandmother / Neutral)
- **Home** — интерактивный «Triangle of the Day» с тремя осями
- **Practices** — библиотека микро-практик по осям
- **Bridges** — связи между едой, спортом и мыслями
- **Profile** — прогресс и смена наставника
- **Flow Sheet** — интерактивные сценарии практик (bottom sheet)

## Структура

```
app/
  layout.tsx        корневой layout, шрифты, метаданные
  page.tsx          точка входа → <NutriMindApp />
  globals.css       Tailwind v4 + дизайн-токены
components/
  nutrimind-app.tsx корневой стейт и роутинг экранов
  onboarding.tsx    онбординг
  home-screen.tsx   главный экран
  practices-screen.tsx
  bridges-screen.tsx
  profile-screen.tsx
  triangle-of-day.tsx
  bottom-nav.tsx    нижняя навигация
  flow-sheet.tsx    bottom sheet со сценариями практик
  ui/               примитивы (button и т.д.)
lib/
  nutrimind-data.ts мок-данные (оси, практики, мосты, наставники)
  utils.ts          cn() и хелперы
public/             иконки и плейсхолдеры
```
