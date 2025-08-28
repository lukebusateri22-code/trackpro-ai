import { WorkoutTemplate, Exercise } from '@/types/workout';

// Exercise database
export const EXERCISE_DATABASE: Exercise[] = [
  // Strength Training
  {
    id: 'squat',
    name: 'Back Squat',
    sets: 3,
    reps: 8,
    restPeriod: 120,
    instructions: 'Stand with feet shoulder-width apart, squat down keeping chest up',
    formCues: 'Keep knees in line with toes, drive through heels',
    category: 'strength'
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    sets: 3,
    reps: 5,
    restPeriod: 180,
    instructions: 'Hip hinge movement, keep bar close to body',
    formCues: 'Neutral spine, engage lats, drive hips forward',
    category: 'strength'
  },
  {
    id: 'bench-press',
    name: 'Bench Press',
    sets: 3,
    reps: 8,
    restPeriod: 120,
    instructions: 'Lie on bench, press bar from chest to full extension',
    formCues: 'Retract shoulder blades, control the descent',
    category: 'strength'
  },
  {
    id: 'pull-ups',
    name: 'Pull-ups',
    sets: 3,
    reps: 10,
    restPeriod: 90,
    instructions: 'Hang from bar, pull body up until chin over bar',
    formCues: 'Engage lats, avoid swinging',
    category: 'strength'
  },
  
  // Track & Field Specific
  {
    id: 'sprint-intervals',
    name: '100m Sprint Intervals',
    sets: 6,
    duration: '100m',
    restPeriod: 180,
    instructions: 'Sprint at 95% effort for 100 meters',
    formCues: 'Drive with arms, maintain form throughout',
    category: 'technique'
  },
  {
    id: 'hurdle-drills',
    name: 'Hurdle Mobility Drills',
    sets: 3,
    reps: 10,
    restPeriod: 60,
    instructions: 'Step over hurdles focusing on proper leg action',
    formCues: 'Lead with knee, quick ground contact',
    category: 'technique'
  },
  {
    id: 'long-jump-approach',
    name: 'Long Jump Approach Run',
    sets: 5,
    duration: '40m',
    restPeriod: 120,
    instructions: 'Practice approach run with consistent speed buildup',
    formCues: 'Gradual acceleration, hit takeoff mark',
    category: 'technique'
  },
  
  // Plyometrics
  {
    id: 'box-jumps',
    name: 'Box Jumps',
    sets: 4,
    reps: 8,
    restPeriod: 90,
    instructions: 'Jump onto box, step down, repeat',
    formCues: 'Land softly, full hip extension at top',
    category: 'plyometric'
  },
  {
    id: 'depth-jumps',
    name: 'Depth Jumps',
    sets: 3,
    reps: 5,
    restPeriod: 120,
    instructions: 'Step off box, land and immediately jump up',
    formCues: 'Minimize ground contact time, explosive takeoff',
    category: 'plyometric'
  },
  
  // Cardio
  {
    id: 'tempo-run',
    name: 'Tempo Run',
    sets: 1,
    duration: '20min',
    restPeriod: 0,
    instructions: 'Run at comfortably hard pace for 20 minutes',
    formCues: 'Maintain steady rhythm, controlled breathing',
    category: 'cardio'
  },
  {
    id: 'bike-intervals',
    name: 'Bike Intervals',
    sets: 8,
    duration: '30s',
    restPeriod: 90,
    instructions: 'High intensity cycling intervals',
    formCues: 'Maximum effort during work periods',
    category: 'cardio'
  }
];

