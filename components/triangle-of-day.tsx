"use client"

import { AXES, type AxisId } from "@/lib/nutrimind-data"
import { cn } from "@/lib/utils"

type Props = {
  progress: Record<AxisId, number>
  onSelect: (axis: AxisId) => void
  size?: number
}

const SECTORS: Record<AxisId, { points: string; label: [number, number]; anchor: "middle" | "start" | "end" }> = {
  thought: {
    points: "150,18 214,134 150,176 86,134",
    label: [150, 56],
    anchor: "middle",
  },
  sport: {
    points: "214,134 274,252 150,252 150,176",
    label: [214, 226],
    anchor: "middle",
  },
  food: {
    points: "86,134 150,176 150,252 26,252",
    label: [86, 226],
    anchor: "middle",
  },
}

export function TriangleOfDay({ progress, onSelect, size = 300 }: Props) {
  return (
    <svg
      viewBox="0 0 300 280"
      width={size}
      height={(size * 280) / 300}
      role="group"
      aria-label="Triangle of the day. Tap an axis to begin a practice."
      className="select-none"
    >
      {(Object.keys(SECTORS) as AxisId[]).map((id) => {
        const sector = SECTORS[id]
        const pct = progress[id]
        const fillOpacity = 0.16 + (pct / 100) * 0.74
        return (
          <g key={id} className="cursor-pointer">
            <polygon
              points={sector.points}
              fill={`var(--color-${AXES[id].color})`}
              fillOpacity={fillOpacity}
              stroke="var(--color-background)"
              strokeWidth={3}
              className="transition-[fill-opacity] duration-700 ease-out hover:opacity-95"
              onClick={() => onSelect(id)}
            />
            <text
              x={sector.label[0]}
              y={sector.label[1]}
              textAnchor={sector.anchor}
              className="pointer-events-none font-sans"
              fill="var(--color-foreground)"
              fontSize="13"
              fontWeight={600}
            >
              {AXES[id].name}
            </text>
            <text
              x={sector.label[0]}
              y={sector.label[1] + 16}
              textAnchor={sector.anchor}
              className="pointer-events-none font-sans"
              fill="var(--color-foreground)"
              fontSize="10"
              opacity={0.7}
            >
              {pct}%
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function AxisDot({ axis, className }: { axis: AxisId; className?: string }) {
  return (
    <span
      className={cn("inline-block size-2.5 rounded-full", className)}
      style={{ backgroundColor: `var(--color-${AXES[axis].color})` }}
      aria-hidden="true"
    />
  )
}
