export type Domain = 'food' | 'sport' | 'thoughts';

export type MentorType = 'stoic' | 'grandma' | 'neutral';

export type PriorityDomain = Domain;

export interface SectorProgress {
  food: number;
  sport: number;
  thoughts: number;
}

export interface TimelineEntry {
  id: string;
  time: string;
  domain: Domain | 'bridge';
  text: string;
}

export interface Practice {
  id: string;
  domain: Domain;
  title: string;
  duration: string;
  isPro: boolean;
  description: string;
}

export interface Bridge {
  id: string;
  leftDomain: Domain;
  leftText: string;
  leftTime: string;
  rightDomain: Domain;
  rightText: string;
  rightTime: string;
  action: string;
  resolved: boolean;
}

export interface ResourceMemory {
  id: string;
  text: string;
  tag: string;
}

export interface UserProfile {
  name: string;
  mentor: MentorType;
  streak: number;
  practicesCount: number;
  bridgesResolved: number;
  resourceLimit: number;
}

export type ActiveFlow = 'food' | 'sport' | 'thoughts' | 'micro' | null;

export interface AppState {
  onboardingComplete: boolean;
  priority: Domain;
  mentor: MentorType;
  sectors: SectorProgress;
  timeline: TimelineEntry[];
  resources: ResourceMemory[];
}
