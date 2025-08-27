// Coach-Athlete System Types

export type UserRole = 'coach' | 'athlete';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coach extends User {
  role: 'coach';
  athletes: string[]; // Array of athlete IDs
  specializations: string[]; // e.g., ['sprints', 'jumps', 'throws']
  experience: number; // years of coaching
  certifications: string[];
}

export interface Athlete extends User {
  role: 'athlete';
  coachId?: string;
  events: string[]; // Primary events
  personalBests: Record<string, PersonalBest>;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'elite';
  dateOfBirth: string;
  weight?: number;
  height?: number;
}

export interface PersonalBest {
  event: string;
  result: string;
  date: string;
  location: string;
  conditions?: WeatherConditions;
}

export interface WeatherConditions {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  conditions: string; // 'sunny', 'cloudy', 'rainy', etc.
}

// Training Plan Types
export interface TrainingPlan {
  id: string;
  coachId: string;
  athleteId: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  phase: 'base' | 'build' | 'peak' | 'recovery';
  sessions: TrainingSession[];
  goals: string[];
  status: 'draft' | 'active' | 'completed' | 'paused';
  createdAt: string;
  updatedAt: string;
}

export interface TrainingSession {
  id: string;
  planId: string;
  date: string;
  type: 'track' | 'weights' | 'recovery' | 'technique';
  name: string;
  description?: string;
  exercises: Exercise[];
  duration: number; // minutes
  intensity: 'low' | 'moderate' | 'high' | 'max';
  completed: boolean;
  completedAt?: string;
  athleteNotes?: string;
  coachNotes?: string;
  videoUploads: string[]; // Array of video IDs
}

export interface Exercise {
  id: string;
  name: string;
  type: 'track' | 'weights' | 'plyometric' | 'technique' | 'mobility';
  category: string; // 'sprints', 'jumps', 'throws', 'distance', 'strength'
  sets?: number;
  reps?: number;
  weight?: number;
  distance?: number;
  time?: string;
  rest?: number; // seconds
  notes?: string;
  completed: boolean;
  actualSets?: number;
  actualReps?: number;
  actualWeight?: number;
  actualDistance?: number;
  actualTime?: string;
}

// Weight Lifting Specific Types
export interface WeightExercise extends Exercise {
  type: 'weights';
  muscleGroups: string[];
  equipment: string;
  tempo?: string; // e.g., "3-1-2-1"
  rpe?: number; // Rate of Perceived Exertion (1-10)
}

// Track Specific Types
export interface TrackExercise extends Exercise {
  type: 'track';
  event: string;
  splits?: string[];
  recoveryTime?: number;
  surface: 'track' | 'grass' | 'road' | 'treadmill';
}

// Video Analysis Types
export interface VideoAnalysis {
  id: string;
  sessionId: string;
  athleteId: string;
  coachId?: string;
  videoUrl: string;
  event: string;
  analysisData: AnalysisMetrics;
  freezeFrames: FreezeFrame[];
  aiInsights: string[];
  coachFeedback?: string;
  performanceData?: PerformanceRecord;
  createdAt: string;
}

export interface AnalysisMetrics {
  // Event-specific metrics
  [key: string]: any;
  
  // Triple Jump specific
  speed?: number;
  hopDistance?: number;
  stepDistance?: number;
  jumpDistance?: number;
  
  // Sprints specific
  reactionTime?: number;
  maxSpeed?: number;
  accelerationPhase?: number;
  
  // General metrics
  technique?: number;
  power?: number;
  efficiency?: number;
}

export interface FreezeFrame {
  id: string;
  timestamp: number;
  description: string;
  annotations: Annotation[];
  metrics?: Record<string, number>;
}

export interface Annotation {
  id: string;
  x: number;
  y: number;
  type: 'point' | 'line' | 'angle' | 'distance';
  label: string;
  color: string;
}

export interface PerformanceRecord {
  event: string;
  result: string;
  date: string;
  location: string;
  conditions: WeatherConditions;
  splits?: string[];
  notes?: string;
}

// Progress Tracking
export interface ProgressMetrics {
  athleteId: string;
  period: 'week' | 'month' | 'season' | 'year';
  completedSessions: number;
  totalSessions: number;
  averageIntensity: number;
  personalBestImprovements: number;
  injuryDays: number;
  consistency: number; // percentage
  strengthGains: Record<string, number>;
  speedImprovements: Record<string, number>;
}

// Notifications
export interface Notification {
  id: string;
  userId: string;
  type: 'training_assigned' | 'video_analyzed' | 'feedback_received' | 'session_completed';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}
