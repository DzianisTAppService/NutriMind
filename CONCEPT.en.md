# NutriMind — Application Aim

**Name:** NutriMind  
**Also known as:** «Three Axes» / Eudaemon (from Greek *eudaimonia* — flourishing, well-being)

## What it is

NutriMind is a wellness app that connects three everyday domains — **food**, **sport**, and **thoughts** — into one mindful practice. Instead of tracking calories, workout minutes, or forcing positivity, it helps users notice how these areas influence each other and respond with small, psychologically grounded actions.

The core idea: **work on one axis, and the other two follow naturally.**

## Problem it addresses

Many people struggle with:

- mild disordered eating (stress eating, guilt after “bad” food)
- avoiding exercise because of shame or perfectionism
- anxious self-talk and cognitive distortions (“I’m worthless”, “I always fail”)

Traditional fitness and diet apps often make this worse with counters, streaks, and guilt-driven UX. NutriMind takes the opposite path.

## What makes it different

| Typical apps | NutriMind |
|---|---|
| Calorie & step counters | Hunger/emotion scales, mood & energy check-ins |
| “Just push harder” | “Deal with laziness” — 1 squat and stop if you want |
| Toxic positivity | Realistic reframing based on CBT principles |
| Siloed features | **Bridges** — links between food, sport, and thought entries |
| Judgment on failure | Curiosity about triggers, not self-blame |

## Three axes

### 1. Food psychology
Mindful eating, binge trigger analysis, anti-diet micro-suggestions, and a taste diary focused on sensation (texture, temperature, aroma) — not calories.

### 2. Sport psychology
Role-based motivation (“explorer”, “warrior”, “dancer”), minimal-commitment workouts, post-session mood tracking, and short audio prep sessions before starting.

### 3. Positive thinking psychology
Thought reframing with fact-checking, grounding exercises, a personal **resource bank** of proud/calm moments, and a “thank your brain” game where you challenge harmful beliefs.

## Core mechanics

- **Triangle of the Day** — three sectors (food / sport / thoughts) fill up as the user completes micro-actions. The goal is mindful engagement, not perfection.
- **Bridges** — the app surfaces patterns (e.g. guilt after pizza → negative thoughts 20 minutes later) and suggests a relevant exercise.
- **Mentor avatar** — a gentle guide (stoic, warm grandmother-psychologist, or neutral voice) with short daily prompts.
- **Micro-challenges** — random 3-minute tasks across all three domains.

## Who it’s for

People with mild eating-related stress, exercise avoidance rooted in shame, and anxious perfectionism who want to **teach their brain to be kinder** — without diets, marathons, or “just smile” advice.

## Mobile-first

NutriMind is designed **primarily as a mobile app** (iOS / Android). Most use cases are short and in-the-moment: before a meal, after a workout, during anxiety, via a push reminder. The phone is always at hand — desktop is secondary.

### UX principles

- **Short sessions** — 30 seconds to 3 minutes; everything fits on one screen or in a bottom sheet
- **One-handed navigation** — bottom tab bar, large tap targets, gestures instead of hover
- **Bottom sheets for practices** — flows open from the bottom without leaving the main screen
- **Push as part of the product** — reminders at the right moment, not “visit the site sometime”
- **Voice input** — natural way to quickly log a thought or state on the go
- **Offline journal** — entries available without network; sync optional

### What this means for the prototype

The current repo is a **mobile-first web prototype** (max width ~430px, bottom navigation, safe-area). It serves as a UX and screen reference for a future native app, not a desktop version of the product.

## Prototype scope (current)

This repository contains a **clickable mobile-first web prototype** with mock data:

- Onboarding
- Main screen with interactive triangle
- Practice library, bridges, and profile
- Interactive flows for food, sport, thoughts, and micro-challenges

No backend, AI, or push notifications yet — those are planned for later phases.

## Where AI helps

Principle: add AI only where it delivers real value, not “because it’s trendy.” The triangle, sector fill, basic practices, and check-ins are deterministic logic without AI.

### Use cases

