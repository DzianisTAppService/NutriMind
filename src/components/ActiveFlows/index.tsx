import { memo } from 'react';
import { useApp } from '../../context/AppContext';
import { FoodPracticeFlow } from '../../flows/FoodPractice';
import { SportPracticeFlow } from '../../flows/SportPractice';
import { ThoughtPracticeFlow } from '../../flows/ThoughtPractice';
import { MicroChallengeFlow } from '../../flows/MicroChallenge';

export const ActiveFlows = memo(function ActiveFlows() {
  const { activeFlow } = useApp();

  if (activeFlow === 'food') return <FoodPracticeFlow />;
  if (activeFlow === 'sport') return <SportPracticeFlow />;
  if (activeFlow === 'thoughts') return <ThoughtPracticeFlow />;
  if (activeFlow === 'micro') return <MicroChallengeFlow />;
  return null;
});
