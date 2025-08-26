import React, { createContext, useContext, useState, useEffect } from 'react';

export interface DailyMetrics {
  date: string;
  sleep: {
    quality: number; // 1-10 scale
    duration: number; // hours
    bedtime?: string;
    wakeTime?: string;
  };
  stress: number; // 1-10 scale
  energy: number; // 1-10 scale
  nutrition: number; // 1-10 scale
  hydration: number; // 1-10 scale
  mood: number; // 1-10 scale
  motivation: number; // 1-10 scale
  notes?: string;
}

export interface Injury {
  id: string;
  name: string;
  type: 'Acute' | 'Chronic' | 'Overuse';
  severity: 'Minor' | 'Moderate' | 'Severe';
  bodyPart: string;
  dateOccurred: string;
  dateResolved?: string;
  status: 'Active' | 'Recovering' | 'Resolved';
  description: string;
  treatment?: string[];
  notes?: string;
}

export interface RecoveryRecommendation {
  type: 'Sleep' | 'Nutrition' | 'Hydration' | 'Stress' | 'Rest' | 'Activity';
  priority: 'Low' | 'Medium' | 'High';
  title: string;
  description: string;
  actionItems: string[];
}

interface RecoveryContextType {
  dailyMetrics: DailyMetrics[];
  injuries: Injury[];
  addDailyMetrics: (metrics: DailyMetrics) => void;
  updateDailyMetrics: (date: string, updates: Partial<DailyMetrics>) => void;
  addInjury: (injury: Omit<Injury, 'id'>) => void;
  updateInjury: (id: string, updates: Partial<Injury>) => void;
  getMetricsForDate: (date: string) => DailyMetrics | undefined;
  getRecoveryScore: (date?: string) => number;
  getRecoveryTrend: (days: number) => number[];
  getRecommendations: () => RecoveryRecommendation[];
  getActiveInjuries: () => Injury[];
}

const RecoveryContext = createContext<RecoveryContextType | undefined>(undefined);

export const useRecovery = () => {
  const context = useContext(RecoveryContext);
  if (!context) {
    throw new Error('useRecovery must be used within a RecoveryProvider');
  }
  return context;
};

