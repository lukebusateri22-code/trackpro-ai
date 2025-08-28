export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps?: number;
  duration?: string; // for time-based exercises
  weight?: number;
  restPeriod: number; // in seconds
  instructions?: string;
  formCues?: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'technique' | 'plyometric';
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  category: 'strength' | 'weight_loss' | 'muscle_building' | 'endurance' | 'speed' | 'power';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // in minutes
  exercises: Exercise[];
  equipment?: string[];
  tags: string[];
}

export interface Workout {
  id: string;
  name: string;
  description?: string;
  targetDate: string;
  estimatedDuration: number;
  difficulty: 'easy' | 'moderate' | 'hard' | 'extreme';
  category: 'strength' | 'cardio' | 'technique' | 'recovery' | 'mixed';
  exercises: Exercise[];
  
  // Assignment details (for coaches)
  assignedTo?: string[]; // athlete IDs
  priority: 'low' | 'medium' | 'high';
  specialInstructions?: string;
  modifications?: string;
  trackProgress: boolean;
  
  // Coach info
  createdBy?: string; // coach ID
  createdAt: string;
  updatedAt: string;
}

export interface WorkoutCompletion {
  id: string;
  workoutId: string;
  athleteId: string;
  status: 'not_started' | 'started' | 'completed';
  
  // Completion tracking
  startedAt?: string;
  completedAt?: string;
  actualDuration?: number;
  difficultyRating?: number; // 1-10
  energyBefore?: number; // 1-10
  energyAfter?: number; // 1-10
  
  // Performance data
  exerciseCompletions: ExerciseCompletion[];
  modifications?: string;
  injuries?: string;
  notes?: string;
  videoUrl?: string;
}

export interface ExerciseCompletion {
  exerciseId: string;
  actualSets: number;
  actualReps?: number;
  actualWeight?: number;
  actualDuration?: string;
  restTaken?: number;
  modifications?: string;
  completed: boolean;
}

export interface FitnessGoal {
  id: string;
  userId: string;
  type: 'weight_loss' | 'muscle_gain' | 'strength' | 'endurance' | 'speed' | 'technique';
  title: string;
  description: string;
  targetValue?: number;
  currentValue?: number;
  unit?: string;
  targetDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
}

export interface TrainingProgram {
  id: string;
  name: string;
  description: string;
  duration: number; // in weeks
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  goal: string;
  workoutsPerWeek: number;
  workouts: Workout[];
  createdBy?: string;
  isTemplate: boolean;
}

export interface BodyMeasurement {
  id: string;
  userId: string;
  date: string;
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  measurements: {
    chest?: number;
    waist?: number;
    hips?: number;
    biceps?: number;
    thighs?: number;
  };
  notes?: string;
}

export interface ProgressPhoto {
  id: string;
  userId: string;
  date: string;
  url: string;
  type: 'front' | 'side' | 'back';
  notes?: string;
}
