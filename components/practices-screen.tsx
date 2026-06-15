"use client"

import { useState } from "react"
import { Clock } from "lucide-react"
import { AXES, AXIS_ORDER, PRACTICES, type AxisId } from "@/lib/nutrimind-data"
import type { FlowKind } from "@/components/flow-sheet"
import { cn } from "@/lib/utils"

type Filter = "all" | AxisId

export function PracticesScreen({ onOpenFlow }: { onOpenFlow: (flow: FlowKind) => void }) {
  const [filter, setFilter] = useState<Filter>("all")
  const list = filter === "all" ? PRACTICES : PRACTICES.filter((p) => p.axis === filter)

  return (
    <div className="px-6 pb-28 pt-8">
      <header className="mb-5">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Library</p>
        <h1 className="mt-1 font-serif text-3xl leading-tight text-foreground">Practices</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
          Short, psychologically grounded actions. Pick what fits — there is no schedule to fall behind on.
        </p>
      </header>

      <div className="mb-5 flex flex-wrap gap-2">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")} label="All" />
        {AXIS_ORDER.map((id) => (
          <FilterChip
            key={id}
            active={filter === id}
            onClick={() => setFilter(id)}
            label={AXES[id].name}
            color={AXES[id].color}
          />
        ))}
      </div>

      <div className="grid gap-3">
        {list.map((p) => (
          <button
            key={p.id}
            onClick={() => onOpenFlow(p.axis)}
            className="rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:bg-muted"
          >
            <div className="mb-1.5 flex items-center gap-2">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: `var(--color-${AXES[p.axis].color})` }} />
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{p.kind}</span>
              <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3" /> {p.minutes} min
              </span>
            </div>
            <h3 className="font-serif text-lg text-foreground">{p.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">{p.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  label,
  color,
}: {
  active: boolean
  onClick: () => void
  label: string
  color?: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
        active ? "border-transparent bg-foreground text-background" : "border-border bg-card text-foreground hover:bg-muted",
      )}
    >
      {color && <span className="size-2 rounded-full" style={{ backgroundColor: `var(--color-${color})` }} />}
      {label}
    </button>
  )
}
