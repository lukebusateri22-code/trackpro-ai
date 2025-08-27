// API Service Layer for TrackPro AI
// Comprehensive database operations with Supabase

import { supabase } from '@/lib/supabase';
import type { 
  Profile, 
  TrainingPlan, 
  TrainingSession, 
  Exercise, 
  PersonalRecord, 
  VideoAnalysis, 
  Goal, 
  Achievement, 
  RecoveryMetric,
  ChatMessage,
  Notification,
  Competition,
  CompetitionEntry,
  CoachAthleteRelationship,
  Database 
} from '@/types/database';

// Authentication
export const authService = {
  async signUp(email: string, password: string, userData: Partial<Profile>) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    return { data, error };
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Profile Management
export const profileService = {
  async getProfile(userId: string): Promise<{ data: Profile | null; error: any }> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  async updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },

  async searchProfiles(query: string, role?: 'athlete' | 'coach') {
    let queryBuilder = supabase
      .from('profiles')
      .select('id, username, full_name, role, avatar_url')
      .ilike('username', `%${query}%`);
    
    if (role) {
      queryBuilder = queryBuilder.eq('role', role);
    }
    
    const { data, error } = await queryBuilder.limit(10);
    return { data, error };
  }
};

// Coach-Athlete Relationships
export const relationshipService = {
  async getCoachAthletes(coachId: string) {
    const { data, error } = await supabase
      .from('coach_athlete_relationships')
      .select(`
        *,
        athlete:profiles!athlete_id(*)
      `)
      .eq('coach_id', coachId)
      .eq('status', 'active');
    return { data, error };
  },

  async getAthleteCoaches(athleteId: string) {
    const { data, error } = await supabase
      .from('coach_athlete_relationships')
      .select(`
        *,
        coach:profiles!coach_id(*)
      `)
      .eq('athlete_id', athleteId)
      .eq('status', 'active');
    return { data, error };
  },

  async createRelationship(coachId: string, athleteId: string) {
    const { data, error } = await supabase
      .from('coach_athlete_relationships')
      .insert({
        coach_id: coachId,
        athlete_id: athleteId,
        status: 'pending'
      })
      .select()
      .single();
    return { data, error };
  },

  async updateRelationshipStatus(relationshipId: string, status: 'pending' | 'active' | 'inactive') {
    const { data, error } = await supabase
      .from('coach_athlete_relationships')
      .update({ status })
      .eq('id', relationshipId)
      .select()
      .single();
    return { data, error };
  }
};

// Training Plans
export const trainingPlanService = {
  async getTrainingPlans(userId: string, role: 'coach' | 'athlete') {
    const column = role === 'coach' ? 'coach_id' : 'athlete_id';
    const { data, error } = await supabase
      .from('training_plans')
      .select(`
        *,
        coach:profiles!coach_id(username, full_name),
        athlete:profiles!athlete_id(username, full_name),
        training_sessions(
          id,
          title,
          session_type,
          scheduled_date,
          status,
          exercises(id, name, completed)
        )
      `)
      .eq(column, userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async createTrainingPlan(plan: Database['public']['Tables']['training_plans']['Insert']) {
    const { data, error } = await supabase
      .from('training_plans')
      .insert(plan)
      .select()
      .single();
    return { data, error };
  },

  async updateTrainingPlan(planId: string, updates: Partial<TrainingPlan>) {
    const { data, error } = await supabase
      .from('training_plans')
      .update(updates)
      .eq('id', planId)
      .select()
      .single();
    return { data, error };
  },

  async deleteTrainingPlan(planId: string) {
    const { error } = await supabase
      .from('training_plans')
      .delete()
      .eq('id', planId);
    return { error };
  }
};

// Training Sessions
export const sessionService = {
  async getTrainingSessions(planId: string) {
    const { data, error } = await supabase
      .from('training_sessions')
      .select(`
        *,
        exercises(*)
      `)
      .eq('training_plan_id', planId)
      .order('scheduled_date', { ascending: true });
    return { data, error };
  },

  async createTrainingSession(session: Database['public']['Tables']['training_sessions']['Insert']) {
    const { data, error } = await supabase
      .from('training_sessions')
      .insert(session)
      .select()
      .single();
    return { data, error };
  },

  async updateTrainingSession(sessionId: string, updates: Partial<TrainingSession>) {
    const { data, error } = await supabase
      .from('training_sessions')
      .update(updates)
      .eq('id', sessionId)
      .select()
      .single();
    return { data, error };
  },

  async completeTrainingSession(sessionId: string, notes?: string) {
    const { data, error } = await supabase
      .from('training_sessions')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        notes
      })
      .eq('id', sessionId)
      .select()
      .single();
    return { data, error };
  }
};

