"use client"

import { Heart, Shield, Bell } from "lucide-react"
import { AXES, AXIS_ORDER, MENTORS, type AxisId, type MentorId } from "@/lib/nutrimind-data"
import { cn } from "@/lib/utils"

type Props = {
  progress: Record<AxisId, number>
  mentor: MentorId
  onChangeMentor: (m: MentorId) => void
}

const RESOURCE_BANK = [
  "Finished a walk even though I dreaded it.",
  "Ate slowly and actually tasted dinner.",
  "Caught the thought “I'm a failure” and let it pass.",
]

export function ProfileScreen({ progress, mentor, onChangeMentor }: Props) {
  return (
    <div className="px-6 pb-28 pt-8">
      <header className="mb-6 flex items-center gap-4">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary/15 font-serif text-xl text-primary">
          A
        </div>
        <div>
          <h1 className="font-serif text-2xl leading-tight text-foreground">Hello, friend</h1>
          <p className="text-sm text-muted-foreground">Day 6 of a gentler practice</p>
        </div>
      </header>

      <section className="mb-6 rounded-3xl border border-border bg-card p-5">
        <h2 className="mb-4 font-serif text-lg text-foreground">Where your attention went</h2>
        <div className="grid gap-3">
          {AXIS_ORDER.map((id) => (
            <div key={id}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-foreground">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: `var(--color-${AXES[id].color})` }} />
                  {AXES[id].name}
                </span>
                <span className="tabular-nums text-muted-foreground">{progress[id]}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full transition-[width] duration-700"
                  style={{ width: `${progress[id]}%`, backgroundColor: `var(--color-${AXES[id].color})` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground text-pretty">
          A reflection of attention, not a score. Low is not failure — it&apos;s information.
        </p>
      </section>

      <section className="mb-6 rounded-3xl border border-border bg-card p-5">
        <h2 className="mb-1 flex items-center gap-2 font-serif text-lg text-foreground">
          <Heart className="size-4 text-primary" /> Resource bank
        </h2>
        <p className="mb-3 text-sm text-muted-foreground">Proud and calm moments, for a harder day.</p>
        <ul className="grid gap-2">
          {RESOURCE_BANK.map((r) => (
            <li key={r} className="rounded-2xl bg-muted/60 p-3 text-sm leading-relaxed text-foreground text-pretty">
              {r}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 px-1 font-serif text-lg text-foreground">Your guide</h2>
        <div className="grid gap-2">
          {(Object.keys(MENTORS) as MentorId[]).map((id) => (
            <button
              key={id}
              onClick={() => onChangeMentor(id)}
              className={cn(
                "rounded-2xl border p-4 text-left transition-colors",
                mentor === id ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted",
              )}
            >
              <p className="font-medium text-foreground">{MENTORS[id].name}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{MENTORS[id].voice}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-2">
        <Row icon={<Bell className="size-4" />} label="Reminders" value="Only when I open it" />
        <Row icon={<Shield className="size-4" />} label="Care &amp; safety" value="Not a medical app" />
      </section>

      <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground text-pretty">
        NutriMind supports wellbeing and is not a substitute for professional care. If you&apos;re struggling, please
        reach out to a qualified specialist.
      </p>
    </div>
  )
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
      <span className="text-muted-foreground">{icon}</span>
      <span className="font-medium text-foreground">{label}</span>
      <span className="ml-auto text-sm text-muted-foreground">{value}</span>
    </div>
  )
}