// Workout templates
export const WORKOUT_TEMPLATES: WorkoutTemplate[] = [
  // Strength Training Templates
  {
    id: 'strength-beginner',
    name: 'Beginner Strength Training',
    description: 'Full body strength workout for beginners',
    category: 'strength',
    difficulty: 'beginner',
    estimatedDuration: 45,
    exercises: [
      EXERCISE_DATABASE.find(e => e.id === 'squat')!,
      EXERCISE_DATABASE.find(e => e.id === 'bench-press')!,
      EXERCISE_DATABASE.find(e => e.id === 'pull-ups')!
    ],
    equipment: ['Barbell', 'Bench', 'Pull-up bar'],
    tags: ['full-body', 'strength', 'beginner']
  },
  
  {
    id: 'powerlifting-intermediate',
    name: 'Powerlifting Focus',
    description: 'Heavy compound movements for strength gains',
    category: 'strength',
    difficulty: 'intermediate',
    estimatedDuration: 60,
    exercises: [
      EXERCISE_DATABASE.find(e => e.id === 'squat')!,
      EXERCISE_DATABASE.find(e => e.id === 'deadlift')!,
      EXERCISE_DATABASE.find(e => e.id === 'bench-press')!
    ],
    equipment: ['Barbell', 'Plates', 'Bench', 'Squat rack'],
    tags: ['powerlifting', 'strength', 'compound']
  },
  
  // Track & Field Templates
  {
    id: 'sprint-training',
    name: 'Sprint Development',
    description: 'Speed and acceleration training for sprinters',
    category: 'speed',
    difficulty: 'intermediate',
    estimatedDuration: 90,
    exercises: [
      EXERCISE_DATABASE.find(e => e.id === 'sprint-intervals')!,
      EXERCISE_DATABASE.find(e => e.id === 'box-jumps')!,
      EXERCISE_DATABASE.find(e => e.id === 'depth-jumps')!
    ],
    equipment: ['Track', 'Boxes', 'Cones'],
    tags: ['sprint', 'speed', 'power', 'track']
  },
  
  {
    id: 'jumps-training',
    name: 'Jumping Events Training',
    description: 'Specialized training for long jump, high jump, pole vault',
    category: 'power',
    difficulty: 'advanced',
    estimatedDuration: 120,
    exercises: [
      EXERCISE_DATABASE.find(e => e.id === 'long-jump-approach')!,
      EXERCISE_DATABASE.find(e => e.id === 'depth-jumps')!,
      EXERCISE_DATABASE.find(e => e.id === 'squat')!
    ],
    equipment: ['Runway', 'Sand pit', 'Barbell'],
    tags: ['jumps', 'technique', 'power']
  },
  
  // Endurance Templates
  {
    id: 'endurance-base',
    name: 'Endurance Base Building',
    description: 'Aerobic base development for distance runners',
    category: 'endurance',
    difficulty: 'beginner',
    estimatedDuration: 60,
    exercises: [
      EXERCISE_DATABASE.find(e => e.id === 'tempo-run')!,
      EXERCISE_DATABASE.find(e => e.id === 'bike-intervals')!
    ],
    equipment: ['Track', 'Bike'],
    tags: ['endurance', 'aerobic', 'distance']
  },
  
  // Weight Loss Templates
  {
    id: 'hiit-weight-loss',
    name: 'HIIT Fat Burner',
    description: 'High intensity interval training for weight loss',
    category: 'weight_loss',
    difficulty: 'intermediate',
    estimatedDuration: 30,
    exercises: [
      EXERCISE_DATABASE.find(e => e.id === 'bike-intervals')!,
      EXERCISE_DATABASE.find(e => e.id === 'box-jumps')!,
      EXERCISE_DATABASE.find(e => e.id === 'pull-ups')!
    ],
    equipment: ['Bike', 'Box', 'Pull-up bar'],
    tags: ['hiit', 'weight-loss', 'cardio']
  },
  
  // Muscle Building Templates
  {
    id: 'muscle-building',
    name: 'Muscle Building Program',
    description: 'Hypertrophy focused workout for muscle growth',
    category: 'muscle_building',
    difficulty: 'intermediate',
    estimatedDuration: 75,
    exercises: [
      { ...EXERCISE_DATABASE.find(e => e.id === 'squat')!, sets: 4, reps: 12 },
      { ...EXERCISE_DATABASE.find(e => e.id === 'bench-press')!, sets: 4, reps: 12 },
      { ...EXERCISE_DATABASE.find(e => e.id === 'pull-ups')!, sets: 4, reps: 12 },
      { ...EXERCISE_DATABASE.find(e => e.id === 'deadlift')!, sets: 3, reps: 10 }
    ],
    equipment: ['Barbell', 'Bench', 'Pull-up bar', 'Plates'],
    tags: ['hypertrophy', 'muscle-building', 'volume']
  }
];

export const getWorkoutsByCategory = (category: string) => {
  return WORKOUT_TEMPLATES.filter(template => template.category === category);
};

export const getWorkoutsByDifficulty = (difficulty: string) => {
  return WORKOUT_TEMPLATES.filter(template => template.difficulty === difficulty);
};

export const searchWorkouts = (query: string) => {
  return WORKOUT_TEMPLATES.filter(template => 
    template.name.toLowerCase().includes(query.toLowerCase()) ||
    template.description.toLowerCase().includes(query.toLowerCase()) ||
    template.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
};
