"use client"

import { useState } from "react"
import { Onboarding } from "@/components/onboarding"
import { HomeScreen } from "@/components/home-screen"
import { PracticesScreen } from "@/components/practices-screen"
import { BridgesScreen } from "@/components/bridges-screen"
import { ProfileScreen } from "@/components/profile-screen"
import { BottomNav, type Tab } from "@/components/bottom-nav"
import { FlowSheet, type FlowKind } from "@/components/flow-sheet"
import type { AxisId, MentorId } from "@/lib/nutrimind-data"

export function NutriMindApp() {
  const [onboarded, setOnboarded] = useState(false)
  const [mentor, setMentor] = useState<MentorId>("grandmother")
  const [tab, setTab] = useState<Tab>("home")
  const [flow, setFlow] = useState<FlowKind | null>(null)
  const [progress, setProgress] = useState<Record<AxisId, number>>({
    food: 35,
    sport: 20,
    thought: 55,
  })

  function handleComplete(axis: AxisId) {
    setProgress((p) => ({ ...p, [axis]: Math.min(100, p[axis] + 22) }))
  }

  if (!onboarded) {
    return (
      <main className="mx-auto min-h-dvh max-w-md bg-background">
        <Onboarding
          onFinish={(m) => {
            setMentor(m)
            setOnboarded(true)
          }}
        />
      </main>
    )
  }

  return (
    <main className="relative mx-auto min-h-dvh max-w-md bg-background">
      {tab === "home" && (
        <HomeScreen
          progress={progress}
          mentor={mentor}
          onOpenFlow={setFlow}
          onGoBridges={() => setTab("bridges")}
        />
      )}
      {tab === "practices" && <PracticesScreen onOpenFlow={setFlow} />}
      {tab === "bridges" && <BridgesScreen onOpenFlow={setFlow} />}
      {tab === "profile" && (
        <ProfileScreen progress={progress} mentor={mentor} onChangeMentor={setMentor} />
      )}

      <BottomNav tab={tab} onChange={setTab} />

      <FlowSheet
        flow={flow}
        mentor={mentor}
        onClose={() => setFlow(null)}
        onComplete={(axis) => {
          handleComplete(axis)
        }}
      />
    </main>
  )
}