1. **Thought reframing (CBT) — the biggest win.** Three fixed alternatives get boring fast. An LLM recognizes cognitive distortions in free text, generates personal alternatives for a specific situation, and asks Socratic questions instead of handing over a ready-made answer.
2. **Bridges: phrasing.** An LLM turns a dry fact (`food.guilt=true, thought.negative=true`) into a soft, non-blaming phrase in the chosen mentor’s voice.
3. **Bridges: pattern detection.** At start — rules and correlation by timestamps and emotion tags. ML is needed for non-trivial patterns (“before deadlines you skip sport and stress-eat”).
4. **Adaptive notification timing.** Classic ML on time series: predict the best moment for a gentle push based on user behavior. Strong impact on retention.
5. **Mentor tone.** An LLM rewrites the same advice for stoic / grandmother / neutral voice — manually that’s 3× the content.
6. **Voice → structure.** Speech-to-text + entity extraction (food, emotion, intensity) → auto journal entry and exercise suggestion. Post-MVP.
7. **Resource bank: smart selection.** Semantic search via embeddings: on a bad day, surface a relevant entry, not a random one.
8. **Soft analytics.** Once a week — summarize entries (“you stress-eat more on weekday evenings”). Careful not to slide back into counters.

### Summary: what to use where

| Area | AI type | Priority |
|---|---|---|
| Thought reframing | LLM | high |
| Bridges: phrasing | LLM | high |
| Bridges: pattern detection | rules → ML | medium |
| Push timing | classic ML | medium |
| Mentor tone | LLM | medium |
| Voice → journal | STT + LLM parsing | low (post-MVP) |
| Resource bank selection | embeddings/search | low |

### Architectural forks

- **On-device vs cloud.** Privacy favors on-device AI, but quality reframing locally is still weak. Compromise: distortion detection on-device, alternative generation in the cloud with anonymization. Directly conflicts with the privacy promise — a choice is required.
- **Boundary of responsibility.** The model must not “treat.” Strict system prompt, screening for “red flags” (suicide, self-harm), and escalation to live help.

### Recommended rollout order

For MVP — **no AI at all**, but design reframing and bridges so fixed logic can be swapped for an LLM behind a feature flag. Enable AI in reframing first — the gap between “template” and “personal” is most visible there.

## Open questions

Questions that don’t have a final answer yet and need discussion:

### Product and user behavior

1. **When should the user interact with the app?**
   - On a schedule (morning / lunch / evening)?
   - By event (before eating, after a workout, in a moment of anxiety)?
   - Via push notification with smart timing?
   - Only when they open it themselves — no reminders?
   - Is the app proactive (nudges at the right moment) or reactive (user opens it)? This drives the whole notification and retention model.
2. **What is the minimum unit of value per session?** What does someone get in 30 seconds that makes them come back tomorrow? Is “sector lit up” enough reward, or do they need visible progress/insight?
3. **What does “success” look like after 30 days?** Less anxiety? Stress-eating less often? How does the user notice that inside the app, and how do we measure it without scales or calories?
4. **Mindfulness vs gamification tension.** Streaks, “thank your brain” points, filling the triangle — are these the same counters we’re avoiding? Do we create new guilt (“didn’t light a sector for 3 days”)? Where’s the line?

### Core mechanic: “Bridges”

5. **How are connections detected technically?** In the prototype they’re hardcoded. Real bridges — rules (if guilt after food → suggest a thought exercise) or ML? For MVP, probably rules — need an explicit pattern list.
6. **Risk of false connections.** “Ate pizza → 20 minutes later ‘I’m weak’” may be coincidence. A false bridge can increase anxiety. Should the user be able to dismiss/hide a bridge?

### Content and psychology

7. **Who authors practice and reframing content?** CBT material requires expertise. Psychologist on the team / consultant / licensed source? Quality and legal implications.
8. **Where is the “not a medical app” line?** Audience includes people with ED and anxiety. Do we need a disclaimer, screening for severe conditions, escalation to a hotline/specialist on “red flags”?
9. **How personalized is content?** Same thought alternatives for everyone or adapted? Three fixed options get stale quickly.

### MVP scope

10. **What actually ships in v1?** The concept lists 40+ practices, voice, push. Proposed MVP: triangle + 3 practices per axis + journal. Which features get cut first?