// Exercises
export const exerciseService = {
  async getExercises(sessionId: string) {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('training_session_id', sessionId)
      .order('order_index', { ascending: true });
    return { data, error };
  },

  async createExercise(exercise: Database['public']['Tables']['exercises']['Insert']) {
    const { data, error } = await supabase
      .from('exercises')
      .insert(exercise)
      .select()
      .single();
    return { data, error };
  },

  async updateExercise(exerciseId: string, updates: Partial<Exercise>) {
    const { data, error } = await supabase
      .from('exercises')
      .update(updates)
      .eq('id', exerciseId)
      .select()
      .single();
    return { data, error };
  },

  async completeExercise(exerciseId: string, actualTime?: string, notes?: string) {
    const { data, error } = await supabase
      .from('exercises')
      .update({
        completed: true,
        actual_time: actualTime,
        notes
      })
      .eq('id', exerciseId)
      .select()
      .single();
    return { data, error };
  }
};

// Personal Records
export const personalRecordService = {
  async getPersonalRecords(athleteId: string) {
    const { data, error } = await supabase
      .from('personal_records')
      .select('*')
      .eq('athlete_id', athleteId)
      .order('date_achieved', { ascending: false });
    return { data, error };
  },

  async createPersonalRecord(record: Database['public']['Tables']['personal_records']['Insert']) {
    const { data, error } = await supabase
      .from('personal_records')
      .insert(record)
      .select()
      .single();
    return { data, error };
  },

  async updatePersonalRecord(recordId: string, updates: Partial<PersonalRecord>) {
    const { data, error } = await supabase
      .from('personal_records')
      .update(updates)
      .eq('id', recordId)
      .select()
      .single();
    return { data, error };
  },

  async getBestPerformance(athleteId: string, event: string) {
    const { data, error } = await supabase
      .from('personal_records')
      .select('*')
      .eq('athlete_id', athleteId)
      .eq('event', event)
      .order('performance_value', { ascending: true })
      .limit(1)
      .single();
    return { data, error };
  }
};

