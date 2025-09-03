// Database Service Layer for TrackPro AI
// Handles all database operations with Supabase

import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

// Type aliases for cleaner code
type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

// =============================================
// AUTHENTICATION & PROFILES
// =============================================

export const profileService = {
  // Get current user profile
  async getCurrentProfile(): Promise<Profile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  },

  // Create or update profile
  async upsertProfile(profile: ProfileInsert | ProfileUpdate): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .upsert(profile)
      .select()
      .single();

    if (error) {
      console.error('Error upserting profile:', error);
      return null;
    }

    return data;
  },

  // Get profile by coach code
  async getProfileByCoachCode(coachCode: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('coach_code', coachCode)
      .eq('role', 'coach')
      .single();

    if (error) {
      console.error('Error fetching coach by code:', error);
      return null;
    }

    return data;
  },

  // Get athletes for a coach
  async getAthletesByCoach(coachId: string): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('coach_athlete_relationships')
      .select(`
        athlete:profiles!coach_athlete_relationships_athlete_id_fkey(*)
      `)
      .eq('coach_id', coachId)
      .eq('status', 'active');

    if (error) {
      console.error('Error fetching athletes:', error);
      return [];
    }

    return data.map(item => item.athlete).filter(Boolean) as Profile[];
  }
};

// =============================================
// COACH-ATHLETE RELATIONSHIPS
// =============================================

export const relationshipService = {
  // Connect athlete to coach
  async connectAthleteToCoach(athleteId: string, coachId: string) {
    const { data, error } = await supabase
      .from('coach_athlete_relationships')
      .insert({
        coach_id: coachId,
        athlete_id: athleteId,
        status: 'active'
      })
      .select()
      .single();

    if (error) {
      console.error('Error connecting athlete to coach:', error);
      return null;
    }

    return data;
  },

  // Remove athlete-coach relationship
  async disconnectAthleteFromCoach(athleteId: string, coachId: string) {
    const { error } = await supabase
      .from('coach_athlete_relationships')
      .update({ status: 'inactive' })
      .eq('athlete_id', athleteId)
      .eq('coach_id', coachId);

    if (error) {
      console.error('Error disconnecting athlete from coach:', error);
      return false;
    }

    return true;
  }
};

// =============================================
// RECOVERY SYSTEM
// =============================================

export const recoveryService = {
  // Mental Health Logs
  async saveMentalHealthLog(data: {
    athlete_id: string;
    log_date: string;
    mood_score: number;
    stress_level: number;
    motivation_level: number;
    anxiety_level: number;
    confidence_level: number;
    mood_triggers?: string[];
    notes?: string;
  }) {
    const { data: result, error } = await supabase
      .from('mental_health_logs')
      .upsert(data)
      .select()
      .single();

    if (error) {
      console.error('Error saving mental health log:', error);
      return null;
    }

    return result;
  },

  // Sleep Logs
  async saveSleepLog(data: {
    athlete_id: string;
    log_date: string;
    bedtime?: string;
    wake_time?: string;
    sleep_duration_hours?: number;
    sleep_quality?: number;
    time_to_fall_asleep?: number;
    night_wakeups?: number;
    restfulness?: number;
    sleep_factors?: string[];
    notes?: string;
  }) {
    const { data: result, error } = await supabase
      .from('sleep_logs')
      .upsert(data)
      .select()
      .single();

    if (error) {
      console.error('Error saving sleep log:', error);
      return null;
    }

    return result;
  },

  // Energy Logs
  async saveEnergyLog(data: {
    athlete_id: string;
    log_date: string;
    morning_energy?: number;
    afternoon_energy?: number;
    evening_energy?: number;
    overall_fatigue?: number;
    mental_fatigue?: number;
    physical_fatigue?: number;
    motivation_level?: number;
    energy_factors?: string[];
    notes?: string;
  }) {
    const { data: result, error } = await supabase
      .from('energy_logs')
      .upsert(data)
      .select()
      .single();

    if (error) {
      console.error('Error saving energy log:', error);
      return null;
    }

    return result;
  },

  // Injury Reports
  async saveInjuryReport(data: {
    athlete_id: string;
    coach_id?: string;
    injury_type: string;
    severity: number;
    body_part: string;
    location_description?: string;
    cause?: string;
    description?: string;
    treatment?: string;
    pain_level?: number;
    mobility_impact?: number;
    status?: string;
    follow_up_date?: string;
    notes?: string;
  }) {
    const { data: result, error } = await supabase
      .from('injury_reports')
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error('Error saving injury report:', error);
      return null;
    }

    return result;
  },

  // Get injury reports for athlete
  async getInjuryReports(athleteId: string) {
    const { data, error } = await supabase
      .from('injury_reports')
      .select('*')
      .eq('athlete_id', athleteId)
      .order('reported_at', { ascending: false });

    if (error) {
      console.error('Error fetching injury reports:', error);
      return [];
    }

    return data;
  },

  // Supplement Logs
  async saveSupplementLog(data: {
    athlete_id: string;
    supplement_name: string;
    dosage: string;
    unit: string;
    timing?: string;
    frequency?: string;
    purpose?: string;
    status?: string;
    effectiveness_rating?: number;
    side_effects?: string;
    start_date?: string;
    end_date?: string;
    notes?: string;
  }) {
    const { data: result, error } = await supabase
      .from('supplement_logs')
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error('Error saving supplement log:', error);
      return null;
    }

    return result;
  },

  // Nutrition Logs
  async saveNutritionLog(data: {
    athlete_id: string;
    log_date: string;
    total_calories?: number;
    protein_grams?: number;
    carbs_grams?: number;
    fat_grams?: number;
    hydration_liters?: number;
    meal_data?: any;
    notes?: string;
  }) {
    const { data: result, error } = await supabase
      .from('nutrition_logs')
      .upsert(data)
      .select()
      .single();

    if (error) {
      console.error('Error saving nutrition log:', error);
      return null;
    }

    return result;
  }
};