export const RecoveryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dailyMetrics, setDailyMetrics] = useState<DailyMetrics[]>([]);
  const [injuries, setInjuries] = useState<Injury[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const savedMetrics = localStorage.getItem('trackpro-recovery-metrics');
    const savedInjuries = localStorage.getItem('trackpro-injuries');
    
    if (savedMetrics) {
      setDailyMetrics(JSON.parse(savedMetrics));
    } else {
      // Add sample data
      const sampleMetrics: DailyMetrics[] = [
        {
          date: '2024-08-25',
          sleep: { quality: 8, duration: 7.5, bedtime: '22:30', wakeTime: '06:00' },
          stress: 3,
          energy: 8,
          nutrition: 7,
          hydration: 8,
          mood: 8,
          motivation: 9,
          notes: 'Feeling great after good sleep'
        },
        {
          date: '2024-08-24',
          sleep: { quality: 6, duration: 6.5, bedtime: '23:15', wakeTime: '05:45' },
          stress: 5,
          energy: 6,
          nutrition: 6,
          hydration: 7,
          mood: 6,
          motivation: 7,
          notes: 'Bit tired, went to bed late'
        },
        {
          date: '2024-08-23',
          sleep: { quality: 9, duration: 8, bedtime: '22:00', wakeTime: '06:00' },
          stress: 2,
          energy: 9,
          nutrition: 8,
          hydration: 9,
          mood: 9,
          motivation: 9,
          notes: 'Perfect recovery day'
        }
      ];
      setDailyMetrics(sampleMetrics);
    }
    
    if (savedInjuries) {
      setInjuries(JSON.parse(savedInjuries));
    }
  }, []);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('trackpro-recovery-metrics', JSON.stringify(dailyMetrics));
    localStorage.setItem('trackpro-injuries', JSON.stringify(injuries));
  }, [dailyMetrics, injuries]);

  const addDailyMetrics = (metrics: DailyMetrics) => {
    setDailyMetrics(prev => {
      const existing = prev.find(m => m.date === metrics.date);
      if (existing) {
        return prev.map(m => m.date === metrics.date ? metrics : m);
      }
      return [...prev, metrics].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  };

  const updateDailyMetrics = (date: string, updates: Partial<DailyMetrics>) => {
    setDailyMetrics(prev => prev.map(metrics => 
      metrics.date === date ? { ...metrics, ...updates } : metrics
    ));
  };

  const addInjury = (injury: Omit<Injury, 'id'>) => {
    const newInjury: Injury = {
      ...injury,
      id: `injury-${Date.now()}`
    };
    setInjuries(prev => [...prev, newInjury]);
  };

  const updateInjury = (id: string, updates: Partial<Injury>) => {
    setInjuries(prev => prev.map(injury => 
      injury.id === id ? { ...injury, ...updates } : injury
    ));
  };

  const getMetricsForDate = (date: string) => {
    return dailyMetrics.find(m => m.date === date);
  };

  const getRecoveryScore = (date?: string) => {
    const targetDate = date || new Date().toISOString().split('T')[0];
    const metrics = getMetricsForDate(targetDate);
    
    if (!metrics) return 0;
    
    // Calculate weighted recovery score
    const sleepScore = (metrics.sleep.quality * 0.3) + (Math.min(metrics.sleep.duration / 8, 1) * 10 * 0.2);
    const stressScore = (10 - metrics.stress) * 0.15;
    const energyScore = metrics.energy * 0.15;
    const nutritionScore = metrics.nutrition * 0.1;
    const hydrationScore = metrics.hydration * 0.05;
    const moodScore = metrics.mood * 0.05;
    
    return Math.round(sleepScore + stressScore + energyScore + nutritionScore + hydrationScore + moodScore);
  };

  const getRecoveryTrend = (days: number) => {
    const dates = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates.map(date => getRecoveryScore(date));
  };

  const getRecommendations = (): RecoveryRecommendation[] => {
    const recentMetrics = dailyMetrics.slice(0, 3);
    const recommendations: RecoveryRecommendation[] = [];
    
    if (recentMetrics.length === 0) return recommendations;
    
    // Sleep recommendations
    const avgSleepQuality = recentMetrics.reduce((sum, m) => sum + m.sleep.quality, 0) / recentMetrics.length;
    const avgSleepDuration = recentMetrics.reduce((sum, m) => sum + m.sleep.duration, 0) / recentMetrics.length;
    
    if (avgSleepQuality < 7 || avgSleepDuration < 7) {
      recommendations.push({
        type: 'Sleep',
        priority: 'High',
        title: 'Improve Sleep Quality',
        description: 'Your sleep quality or duration has been below optimal levels.',
        actionItems: [
          'Aim for 7-9 hours of sleep per night',
          'Maintain consistent bedtime and wake time',
          'Create a relaxing bedtime routine',
          'Avoid screens 1 hour before bed'
        ]
      });
    }
    
    // Stress recommendations
    const avgStress = recentMetrics.reduce((sum, m) => sum + m.stress, 0) / recentMetrics.length;
    if (avgStress > 6) {
      recommendations.push({
        type: 'Stress',
        priority: 'High',
        title: 'Manage Stress Levels',
        description: 'Your stress levels have been elevated recently.',
        actionItems: [
          'Practice deep breathing or meditation',
          'Consider reducing training intensity',
          'Schedule relaxation time',
          'Talk to a coach or counselor if needed'
        ]
      });
    }
    
    // Hydration recommendations
    const avgHydration = recentMetrics.reduce((sum, m) => sum + m.hydration, 0) / recentMetrics.length;
    if (avgHydration < 7) {
      recommendations.push({
        type: 'Hydration',
        priority: 'Medium',
        title: 'Increase Hydration',
        description: 'Your hydration levels could be improved.',
        actionItems: [
          'Drink water first thing in the morning',
          'Carry a water bottle throughout the day',
          'Monitor urine color as hydration indicator',
          'Increase intake on training days'
        ]
      });
    }
    
    // Nutrition recommendations
    const avgNutrition = recentMetrics.reduce((sum, m) => sum + m.nutrition, 0) / recentMetrics.length;
    if (avgNutrition < 7) {
      recommendations.push({
        type: 'Nutrition',
        priority: 'Medium',
        title: 'Optimize Nutrition',
        description: 'Your nutrition quality could be enhanced.',
        actionItems: [
          'Focus on whole, unprocessed foods',
          'Ensure adequate protein intake',
          'Time carbohydrates around training',
          'Consider consulting a sports nutritionist'
        ]
      });
    }
    
    return recommendations.sort((a, b) => {
      const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  const getActiveInjuries = () => {
    return injuries.filter(injury => injury.status === 'Active' || injury.status === 'Recovering');
  };

  return (
    <RecoveryContext.Provider value={{
      dailyMetrics,
      injuries,
      addDailyMetrics,
      updateDailyMetrics,
      addInjury,
      updateInjury,
      getMetricsForDate,
      getRecoveryScore,
      getRecoveryTrend,
      getRecommendations,
      getActiveInjuries
    }}>
      {children}
    </RecoveryContext.Provider>
  );
};
