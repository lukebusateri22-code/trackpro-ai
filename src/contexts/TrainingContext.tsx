import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Exercise {
  id: string;
  name: string;
  category: 'Speed' | 'Power' | 'Endurance' | 'Strength' | 'Technical' | 'Recovery';
  description: string;
  instructions: string[];
  targetMuscles: string[];
  equipment?: string[];
}

export interface WorkoutSet {
  reps?: number;
  weight?: number;
  distance?: number;
  time?: number;
  rest?: number;
  rpe?: number; // Rate of Perceived Exertion (1-10)
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: WorkoutSet[];
  notes?: string;
}

export interface Workout {
  id: string;
  name: string;
  date: string;
  type: 'Speed' | 'Power' | 'Endurance' | 'Strength' | 'Technical' | 'Recovery' | 'Competition';
  exercises: WorkoutExercise[];
  duration?: number; // in minutes
  overallRPE?: number;
  notes?: string;
  completed: boolean;
}

export interface TrainingPlan {
  id: string;
  name: string;
  description: string;
  duration: number; // weeks
  workouts: Workout[];
  goals: string[];
}

interface TrainingContextType {
  workouts: Workout[];
  exercises: Exercise[];
  currentWorkout: Workout | null;
  addWorkout: (workout: Omit<Workout, 'id'>) => void;
  updateWorkout: (id: string, updates: Partial<Workout>) => void;
  deleteWorkout: (id: string) => void;
  startWorkout: (workout: Workout) => void;
  completeWorkout: (workoutId: string, overallRPE?: number, notes?: string) => void;
  getWorkoutsByDateRange: (startDate: string, endDate: string) => Workout[];
  getTrainingStats: () => {
    totalWorkouts: number;
    totalHours: number;
    averageRPE: number;
    workoutsByType: { [key: string]: number };
  };
}

// Sample exercises database
const SAMPLE_EXERCISES: Exercise[] = [
  // Speed
  {
    id: 'sprint-100m',
    name: '100m Sprint',
    category: 'Speed',
    description: 'Full speed 100m sprint',
    instructions: ['Warm up thoroughly', 'Start from blocks or standing', 'Run at maximum effort', 'Focus on form'],
    targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves'],
    equipment: ['Track', 'Starting blocks (optional)']
  },
  {
    id: 'flying-20m',
    name: 'Flying 20m',
    category: 'Speed',
    description: 'Accelerate for 30m then sprint 20m at max speed',
    instructions: ['Build up speed over 30m', 'Sprint maximally for 20m', 'Focus on relaxation at top speed'],
    targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes'],
    equipment: ['Track', 'Cones']
  },
  // Power
  {
    id: 'depth-jumps',
    name: 'Depth Jumps',
    category: 'Power',
    description: 'Jump down from box and immediately jump up',
    instructions: ['Step off box', 'Land softly', 'Immediately jump up maximally', 'Focus on minimal ground contact'],
    targetMuscles: ['Quadriceps', 'Glutes', 'Calves'],
    equipment: ['Plyometric box']
  },
  {
    id: 'broad-jumps',
    name: 'Standing Broad Jump',
    category: 'Power',
    description: 'Jump forward for maximum distance',
    instructions: ['Start with feet shoulder-width apart', 'Swing arms back', 'Jump forward explosively', 'Land softly'],
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Measuring tape']
  },
  // Strength
  {
    id: 'squats',
    name: 'Back Squats',
    category: 'Strength',
    description: 'Fundamental lower body strength exercise',
    instructions: ['Position bar on upper back', 'Descend until thighs parallel', 'Drive through heels to stand', 'Keep chest up'],
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Barbell', 'Squat rack']
  },
  {
    id: 'deadlifts',
    name: 'Deadlifts',
    category: 'Strength',
    description: 'Hip hinge movement for posterior chain',
    instructions: ['Feet hip-width apart', 'Hinge at hips', 'Keep bar close to body', 'Drive hips forward to stand'],
    targetMuscles: ['Hamstrings', 'Glutes', 'Lower back'],
    equipment: ['Barbell', 'Plates']
  },
  // Technical
  {
    id: 'a-skips',
    name: 'A-Skips',
    category: 'Technical',
    description: 'Running drill for form and coordination',
    instructions: ['Skip forward', 'Drive knee up to 90 degrees', 'Maintain upright posture', 'Land on balls of feet'],
    targetMuscles: ['Hip flexors', 'Calves', 'Core'],
    equipment: ['Track or field']
  },
  {
    id: 'high-knees',
    name: 'High Knees',
    category: 'Technical',
    description: 'Running drill emphasizing knee drive',
    instructions: ['Run in place', 'Drive knees up high', 'Quick foot turnover', 'Pump arms actively'],
    targetMuscles: ['Hip flexors', 'Quadriceps', 'Calves'],
    equipment: ['None']
  },
  // Endurance
  {
    id: 'tempo-run',
    name: 'Tempo Run',
    category: 'Endurance',
    description: 'Sustained effort at comfortably hard pace',
    instructions: ['Warm up 10-15 minutes', 'Run at 85-90% effort', 'Maintain steady rhythm', 'Cool down'],
    targetMuscles: ['Full body cardiovascular'],
    equipment: ['Track or road']
  },
  // Recovery
  {
    id: 'easy-jog',
    name: 'Easy Jog',
    category: 'Recovery',
    description: 'Low intensity recovery run',
    instructions: ['Very easy pace', 'Should be able to hold conversation', 'Focus on relaxation', 'Listen to your body'],
    targetMuscles: ['Full body cardiovascular'],
    equipment: ['Track or road']
  }
];