// =============================================
// TRAINING SYSTEM
// =============================================

export const trainingService = {
  // Create training plan
  async createTrainingPlan(data: {
    coach_id: string;
    name: string;
    description?: string;
    duration_weeks?: number;
    difficulty_level?: string;
    goals?: string[];
  }) {
    const { data: result, error } = await supabase
      .from('training_plans')
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error('Error creating training plan:', error);
      return null;
    }

    return result;
  },

  // Get training plans for coach
  async getTrainingPlans(coachId: string) {
    const { data, error } = await supabase
      .from('training_plans')
      .select('*')
      .eq('coach_id', coachId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching training plans:', error);
      return [];
    }

    return data;
  },

  // Assign workout to athlete
  async assignWorkout(data: {
    coach_id: string;
    athlete_id: string;
    workout_session_id: string;
    assigned_date: string;
    due_date?: string;
    priority?: string;
    notes?: string;
  }) {
    const { data: result, error } = await supabase
      .from('workout_assignments')
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error('Error assigning workout:', error);
      return null;
    }

    return result;
  },

  // Get assigned workouts for athlete
  async getAssignedWorkouts(athleteId: string) {
    const { data, error } = await supabase
      .from('workout_assignments')
      .select(`
        *,
        workout_session:workout_sessions(*),
        coach:profiles!workout_assignments_coach_id_fkey(username, full_name)
      `)
      .eq('athlete_id', athleteId)
      .order('assigned_date', { ascending: false });

    if (error) {
      console.error('Error fetching assigned workouts:', error);
      return [];
    }

    return data;
  },

  // Complete workout
  async completeWorkout(data: {
    assignment_id: string;
    athlete_id: string;
    duration_minutes?: number;
    difficulty_rating?: number;
    effort_rating?: number;
    notes?: string;
    exercise_results?: any;
  }) {
    const { data: result, error } = await supabase
      .from('workout_completions')
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error('Error completing workout:', error);
      return null;
    }

    // Update assignment status
    await supabase
      .from('workout_assignments')
      .update({ status: 'completed' })
      .eq('id', data.assignment_id);

    return result;
  }
};

// =============================================
// VIDEO SYSTEM
// =============================================

