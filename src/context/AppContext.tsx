import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { INITIAL_TIMELINE, RESOURCES } from '../data/mockData';
import type {
  ActiveFlow,
  AppState,
  Domain,
  MentorType,
  SectorProgress,
} from '../types';

interface AppContextValue extends AppState {
  activeFlow: ActiveFlow;
  setActiveFlow: (flow: ActiveFlow) => void;
  completeOnboarding: (priority: Domain, mentor: MentorType) => void;
  updateSector: (domain: Domain, delta: number) => void;
  addTimelineEntry: (domain: Domain | 'bridge', text: string) => void;
}

const defaultSectors: SectorProgress = {
  food: 60,
  sport: 30,
  thoughts: 80,
};

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [priority, setPriority] = useState<Domain>('food');
  const [mentor, setMentor] = useState<MentorType>('stoic');
  const [sectors, setSectors] = useState<SectorProgress>(defaultSectors);
  const [timeline, setTimeline] = useState(INITIAL_TIMELINE);
  const [resources] = useState(RESOURCES);
  const [activeFlow, setActiveFlow] = useState<ActiveFlow>(null);

  const completeOnboarding = useCallback(
    (selectedPriority: Domain, selectedMentor: MentorType) => {
      setPriority(selectedPriority);
      setMentor(selectedMentor);
      setOnboardingComplete(true);
    },
    [],
  );

  const updateSector = useCallback((domain: Domain, delta: number) => {
    setSectors((prev) => ({
      ...prev,
      [domain]: Math.min(100, Math.max(0, prev[domain] + delta)),
    }));
  }, []);

  const addTimelineEntry = useCallback(
    (domain: Domain | 'bridge', text: string) => {
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      setTimeline((prev) => [
        {
          id: Date.now().toString(),
          time,
          domain,
          text,
        },
        ...prev,
      ]);
    },
    [],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      onboardingComplete,
      priority,
      mentor,
      sectors,
      timeline,
      resources,
      activeFlow,
      setActiveFlow,
      completeOnboarding,
      updateSector,
      addTimelineEntry,
    }),
    [
      onboardingComplete,
      priority,
      mentor,
      sectors,
      timeline,
      resources,
      activeFlow,
      completeOnboarding,
      updateSector,
      addTimelineEntry,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
