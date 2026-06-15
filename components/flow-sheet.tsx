"use client"

import { useEffect, useState } from "react"
import { X, ArrowRight, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AXES,
  DISTORTIONS,
  REFRAME_ALTERNATIVES,
  MICRO_CHALLENGES,
  type AxisId,
  type MentorId,
  MENTORS,
} from "@/lib/nutrimind-data"
import { cn } from "@/lib/utils"

export type FlowKind = AxisId | "challenge"

type Props = {
  flow: FlowKind | null
  mentor: MentorId
  onClose: () => void
  onComplete: (axis: AxisId) => void
}

export function FlowSheet({ flow, mentor, onClose, onComplete }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (flow) setMounted(true)
  }, [flow])

  useEffect(() => {
    if (!flow) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [flow, onClose])

  if (!flow && !mounted) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-end justify-center sm:items-center",
        flow ? "pointer-events-auto" : "pointer-events-none",
      )}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={cn(
          "absolute inset-0 bg-foreground/30 backdrop-blur-sm transition-opacity duration-300",
          flow ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-md rounded-t-[28px] bg-card p-6 shadow-2xl transition-all duration-300 sm:rounded-[28px]",
          flow ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        )}
        onTransitionEnd={() => {
          if (!flow) setMounted(false)
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted"
        >
          <X className="size-5" />
        </button>
        {flow === "food" && <FoodFlow onDone={() => onComplete("food")} onClose={onClose} />}
        {flow === "sport" && <SportFlow onDone={() => onComplete("sport")} onClose={onClose} />}
        {flow === "thought" && (
          <ThoughtFlow mentor={mentor} onDone={() => onComplete("thought")} onClose={onClose} />
        )}
        {flow === "challenge" && <ChallengeFlow onComplete={onComplete} onClose={onClose} />}
      </div>
    </div>
  )
}

function FlowHeader({ axis, eyebrow, title }: { axis: AxisId; eyebrow: string; title: string }) {
  return (
    <div className="mb-5 pr-8">
      <div className="mb-2 flex items-center gap-2">
        <span
          className="inline-block size-2.5 rounded-full"
          style={{ backgroundColor: `var(--color-${AXES[axis].color})` }}
        />
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{eyebrow}</span>
      </div>
      <h2 className="font-serif text-2xl leading-tight text-foreground text-balance">{title}</h2>
    </div>
  )
}

function DoneState({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
        <Check className="size-7" />
      </div>
      <p className="mb-1 font-serif text-xl text-foreground">Sector lit up</p>
      <p className="mb-6 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">{message}</p>
      <Button onClick={onClose} className="w-full rounded-full">
        Back to the triangle
      </Button>
    </div>
  )
}

/* ---------------- Food ---------------- */
function FoodFlow({ onDone, onClose }: { onDone: () => void; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [hunger, setHunger] = useState(5)
  const [emotion, setEmotion] = useState<string | null>(null)
  const emotions = ["Calm", "Bored", "Stressed", "Joyful", "Tired"]

  if (step === 3) {
    onDone()
    return <DoneState message="You noticed before you reacted. That's the whole practice." onClose={onClose} />
  }

  return (
    <div>
      <FlowHeader axis="food" eyebrow="Food psychology" title="A mindful check-in before you eat" />
      {step === 0 && (
        <div>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            Where are you on the hunger scale right now? No right answer.
          </p>
          <input
            type="range"
            min={1}
            max={10}
            value={hunger}
            onChange={(e) => setHunger(Number(e.target.value))}
            className="w-full accent-[var(--color-food)]"
            aria-label="Hunger level"
          />
          <div className="mb-6 mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Not hungry</span>
            <span className="font-semibold text-foreground">{hunger}/10</span>
            <span>Very hungry</span>
          </div>
          <Button onClick={() => setStep(1)} className="w-full rounded-full">
            Continue <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>
      )}
      {step === 1 && (
        <div>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            What feeling is here with the hunger?
          </p>
          <div className="mb-6 flex flex-wrap gap-2">
            {emotions.map((e) => (
              <button
                key={e}
                onClick={() => setEmotion(e)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  emotion === e
                    ? "border-transparent bg-foreground text-background"
                    : "border-border bg-card text-foreground hover:bg-muted",
                )}
              >
                {e}
              </button>
            ))}
          </div>
          <Button onClick={() => setStep(2)} disabled={!emotion} className="w-full rounded-full">
            Continue <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>
      )}
      {step === 2 && (
        <div>
          <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
            Taste diary — describe a bite by sensation, never numbers.
          </p>
          <textarea
            rows={3}
            placeholder="Warm, soft, a little salty…"
            className="mb-6 w-full resize-none rounded-2xl border border-border bg-background p-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
          <Button onClick={() => setStep(3)} className="w-full rounded-full">
            Save entry
          </Button>
        </div>
      )}
    </div>
  )
}