export const videoService = {
  // Upload video metadata
  async uploadVideoMetadata(data: {
    athlete_id: string;
    coach_id?: string;
    title: string;
    description?: string;
    event_type?: string;
    video_url: string;
    thumbnail_url?: string;
    file_size?: number;
    duration_seconds?: number;
  }) {
    const { data: result, error } = await supabase
      .from('video_uploads')
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error('Error uploading video metadata:', error);
      return null;
    }

    return result;
  },

  // Get videos for athlete
  async getVideosForAthlete(athleteId: string) {
    const { data, error } = await supabase
      .from('video_uploads')
      .select('*')
      .eq('athlete_id', athleteId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching videos:', error);
      return [];
    }

    return data;
  },

  // Upload file to Supabase Storage
  async uploadVideoFile(file: File, athleteId: string): Promise<string | null> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${athleteId}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('videos')
      .upload(fileName, file);

    if (error) {
      console.error('Error uploading video file:', error);
      return null;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('videos')
      .getPublicUrl(data.path);

    return publicUrl;
  }
};

// =============================================
// PERFORMANCE & ANALYTICS
// =============================================

export const performanceService = {
  // Save personal record
  async savePersonalRecord(data: {
    athlete_id: string;
    event_name: string;
    performance_value: number;
    unit: string;
    competition_date?: string;
    location?: string;
    conditions?: string;
    is_personal_best?: boolean;
    is_season_best?: boolean;
    notes?: string;
  }) {
    const { data: result, error } = await supabase
      .from('personal_records')
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error('Error saving personal record:', error);
      return null;
    }

    return result;
  },

  // Get personal records for athlete
  async getPersonalRecords(athleteId: string) {
    const { data, error } = await supabase
      .from('personal_records')
      .select('*')
      .eq('athlete_id', athleteId)
      .order('competition_date', { ascending: false });

    if (error) {
      console.error('Error fetching personal records:', error);
      return [];
    }

    return data;
  },

  // Create achievement
  async createAchievement(data: {
    athlete_id: string;
    title: string;
    description?: string;
    category: string;
    rarity?: string;
    icon_emoji?: string;
    criteria_met?: any;
  }) {
    const { data: result, error } = await supabase
      .from('achievements')
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error('Error creating achievement:', error);
      return null;
    }

    return result;
  },

  // Get achievements for athlete
  async getAchievements(athleteId: string) {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('athlete_id', athleteId)
      .order('earned_at', { ascending: false });

    if (error) {
      console.error('Error fetching achievements:', error);
      return [];
    }

    return data;
  }
};

// =============================================
// NOTIFICATIONS
// =============================================

export const notificationService = {
  // Get notifications for user
  async getNotifications(userId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('recipient_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }

    return data;
  },

  // Mark notification as read
  async markAsRead(notificationId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    if (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }

    return true;
  },

  // Subscribe to real-time notifications
  subscribeToNotifications(userId: string, callback: (notification: any) => void) {
    return supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `recipient_id=eq.${userId}`
        },
        callback
      )
      .subscribe();
  }
};

// =============================================
// REAL-TIME SUBSCRIPTIONS
// =============================================

export const realtimeService = {
  // Subscribe to injury reports for coaches
  subscribeToInjuryReports(coachId: string, callback: (injury: any) => void) {
    return supabase
      .channel('injury_reports')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'injury_reports'
        },
        (payload) => {
          // Check if this injury is from one of the coach's athletes
          relationshipService.getAthletesByCoach(coachId).then(athletes => {
            const athleteIds = athletes.map(a => a.id);
            if (athleteIds.includes(payload.new.athlete_id)) {
              callback(payload.new);
            }
          });
        }
      )
      .subscribe();
  },

  // Subscribe to workout completions for coaches
  subscribeToWorkoutCompletions(coachId: string, callback: (completion: any) => void) {
    return supabase
      .channel('workout_completions')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'workout_completions'
        },
        async (payload) => {
          // Check if this completion is from one of the coach's athletes
          const { data: assignment } = await supabase
            .from('workout_assignments')
            .select('coach_id')
            .eq('id', payload.new.assignment_id)
            .single();

          if (assignment?.coach_id === coachId) {
            callback(payload.new);
          }
        }
      )
      .subscribe();
  }
};

// All services are already exported above
