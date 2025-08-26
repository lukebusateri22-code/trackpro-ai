import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'Performance' | 'Training' | 'Health' | 'Skill';
  type: 'Time' | 'Distance' | 'Frequency' | 'Technique' | 'Competition';
  event?: string;
  targetValue?: number;
  currentValue?: number;
  unit?: string;
  targetDate: string;
  createdDate: string;
  status: 'Active' | 'Completed' | 'Paused' | 'Missed';
  priority: 'Low' | 'Medium' | 'High';
  milestones: Milestone[];
  notes?: string;
  isSmartGoal: boolean; // Specific, Measurable, Achievable, Relevant, Time-bound
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetValue?: number;
  targetDate: string;
  completed: boolean;
  completedDate?: string;
  notes?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'Performance' | 'Consistency' | 'Improvement' | 'Special';
  unlockedDate: string;
  goalId?: string;
}

interface GoalsContextType {
  goals: Goal[];
  achievements: Achievement[];
  addGoal: (goal: Omit<Goal, 'id' | 'createdDate'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  completeGoal: (id: string, notes?: string) => void;
  updateProgress: (goalId: string, currentValue: number, notes?: string) => void;
  completeMilestone: (goalId: string, milestoneId: string, notes?: string) => void;
  getActiveGoals: () => Goal[];
  getGoalsByCategory: (category: string) => Goal[];
  getProgressPercentage: (goal: Goal) => number;
  getUpcomingDeadlines: (days: number) => Goal[];
  unlockAchievement: (achievement: Omit<Achievement, 'id' | 'unlockedDate'>) => void;
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export const useGoals = () => {
  const context = useContext(GoalsContext);
  if (!context) {
    throw new Error('useGoals must be used within a GoalsProvider');
  }
  return context;
};

// Predefined achievements
const PREDEFINED_ACHIEVEMENTS: Omit<Achievement, 'id' | 'unlockedDate'>[] = [
  {
    title: 'First Goal',
    description: 'Created your first goal',
    icon: '🎯',
    category: 'Special'
  },
  {
    title: 'Goal Crusher',
    description: 'Completed 5 goals',
    icon: '💪',
    category: 'Performance'
  },
  {
    title: 'Consistent Performer',
    description: 'Achieved 7 days of consistent training',
    icon: '🔥',
    category: 'Consistency'
  },
  {
    title: 'Personal Best',
    description: 'Set a new personal record',
    icon: '🏆',
    category: 'Performance'
  },
  {
    title: 'Speed Demon',
    description: 'Completed a sprint-focused goal',
    icon: '⚡',
    category: 'Performance'
  },
  {
    title: 'Distance Runner',
    description: 'Completed an endurance goal',
    icon: '🏃',
    category: 'Performance'
  },
  {
    title: 'Power House',
    description: 'Completed a strength/power goal',
    icon: '💥',
    category: 'Performance'
  }
];

export const GoalsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    // Load from localStorage
    const savedGoals = localStorage.getItem('trackpro-goals');
    const savedAchievements = localStorage.getItem('trackpro-achievements');
    
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    } else {
      // Add sample goals
      const sampleGoals: Goal[] = [
        {
          id: 'goal-1',
          title: 'Break 11 seconds in 100m',
          description: 'Achieve a sub-11 second 100m sprint time',
          category: 'Performance',
          type: 'Time',
          event: '100m',
          targetValue: 10.99,
          currentValue: 11.2,
          unit: 'seconds',
          targetDate: '2024-12-31',
          createdDate: '2024-08-01',
          status: 'Active',
          priority: 'High',
          isSmartGoal: true,
          milestones: [
            {
              id: 'milestone-1',
              title: 'Run 11.1 seconds',
              description: 'First milestone towards sub-11',
              targetValue: 11.1,
              targetDate: '2024-10-15',
              completed: false
            },
            {
              id: 'milestone-2',
              title: 'Run 11.05 seconds',
              description: 'Getting closer to the goal',
              targetValue: 11.05,
              targetDate: '2024-11-15',
              completed: false
            }
          ]
        },
        {
          id: 'goal-2',
          title: 'Jump 7.5m in Long Jump',
          description: 'Achieve a 7.5 meter long jump',
          category: 'Performance',
          type: 'Distance',
          event: 'Long Jump',
          targetValue: 7.5,
          currentValue: 7.25,
          unit: 'meters',
          targetDate: '2024-11-30',
          createdDate: '2024-08-10',
          status: 'Active',
          priority: 'High',
          isSmartGoal: true,
          milestones: [
            {
              id: 'milestone-3',
              title: 'Jump 7.35m',
              description: 'Incremental improvement',
              targetValue: 7.35,
              targetDate: '2024-09-30',
              completed: true,
              completedDate: '2024-09-25'
            },
            {
              id: 'milestone-4',
              title: 'Jump 7.45m',
              description: 'Almost there!',
              targetValue: 7.45,
              targetDate: '2024-10-31',
              completed: false
            }
          ]
        },
        {
          id: 'goal-3',
          title: 'Train 5 times per week',
          description: 'Maintain consistent training schedule',
          category: 'Training',
          type: 'Frequency',
          targetValue: 5,
          currentValue: 4,
          unit: 'sessions/week',
          targetDate: '2024-12-31',
          createdDate: '2024-08-15',
          status: 'Active',
          priority: 'Medium',
          isSmartGoal: true,
          milestones: []
        }
      ];
      setGoals(sampleGoals);
    }
    
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }
  }, []);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('trackpro-goals', JSON.stringify(goals));
    localStorage.setItem('trackpro-achievements', JSON.stringify(achievements));
  }, [goals, achievements]);

  const addGoal = (goal: Omit<Goal, 'id' | 'createdDate'>) => {
    const newGoal: Goal = {
      ...goal,
      id: `goal-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setGoals(prev => [...prev, newGoal]);
    
    // Unlock "First Goal" achievement if it's the first goal
    if (goals.length === 0) {
      unlockAchievement(PREDEFINED_ACHIEVEMENTS[0]);
    }
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, ...updates } : goal
    ));
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const completeGoal = (id: string, notes?: string) => {
    updateGoal(id, { 
      status: 'Completed',
      notes: notes || undefined
    });
    
    // Check for achievements
    const completedGoals = goals.filter(g => g.status === 'Completed').length + 1;
    if (completedGoals === 5) {
      unlockAchievement(PREDEFINED_ACHIEVEMENTS[1]); // Goal Crusher
    }
    
    const goal = goals.find(g => g.id === id);
    if (goal) {
      // Event-specific achievements
      if (goal.event === '100m' || goal.event === '200m' || goal.event === '400m') {
        unlockAchievement(PREDEFINED_ACHIEVEMENTS[4]); // Speed Demon
      } else if (goal.event === '800m' || goal.event === '1500m' || goal.event === '5000m') {
        unlockAchievement(PREDEFINED_ACHIEVEMENTS[5]); // Distance Runner
      } else if (goal.category === 'Training' && goal.type === 'Frequency') {
        unlockAchievement(PREDEFINED_ACHIEVEMENTS[2]); // Consistent Performer
      }
    }
  };

  const updateProgress = (goalId: string, currentValue: number, notes?: string) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;
    
    const updates: Partial<Goal> = { currentValue };
    if (notes) updates.notes = notes;
    
    // Check if goal is completed
    if (goal.targetValue) {
      const isCompleted = goal.type === 'Time' 
        ? currentValue <= goal.targetValue 
        : currentValue >= goal.targetValue;
      
      if (isCompleted) {
        updates.status = 'Completed';
        unlockAchievement(PREDEFINED_ACHIEVEMENTS[3]); // Personal Best
      }
    }
    
    updateGoal(goalId, updates);
  };

  const completeMilestone = (goalId: string, milestoneId: string, notes?: string) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;
    
    const updatedMilestones = goal.milestones.map(milestone =>
      milestone.id === milestoneId
        ? { 
            ...milestone, 
            completed: true, 
            completedDate: new Date().toISOString().split('T')[0],
            notes: notes || undefined
          }
        : milestone
    );
    
    updateGoal(goalId, { milestones: updatedMilestones });
  };

  const getActiveGoals = () => {
    return goals.filter(goal => goal.status === 'Active');
  };

  const getGoalsByCategory = (category: string) => {
    return goals.filter(goal => goal.category === category);
  };

  const getProgressPercentage = (goal: Goal) => {
    if (!goal.targetValue || !goal.currentValue) return 0;
    
    if (goal.type === 'Time') {
      // For time-based goals, lower is better
      const improvement = Math.max(0, goal.currentValue - goal.targetValue);
      const totalImprovement = goal.currentValue - goal.targetValue;
      return Math.min(100, Math.max(0, (1 - improvement / totalImprovement) * 100));
    } else {
      // For distance/frequency goals, higher is better
      return Math.min(100, (goal.currentValue / goal.targetValue) * 100);
    }
  };

  const getUpcomingDeadlines = (days: number) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() + days);
    
    return goals.filter(goal => 
      goal.status === 'Active' && 
      new Date(goal.targetDate) <= cutoffDate
    ).sort((a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime());
  };

  const unlockAchievement = (achievement: Omit<Achievement, 'id' | 'unlockedDate'>) => {
    // Check if already unlocked
    const exists = achievements.find(a => a.title === achievement.title);
    if (exists) return;
    
    const newAchievement: Achievement = {
      ...achievement,
      id: `achievement-${Date.now()}`,
      unlockedDate: new Date().toISOString().split('T')[0]
    };
    
    setAchievements(prev => [...prev, newAchievement]);
  };

  return (
    <GoalsContext.Provider value={{
      goals,
      achievements,
      addGoal,
      updateGoal,
      deleteGoal,
      completeGoal,
      updateProgress,
      completeMilestone,
      getActiveGoals,
      getGoalsByCategory,
      getProgressPercentage,
      getUpcomingDeadlines,
      unlockAchievement
    }}>
      {children}
    </GoalsContext.Provider>
  );
};