// Video Analysis
export const videoAnalysisService = {
  async getVideoAnalyses(athleteId: string) {
    const { data, error } = await supabase
      .from('video_analyses')
      .select('*')
      .eq('athlete_id', athleteId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async createVideoAnalysis(analysis: Database['public']['Tables']['video_analyses']['Insert']) {
    const { data, error } = await supabase
      .from('video_analyses')
      .insert(analysis)
      .select()
      .single();
    return { data, error };
  },

  async updateVideoAnalysis(analysisId: string, updates: Partial<VideoAnalysis>) {
    const { data, error } = await supabase
      .from('video_analyses')
      .update(updates)
      .eq('id', analysisId)
      .select()
      .single();
    return { data, error };
  },

  async uploadVideo(file: File, athleteId: string): Promise<{ data: { path: string } | null; error: any }> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${athleteId}/${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('video-analyses')
      .upload(fileName, file);
    
    return { data, error };
  },

  async getVideoUrl(path: string) {
    const { data } = supabase.storage
      .from('video-analyses')
      .getPublicUrl(path);
    
    return data.publicUrl;
  }
};

// Goals
export const goalService = {
  async getGoals(athleteId: string) {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('athlete_id', athleteId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async createGoal(goal: Database['public']['Tables']['goals']['Insert']) {
    const { data, error } = await supabase
      .from('goals')
      .insert(goal)
      .select()
      .single();
    return { data, error };
  },

  async updateGoal(goalId: string, updates: Partial<Goal>) {
    const { data, error } = await supabase
      .from('goals')
      .update(updates)
      .eq('id', goalId)
      .select()
      .single();
    return { data, error };
  },

  async completeGoal(goalId: string) {
    const { data, error } = await supabase
      .from('goals')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        progress_percentage: 100
      })
      .eq('id', goalId)
      .select()
      .single();
    return { data, error };
  }
};

// Achievements
export const achievementService = {
  async getAchievements(athleteId: string) {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('athlete_id', athleteId)
      .order('unlocked_at', { ascending: false });
    return { data, error };
  },

  async unlockAchievement(achievement: Database['public']['Tables']['achievements']['Insert']) {
    const { data, error } = await supabase
      .from('achievements')
      .insert(achievement)
      .select()
      .single();
    return { data, error };
  }
};

// Recovery Metrics
export const recoveryService = {
  async getRecoveryMetrics(athleteId: string, startDate?: string, endDate?: string) {
    let query = supabase
      .from('recovery_metrics')
      .select('*')
      .eq('athlete_id', athleteId);
    
    if (startDate) query = query.gte('date', startDate);
    if (endDate) query = query.lte('date', endDate);
    
    const { data, error } = await query.order('date', { ascending: false });
    return { data, error };
  },

  async createRecoveryMetric(metric: Database['public']['Tables']['recovery_metrics']['Insert']) {
    const { data, error } = await supabase
      .from('recovery_metrics')
      .upsert(metric, { onConflict: 'athlete_id,date' })
      .select()
      .single();
    return { data, error };
  },

  async getLatestRecoveryScore(athleteId: string) {
    const { data, error } = await supabase
      .from('recovery_metrics')
      .select('overall_recovery_score, date')
      .eq('athlete_id', athleteId)
      .order('date', { ascending: false })
      .limit(1)
      .single();
    return { data, error };
  }
};

// Chat Messages (AI Coach & Coach-Athlete)
export const chatService = {
  async getChatMessages(senderId: string, recipientId: string) {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .or(`and(sender_id.eq.${senderId},recipient_id.eq.${recipientId}),and(sender_id.eq.${recipientId},recipient_id.eq.${senderId})`)
      .order('created_at', { ascending: true });
    return { data, error };
  },

  async sendMessage(message: Database['public']['Tables']['chat_messages']['Insert']) {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert(message)
      .select()
      .single();
    return { data, error };
  },

  async markMessageAsRead(messageId: string) {
    const { data, error } = await supabase
      .from('chat_messages')
      .update({ read_at: new Date().toISOString() })
      .eq('id', messageId)
      .select()
      .single();
    return { data, error };
  }
};

// Notifications
export const notificationService = {
  async getNotifications(userId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);
    return { data, error };
  },

  async createNotification(notification: Database['public']['Tables']['notifications']['Insert']) {
    const { data, error } = await supabase
      .from('notifications')
      .insert(notification)
      .select()
      .single();
    return { data, error };
  },

  async markNotificationAsRead(notificationId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .update({ read_at: new Date().toISOString() })
      .eq('id', notificationId)
      .select()
      .single();
    return { data, error };
  },

  async getUnreadCount(userId: string) {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .is('read_at', null);
    return { count, error };
  }
};

// Competitions
export const competitionService = {
  async getCompetitions(level?: string, startDate?: string) {
    let query = supabase
      .from('competitions')
      .select('*');
    
    if (level) query = query.eq('competition_level', level);
    if (startDate) query = query.gte('start_date', startDate);
    
    const { data, error } = await query.order('start_date', { ascending: true });
    return { data, error };
  },

  async createCompetition(competition: Database['public']['Tables']['competitions']['Insert']) {
    const { data, error } = await supabase
      .from('competitions')
      .insert(competition)
      .select()
      .single();
    return { data, error };
  },

  async registerForCompetition(entry: Database['public']['Tables']['competition_entries']['Insert']) {
    const { data, error } = await supabase
      .from('competition_entries')
      .insert(entry)
      .select()
      .single();
    return { data, error };
  },

  async getAthleteCompetitions(athleteId: string) {
    const { data, error } = await supabase
      .from('competition_entries')
      .select(`
        *,
        competition:competitions(*)
      `)
      .eq('athlete_id', athleteId)
      .order('created_at', { ascending: false });
    return { data, error };
  }
};

// Real-time subscriptions
export const subscriptionService = {
  subscribeToTrainingPlans(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel('training_plans')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'training_plans',
          filter: `athlete_id=eq.${userId}`
        }, 
        callback
      )
      .subscribe();
  },

  subscribeToNotifications(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel('notifications')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        }, 
        callback
      )
      .subscribe();
  },

  subscribeToMessages(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel('chat_messages')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'chat_messages',
          filter: `recipient_id=eq.${userId}`
        }, 
        callback
      )
      .subscribe();
  }
};

