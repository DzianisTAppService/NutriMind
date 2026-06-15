"use client"

import { Triangle, BookOpen, Link2, User } from "lucide-react"
import { cn } from "@/lib/utils"

export type Tab = "home" | "practices" | "bridges" | "profile"

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "home", label: "Today", icon: Triangle },
  { id: "practices", label: "Practices", icon: BookOpen },
  { id: "bridges", label: "Bridges", icon: Link2 },
  { id: "profile", label: "You", icon: User },
]

export function BottomNav({ tab, onChange }: { tab: Tab; onChange: (t: Tab) => void }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md border-t border-border bg-card/90 backdrop-blur-md">
      <ul className="flex items-stretch justify-around px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {TABS.map(({ id, label, icon: Icon }) => {
          const active = tab === id
          return (
            <li key={id} className="flex-1">
              <button
                onClick={() => onChange(id)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex w-full flex-col items-center gap-1 rounded-xl py-1.5 text-xs font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className={cn("size-5", active && "fill-primary/15")} />
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