/* ---------------- Sport ---------------- */
function SportFlow({ onDone, onClose }: { onDone: () => void; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [role, setRole] = useState<string | null>(null)
  const roles = [
    { id: "explorer", label: "Explorer", note: "Curious, wandering" },
    { id: "warrior", label: "Warrior", note: "Strong, deliberate" },
    { id: "dancer", label: "Dancer", note: "Flowing, playful" },
  ]

  if (step === 2) {
    onDone()
    return <DoneState message="One squat is a full practice. You showed up — that's enough." onClose={onClose} />
  }

  return (
    <div>
      <FlowHeader axis="sport" eyebrow="Sport psychology" title="Move as little as you like" />
      {step === 0 && (
        <div>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">Who do you want to move as today?</p>
          <div className="mb-6 grid gap-2">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={cn(
                  "flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition-colors",
                  role === r.id ? "border-[var(--color-sport)] bg-sport/10" : "border-border hover:bg-muted",
                )}
              >
                <span className="font-medium text-foreground">{r.label}</span>
                <span className="text-xs text-muted-foreground">{r.note}</span>
              </button>
            ))}
          </div>
          <Button onClick={() => setStep(1)} disabled={!role} className="w-full rounded-full">
            Continue <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>
      )}
      {step === 1 && (
        <div className="text-center">
          <div className="mb-4 rounded-3xl bg-sport/10 p-6">
            <p className="font-serif text-xl text-foreground">Do just one squat.</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Then stop if you want to. Truly. The deal is one — anything more is a bonus, never a debt.
            </p>
          </div>
          <Button onClick={() => setStep(2)} className="w-full rounded-full">
            I did one <Check className="ml-1 size-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

/* ---------------- Thought ---------------- */
function ThoughtFlow({ mentor, onDone, onClose }: { mentor: MentorId; onDone: () => void; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [thought, setThought] = useState("")
  const [picked, setPicked] = useState<string | null>(null)

  if (step === 3) {
    onDone()
    return (
      <DoneState
        message="You met a harsh thought with curiosity instead of belief. That rewires gently, over time."
        onClose={onClose}
      />
    )
  }

  return (
    <div>
      <FlowHeader axis="thought" eyebrow="Positive thinking" title="Reframe a harsh thought" />
      {step === 0 && (
        <div>
          <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
            What's the thought weighing on you? Write it as it sounds in your head.
          </p>
          <textarea
            rows={3}
            value={thought}
            onChange={(e) => setThought(e.target.value)}
            placeholder="I always fail at this…"
            className="mb-6 w-full resize-none rounded-2xl border border-border bg-background p-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
          <Button onClick={() => setStep(1)} disabled={!thought.trim()} className="w-full rounded-full">
            Look closer <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>
      )}
      {step === 1 && (
        <div>
          <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
            This thought may carry a familiar distortion. Which feels closest?
          </p>
          <div className="mb-6 flex flex-wrap gap-2">
            {DISTORTIONS.map((d) => (
              <span
                key={d}
                className="rounded-full bg-thought/12 px-3 py-1.5 text-xs font-medium text-thought-foreground"
              >
                {d}
              </span>
            ))}
          </div>
          <div className="mb-6 rounded-2xl border border-border bg-muted/50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {MENTORS[mentor].name} asks
            </p>
            <p className="mt-1 text-pretty text-sm italic leading-relaxed text-foreground">
              “If a close friend said this to you, would you believe it about them?”
            </p>
          </div>
          <Button onClick={() => setStep(2)} className="w-full rounded-full">
            See gentler alternatives <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>
      )}
      {step === 2 && (
        <div>
          <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
            Pick one that feels even slightly more true:
          </p>
          <div className="mb-6 grid gap-2">
            {REFRAME_ALTERNATIVES.map((a) => (
              <button
                key={a}
                onClick={() => setPicked(a)}
                className={cn(
                  "rounded-2xl border px-4 py-3 text-left text-sm leading-relaxed transition-colors",
                  picked === a
                    ? "border-[var(--color-thought)] bg-thought/10 text-foreground"
                    : "border-border text-foreground hover:bg-muted",
                )}
              >
                {a}
              </button>
            ))}
          </div>
          <Button onClick={() => setStep(3)} disabled={!picked} className="w-full rounded-full">
            <Sparkles className="mr-1 size-4" /> Keep this one
          </Button>
        </div>
      )}
    </div>
  )
}

/* ---------------- Micro-challenge ---------------- */
function ChallengeFlow({
  onComplete,
  onClose,
}: {
  onComplete: (axis: AxisId) => void
  onClose: () => void
}) {
  const [challenge] = useState(() => MICRO_CHALLENGES[Math.floor(Math.random() * MICRO_CHALLENGES.length)])
  const [done, setDone] = useState(false)

  if (done) {
    onComplete(challenge.axis)
    return <DoneState message="Tiny actions, repeated kindly, are the practice." onClose={onClose} />
  }

  return (
    <div>
      <FlowHeader axis={challenge.axis} eyebrow="3-minute challenge" title="A small, optional invitation" />
      <div className="mb-6 rounded-3xl bg-muted/60 p-6 text-center">
        <p className="text-pretty font-serif text-xl leading-snug text-foreground">{challenge.text}</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onClose} className="flex-1 rounded-full bg-transparent">
          Not now
        </Button>
        <Button onClick={() => setDone(true)} className="flex-1 rounded-full">
          Done it
        </Button>
      </div>
    </div>
  )
}