const TrainingContext = createContext<TrainingContextType | undefined>(undefined);

export const useTraining = () => {
  const context = useContext(TrainingContext);
  if (!context) {
    throw new Error('useTraining must be used within a TrainingProvider');
  }
  return context;
};

export const TrainingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const exercises = SAMPLE_EXERCISES;

  useEffect(() => {
    // Load workouts from localStorage
    const savedWorkouts = localStorage.getItem('trackpro-workouts');
    if (savedWorkouts) {
      setWorkouts(JSON.parse(savedWorkouts));
    } else {
      // Add some sample workouts
      const sampleWorkouts: Workout[] = [
        {
          id: 'workout-1',
          name: 'Speed Development',
          date: '2024-08-20',
          type: 'Speed',
          exercises: [
            {
              exerciseId: 'sprint-100m',
              sets: [
                { distance: 100, time: 12.5, rest: 180, rpe: 8 },
                { distance: 100, time: 12.3, rest: 180, rpe: 9 },
                { distance: 100, time: 12.4, rest: 180, rpe: 9 }
              ]
            },
            {
              exerciseId: 'flying-20m',
              sets: [
                { distance: 20, time: 2.1, rest: 120, rpe: 8 },
                { distance: 20, time: 2.0, rest: 120, rpe: 9 }
              ]
            }
          ],
          duration: 90,
          overallRPE: 8,
          completed: true
        },
        {
          id: 'workout-2',
          name: 'Power Training',
          date: '2024-08-22',
          type: 'Power',
          exercises: [
            {
              exerciseId: 'depth-jumps',
              sets: [
                { reps: 5, rest: 60, rpe: 7 },
                { reps: 5, rest: 60, rpe: 8 },
                { reps: 5, rest: 60, rpe: 8 }
              ]
            },
            {
              exerciseId: 'broad-jumps',
              sets: [
                { reps: 3, distance: 2.8, rest: 90, rpe: 7 },
                { reps: 3, distance: 2.9, rest: 90, rpe: 8 }
              ]
            }
          ],
          duration: 60,
          overallRPE: 7,
          completed: true
        }
      ];
      setWorkouts(sampleWorkouts);
    }
  }, []);

  useEffect(() => {
    // Save workouts to localStorage
    localStorage.setItem('trackpro-workouts', JSON.stringify(workouts));
  }, [workouts]);

  const addWorkout = (workout: Omit<Workout, 'id'>) => {
    const newWorkout: Workout = {
      ...workout,
      id: `workout-${Date.now()}`
    };
    setWorkouts(prev => [...prev, newWorkout]);
  };

  const updateWorkout = (id: string, updates: Partial<Workout>) => {
    setWorkouts(prev => prev.map(workout => 
      workout.id === id ? { ...workout, ...updates } : workout
    ));
  };

  const deleteWorkout = (id: string) => {
    setWorkouts(prev => prev.filter(workout => workout.id !== id));
  };

  const startWorkout = (workout: Workout) => {
    setCurrentWorkout(workout);
  };

  const completeWorkout = (workoutId: string, overallRPE?: number, notes?: string) => {
    updateWorkout(workoutId, {
      completed: true,
      overallRPE,
      notes
    });
    setCurrentWorkout(null);
  };

  const getWorkoutsByDateRange = (startDate: string, endDate: string) => {
    return workouts.filter(workout => 
      workout.date >= startDate && workout.date <= endDate
    );
  };

  const getTrainingStats = () => {
    const completedWorkouts = workouts.filter(w => w.completed);
    const totalWorkouts = completedWorkouts.length;
    const totalHours = completedWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0) / 60;
    const averageRPE = completedWorkouts.reduce((sum, w) => sum + (w.overallRPE || 0), 0) / totalWorkouts || 0;
    
    const workoutsByType = completedWorkouts.reduce((acc, workout) => {
      acc[workout.type] = (acc[workout.type] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return {
      totalWorkouts,
      totalHours,
      averageRPE,
      workoutsByType
    };
  };

  return (
    <TrainingContext.Provider value={{
      workouts,
      exercises,
      currentWorkout,
      addWorkout,
      updateWorkout,
      deleteWorkout,
      startWorkout,
      completeWorkout,
      getWorkoutsByDateRange,
      getTrainingStats
    }}>
      {children}
    </TrainingContext.Provider>
  );
};