// Analytics and Statistics
export const analyticsService = {
  async getTrainingStats(athleteId: string, startDate?: string, endDate?: string) {
    // Get training session completion stats
    let query = supabase
      .from('training_sessions')
      .select(`
        status,
        completed_at,
        duration_minutes,
        training_plan:training_plans!inner(athlete_id)
      `)
      .eq('training_plans.athlete_id', athleteId);
    
    if (startDate) query = query.gte('completed_at', startDate);
    if (endDate) query = query.lte('completed_at', endDate);
    
    const { data, error } = await query;
    return { data, error };
  },

  async getProgressStats(athleteId: string) {
    // Get goals progress
    const { data: goals, error: goalsError } = await supabase
      .from('goals')
      .select('status, progress_percentage, created_at, completed_at')
      .eq('athlete_id', athleteId);
    
    // Get personal records trend
    const { data: records, error: recordsError } = await supabase
      .from('personal_records')
      .select('event, performance_value, date_achieved')
      .eq('athlete_id', athleteId)
      .order('date_achieved', { ascending: true });
    
    return { 
      goals: { data: goals, error: goalsError },
      records: { data: records, error: recordsError }
    };
  },

  async getCoachDashboardStats(coachId: string) {
    // Get athlete count and activity
    const { data: athletes, error: athletesError } = await supabase
      .from('coach_athlete_relationships')
      .select(`
        athlete_id,
        profiles!athlete_id(username, full_name)
      `)
      .eq('coach_id', coachId)
      .eq('status', 'active');
    
    // Get recent training plan activity
    const { data: recentActivity, error: activityError } = await supabase
      .from('training_sessions')
      .select(`
        id,
        title,
        status,
        completed_at,
        training_plan:training_plans!inner(
          coach_id,
          athlete:profiles!athlete_id(username)
        )
      `)
      .eq('training_plans.coach_id', coachId)
      .order('completed_at', { ascending: false })
      .limit(10);
    
    return {
      athletes: { data: athletes, error: athletesError },
      recentActivity: { data: recentActivity, error: activityError }
    };
  }
};

export default {
  auth: authService,
  profile: profileService,
  relationship: relationshipService,
  trainingPlan: trainingPlanService,
  session: sessionService,
  exercise: exerciseService,
  personalRecord: personalRecordService,
  videoAnalysis: videoAnalysisService,
  goal: goalService,
  achievement: achievementService,
  recovery: recoveryService,
  chat: chatService,
  notification: notificationService,
  competition: competitionService,
  subscription: subscriptionService,
  analytics: analyticsService
};
