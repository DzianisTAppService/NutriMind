"use client"

import { Shuffle, ArrowRight } from "lucide-react"
import { TriangleOfDay } from "@/components/triangle-of-day"
import { AXES, AXIS_ORDER, BRIDGES, MENTORS, type AxisId, type MentorId } from "@/lib/nutrimind-data"
import type { FlowKind } from "@/components/flow-sheet"

type Props = {
  progress: Record<AxisId, number>
  mentor: MentorId
  onOpenFlow: (flow: FlowKind) => void
  onGoBridges: () => void
}

export function HomeScreen({ progress, mentor, onOpenFlow, onGoBridges }: Props) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
  const bridge = BRIDGES[0]

  return (
    <div className="px-6 pb-28 pt-8">
      <header className="mb-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{today}</p>
        <h1 className="mt-1 font-serif text-3xl leading-tight text-foreground">Triangle of the day</h1>
      </header>

      <div className="mb-6 rounded-3xl border border-border bg-card p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {MENTORS[mentor].name} says
        </p>
        <p className="mt-1.5 text-pretty font-serif text-lg italic leading-snug text-foreground">
          “{MENTORS[mentor].prompt}”
        </p>
      </div>

      <div className="mb-2 flex justify-center">
        <TriangleOfDay progress={progress} onSelect={(axis) => onOpenFlow(axis)} size={300} />
      </div>
      <p className="mb-8 text-center text-sm text-muted-foreground text-pretty">
        Tap an axis to begin. Mindful engagement, not perfection.
      </p>

      <div className="mb-6 grid gap-3">
        {AXIS_ORDER.map((id) => (
          <button
            key={id}
            onClick={() => onOpenFlow(id)}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:bg-muted"
          >
            <span className="size-3 shrink-0 rounded-full" style={{ backgroundColor: `var(--color-${AXES[id].color})` }} />
            <span className="flex-1">
              <span className="block font-medium text-foreground">{AXES[id].name}</span>
              <span className="block text-sm text-muted-foreground">{AXES[id].tagline}</span>
            </span>
            <span className="text-sm font-semibold tabular-nums text-muted-foreground">{progress[id]}%</span>
            <ArrowRight className="size-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      <button
        onClick={() => onOpenFlow("challenge")}
        className="mb-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-foreground px-4 py-4 font-medium text-background transition-opacity hover:opacity-90"
      >
        <Shuffle className="size-4" />
        Surprise me with a 3-minute task
      </button>

      <button
        onClick={onGoBridges}
        className="flex w-full items-start gap-3 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4 text-left"
      >
        <span className="mt-0.5 flex items-center gap-1">
          <span className="size-2.5 rounded-full" style={{ backgroundColor: `var(--color-${AXES[bridge.from].color})` }} />
          <span className="text-muted-foreground">→</span>
          <span className="size-2.5 rounded-full" style={{ backgroundColor: `var(--color-${AXES[bridge.to].color})` }} />
        </span>
        <span className="flex-1">
          <span className="block text-xs font-medium uppercase tracking-wide text-primary">A bridge noticed</span>
          <span className="mt-0.5 block text-sm leading-relaxed text-foreground">{bridge.pattern}</span>
        </span>
      </button>
    </div>
  )
}
