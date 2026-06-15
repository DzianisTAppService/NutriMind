"use client"

import { useState } from "react"
import { ArrowRight, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AXES, BRIDGES, PRACTICES, type AxisId } from "@/lib/nutrimind-data"
import type { FlowKind } from "@/components/flow-sheet"

export function BridgesScreen({ onOpenFlow }: { onOpenFlow: (flow: FlowKind) => void }) {
  const [dismissed, setDismissed] = useState<string[]>([])
  const visible = BRIDGES.filter((b) => !dismissed.includes(b.id))

  return (
    <div className="px-6 pb-28 pt-8">
      <header className="mb-5">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Connections</p>
        <h1 className="mt-1 font-serif text-3xl leading-tight text-foreground">Bridges</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
          Gentle patterns the app notices between your axes. Curiosity, never blame — and you can hide any that don&apos;t
          ring true.
        </p>
      </header>

      <div className="grid gap-4">
        {visible.map((b) => {
          const practice = PRACTICES.find((p) => p.id === b.practiceId)
          return (
            <article key={b.id} className="rounded-3xl border border-border bg-card p-5">
              <div className="mb-3 flex items-center gap-2">
                <AxisTag axis={b.from} />
                <ArrowRight className="size-4 text-muted-foreground" />
                <AxisTag axis={b.to} />
                <button
                  onClick={() => setDismissed((d) => [...d, b.id])}
                  className="ml-auto flex items-center gap-1 rounded-full px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted"
                  aria-label="Hide this bridge"
                >
                  <EyeOff className="size-3.5" /> Hide
                </button>
              </div>
              <h3 className="font-serif text-lg leading-snug text-foreground text-pretty">{b.pattern}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">{b.insight}</p>
              <div className="mt-4 rounded-2xl bg-muted/60 p-4">
                <p className="text-sm leading-relaxed text-foreground text-pretty">{b.suggestion}</p>
                <Button
                  onClick={() => onOpenFlow(practice?.axis ?? b.to)}
                  size="sm"
                  className="mt-3 rounded-full"
                >
                  Try “{practice?.title}” <ArrowRight className="ml-1 size-3.5" />
                </Button>
              </div>
            </article>
          )
        })}

        {visible.length === 0 && (
          <div className="rounded-3xl border border-dashed border-border p-8 text-center">
            <p className="font-serif text-lg text-foreground">All clear for now</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              New bridges appear as you log more across the three axes.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function AxisTag({ axis }: { axis: AxisId }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
      <span className="size-2 rounded-full" style={{ backgroundColor: `var(--color-${AXES[axis].color})` }} />
      {AXES[axis].name}
    </span>
  )
}
