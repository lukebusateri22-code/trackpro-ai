// Training Management Hooks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  trainingPlanService, 
  sessionService, 
  exerciseService,
  relationshipService 
} from '@/services/api';
import type { 
  TrainingPlan, 
  TrainingSession, 
  Exercise,
  Database 
} from '@/types/database';

// Training Plans
export const useTrainingPlans = (userId: string, role: 'coach' | 'athlete') => {
  return useQuery({
    queryKey: ['training-plans', userId, role],
    queryFn: () => trainingPlanService.getTrainingPlans(userId, role),
    select: (data) => data.data,
    enabled: !!userId
  });
};

export const useCreateTrainingPlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (plan: Database['public']['Tables']['training_plans']['Insert']) =>
      trainingPlanService.createTrainingPlan(plan),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['training-plans'] });
    }
  });
};

export const useUpdateTrainingPlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ planId, updates }: { planId: string; updates: Partial<TrainingPlan> }) =>
      trainingPlanService.updateTrainingPlan(planId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['training-plans'] });
    }
  });
};

// Training Sessions
export const useTrainingSessions = (planId: string) => {
  return useQuery({
    queryKey: ['training-sessions', planId],
    queryFn: () => sessionService.getTrainingSessions(planId),
    select: (data) => data.data,
    enabled: !!planId
  });
};

export const useCreateTrainingSession = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (session: Database['public']['Tables']['training_sessions']['Insert']) =>
      sessionService.createTrainingSession(session),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['training-sessions'] });
    }
  });
};

export const useCompleteTrainingSession = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ sessionId, notes }: { sessionId: string; notes?: string }) =>
      sessionService.completeTrainingSession(sessionId, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['training-sessions'] });
      queryClient.invalidateQueries({ queryKey: ['training-plans'] });
    }
  });
};

// Exercises
export const useExercises = (sessionId: string) => {
  return useQuery({
    queryKey: ['exercises', sessionId],
    queryFn: () => exerciseService.getExercises(sessionId),
    select: (data) => data.data,
    enabled: !!sessionId
  });
};

export const useCreateExercise = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (exercise: Database['public']['Tables']['exercises']['Insert']) =>
      exerciseService.createExercise(exercise),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    }
  });
};

export const useCompleteExercise = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      exerciseId, 
      actualTime, 
      notes 
    }: { 
      exerciseId: string; 
      actualTime?: string; 
      notes?: string 
    }) => exerciseService.completeExercise(exerciseId, actualTime, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    }
  });
};

// Coach-Athlete Relationships
export const useCoachAthletes = (coachId: string) => {
  return useQuery({
    queryKey: ['coach-athletes', coachId],
    queryFn: () => relationshipService.getCoachAthletes(coachId),
    select: (data) => data.data,
    enabled: !!coachId
  });
};

export const useAthleteCoaches = (athleteId: string) => {
  return useQuery({
    queryKey: ['athlete-coaches', athleteId],
    queryFn: () => relationshipService.getAthleteCoaches(athleteId),
    select: (data) => data.data,
    enabled: !!athleteId
  });
};

export const useCreateCoachAthleteRelationship = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ coachId, athleteId }: { coachId: string; athleteId: string }) =>
      relationshipService.createRelationship(coachId, athleteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coach-athletes'] });
      queryClient.invalidateQueries({ queryKey: ['athlete-coaches'] });
    }
  });
};
