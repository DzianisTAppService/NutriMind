"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MENTORS, type MentorId } from "@/lib/nutrimind-data"
import { cn } from "@/lib/utils"

type Props = {
  onFinish: (mentor: MentorId) => void
}

export function Onboarding({ onFinish }: Props) {
  const [step, setStep] = useState(0)
  const [mentor, setMentor] = useState<MentorId>("grandmother")

  return (
    <div className="flex min-h-dvh flex-col px-6 py-10">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
        <p className="mb-10 text-center font-serif text-lg italic tracking-tight text-primary">NutriMind</p>

        {step === 0 && (
          <div className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col justify-center">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                The three axes
              </p>
              <h1 className="mb-5 text-balance font-serif text-4xl leading-[1.05] text-foreground">
                Food, movement and thoughts are one conversation.
              </h1>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground">
                No calories. No streaks. No “just smile.” NutriMind helps you notice how these three areas shape each
                other — and respond with small, kind actions.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { c: "food", t: "Food" },
                  { c: "sport", t: "Movement" },
                  { c: "thought", t: "Thoughts" },
                ].map((a) => (
                  <div key={a.t} className="rounded-2xl border border-border bg-card p-4 text-center">
                    <span
                      className="mx-auto mb-2 block size-3 rounded-full"
                      style={{ backgroundColor: `var(--color-${a.c})` }}
                    />
                    <span className="text-sm font-medium text-foreground">{a.t}</span>
                  </div>
                ))}
              </div>
            </div>
            <Button size="lg" onClick={() => setStep(1)} className="mt-8 w-full rounded-full">
              Begin <ArrowRight className="ml-1 size-4" />
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col justify-center">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Work on one axis
              </p>
              <h1 className="mb-5 text-balance font-serif text-4xl leading-[1.05] text-foreground">
                The other two follow naturally.
              </h1>
              <div className="grid gap-3">
                {[
                  "Notice taste and hunger — without numbers.",
                  "Move as little as one squat. Stop whenever.",
                  "Meet harsh thoughts with curiosity, not blame.",
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-foreground">{t}</p>
                  </div>
                ))}
              </div>
            </div>
            <Button size="lg" onClick={() => setStep(2)} className="mt-8 w-full rounded-full">
              Choose a guide <ArrowRight className="ml-1 size-4" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col justify-center">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Your mentor
              </p>
              <h1 className="mb-5 text-balance font-serif text-4xl leading-[1.05] text-foreground">
                Pick a voice that feels safe.
              </h1>
              <div className="grid gap-3">
                {(Object.keys(MENTORS) as MentorId[]).map((id) => (
                  <button
                    key={id}
                    onClick={() => setMentor(id)}
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
            </div>
            <Button size="lg" onClick={() => onFinish(mentor)} className="mt-8 w-full rounded-full">
              Enter NutriMind
            </Button>
          </div>
        )}

        <div className="mt-8 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn("h-1.5 rounded-full transition-all", i === step ? "w-6 bg-primary" : "w-1.5 bg-border")}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
