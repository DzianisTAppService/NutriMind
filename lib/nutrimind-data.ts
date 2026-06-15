export type AxisId = "food" | "sport" | "thought"

export type Axis = {
  id: AxisId
  name: string
  tagline: string
  color: string // css var token name
}

export const AXES: Record<AxisId, Axis> = {
  food: {
    id: "food",
    name: "Food",
    tagline: "Notice taste, not calories",
    color: "food",
  },
  sport: {
    id: "sport",
    name: "Movement",
    tagline: "One squat counts",
    color: "sport",
  },
  thought: {
    id: "thought",
    name: "Thoughts",
    tagline: "Be kinder to your brain",
    color: "thought",
  },
}

export const AXIS_ORDER: AxisId[] = ["thought", "food", "sport"]

export type Practice = {
  id: string
  axis: AxisId
  title: string
  description: string
  minutes: number
  kind: string
}

export const PRACTICES: Practice[] = [
  {
    id: "taste-diary",
    axis: "food",
    title: "Taste diary",
    description: "Describe your last bite by texture, temperature and aroma — never numbers.",
    minutes: 3,
    kind: "Mindful eating",
  },
  {
    id: "hunger-scale",
    axis: "food",
    title: "Hunger check-in",
    description: "Where are you on the 1–10 hunger scale right now, before you decide to eat?",
    minutes: 1,
    kind: "Check-in",
  },
  {
    id: "trigger-map",
    axis: "food",
    title: "Trigger curiosity",
    description: "Felt the urge to stress-eat? Get curious about what happened 20 minutes before.",
    minutes: 4,
    kind: "Reflection",
  },
  {
    id: "one-squat",
    axis: "sport",
    title: "Just one squat",
    description: "Do a single squat. Stop right after if you want — that already counts.",
    minutes: 1,
    kind: "Anti-laziness",
  },
  {
    id: "role-warmup",
    axis: "sport",
    title: "Pick your role",
    description: "Move as an explorer, a warrior or a dancer today. Let the mood lead.",
    minutes: 2,
    kind: "Motivation",
  },
  {
    id: "post-mood",
    axis: "sport",
    title: "After-move mood",
    description: "Log how your body and mood feel right after moving — no performance numbers.",
    minutes: 2,
    kind: "Check-in",
  },
  {
    id: "reframe",
    axis: "thought",
    title: "Reframe a thought",
    description: "Catch a harsh thought and fact-check it with three gentle alternatives.",
    minutes: 5,
    kind: "CBT",
  },
  {
    id: "grounding",
    axis: "thought",
    title: "5-4-3-2-1 grounding",
    description: "Name what you can see, touch, hear, smell and taste to come back to now.",
    minutes: 3,
    kind: "Grounding",
  },
  {
    id: "resource-bank",
    axis: "thought",
    title: "Add to resource bank",
    description: "Save a proud or calm moment so your future self can revisit it on a hard day.",
    minutes: 2,
    kind: "Resource",
  },
]

export type Bridge = {
  id: string
  from: AxisId
  to: AxisId
  pattern: string
  insight: string
  suggestion: string
  practiceId: string
}

export const BRIDGES: Bridge[] = [
  {
    id: "guilt-thought",
    from: "food",
    to: "thought",
    pattern: "Guilt after pizza → harsh self-talk ~20 min later",
    insight: "Twice this week, a meal you labeled “bad” was followed by a thought like “I have no willpower.”",
    suggestion: "These two might be linked. Want to try a quick reframe next time it shows up?",
    practiceId: "reframe",
  },
  {
    id: "skip-stress",
    from: "sport",
    to: "food",
    pattern: "Skipped movement → more evening snacking",
    insight: "On days you skip moving, evening snacking tends to rise. No blame — just a pattern worth seeing.",
    suggestion: "A 1-minute movement might soften the evening. One squat is enough.",
    practiceId: "one-squat",
  },
  {
    id: "calm-move",
    from: "thought",
    to: "sport",
    pattern: "Grounding done → easier to start moving",
    insight: "When you ground first, starting a workout feels lighter afterwards.",
    suggestion: "Try grounding before your next session and notice the difference.",
    practiceId: "grounding",
  },
]

export type MentorId = "stoic" | "grandmother" | "neutral"

export type Mentor = {
  id: MentorId
  name: string
  voice: string
  prompt: string
}

export const MENTORS: Record<MentorId, Mentor> = {
  stoic: {
    id: "stoic",
    name: "The Stoic",
    voice: "Calm, steady, focused on what you can control.",
    prompt: "You cannot control the craving. You can control the next small, kind choice.",
  },
  grandmother: {
    id: "grandmother",
    name: "The Grandmother",
    voice: "Warm, patient, a little playful.",
    prompt: "Sweetheart, one bite at a time. You are doing better than you think.",
  },
  neutral: {
    id: "neutral",
    name: "Neutral Guide",
    voice: "Plain, gentle, no pressure.",
    prompt: "Here when you need it. No rush, no scores — just a small step.",
  },
}

// Reframing flow content
export const DISTORTIONS = [
  "All-or-nothing",
  "Overgeneralizing",
  "Catastrophizing",
  "Mind-reading",
  "Labeling",
]

export const REFRAME_ALTERNATIVES = [
  "One choice doesn't define the whole day.",
  "I'm allowed to be a work in progress.",
  "What would I tell a friend who said this?",
]

export const MICRO_CHALLENGES = [
  { axis: "food" as AxisId, text: "Take three slow breaths before your next bite." },
  { axis: "sport" as AxisId, text: "Stretch your arms toward the ceiling for 20 seconds." },
  { axis: "thought" as AxisId, text: "Write down one thing your body did well today." },
  { axis: "food" as AxisId, text: "Name the temperature and texture of your next drink." },
  { axis: "thought" as AxisId, text: "Thank your brain for trying to protect you." },
]
