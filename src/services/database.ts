// Temporary Database Service - Works without Supabase setup
// This allows the app to run while you set up the real database

import { supabase } from '@/lib/supabase';

// Mock data for development
const mockProfile = {
  id: 'mock-user-id',
  username: 'demo-user',
  full_name: 'Demo User',
  role: 'athlete' as const,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

// Profile Service
export const profileService = {
  async getCurrentProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      // Try to get real profile, fallback to mock
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.log('Using mock profile - database not set up yet');
        return { ...mockProfile, id: user.id };
      }

      return data;
    } catch (err) {
      console.log('Using mock profile - Supabase not configured');
      return mockProfile;
    }
  },

  async upsertProfile(profile: any) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert(profile)
        .select()
        .single();

      if (error) {
        console.log('Mock upsert - database not set up yet');
        return { ...mockProfile, ...profile };
      }

      return data;
    } catch (err) {
      console.log('Mock upsert - Supabase not configured');
      return { ...mockProfile, ...profile };
    }
  },

  async getProfileByCoachCode(coachCode: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('coach_code', coachCode)
        .eq('role', 'coach')
        .single();

      if (error) {
        console.log('Mock coach lookup - database not set up yet');
        return null;
      }

      return data;
    } catch (err) {
      console.log('Mock coach lookup - Supabase not configured');
      return null;
    }
  }
};

// Relationship Service
export const relationshipService = {
  async connectAthleteToCoach(athleteId: string, coachId: string) {
    try {
      const { data, error } = await supabase
        .from('coach_athlete_relationships')
        .insert({
          coach_id: coachId,
          athlete_id: athleteId,
          status: 'active'
        });

      if (error) {
        console.log('Mock connection - database not set up yet');
        return null;
      }

      return data;
    } catch (err) {
      console.log('Mock connection - Supabase not configured');
      return null;
    }
  },

  async disconnectAthleteFromCoach(athleteId: string, coachId: string) {
    try {
      const { error } = await supabase
        .from('coach_athlete_relationships')
        .update({ status: 'inactive' })
        .eq('athlete_id', athleteId)
        .eq('coach_id', coachId);

      if (error) {
        console.log('Mock disconnection - database not set up yet');
        return false;
      }

      return true;
    } catch (err) {
      console.log('Mock disconnection - Supabase not configured');
      return false;
    }
  }
};

// Recovery Service (simplified)
export const recoveryService = {
  async saveMentalHealthLog(log: any) {
    try {
      const { data, error } = await supabase
        .from('mental_health_logs')
        .insert(log);

      if (error) {
        console.log('Mock mental health save - database not set up yet');
        return { id: 'mock-id', ...log };
      }

      return data;
    } catch (err) {
      console.log('Mock mental health save - Supabase not configured');
      return { id: 'mock-id', ...log };
    }
  },

  async saveSleepLog(log: any) {
    try {
      const { data, error } = await supabase
        .from('sleep_logs')
        .insert(log);

      if (error) {
        console.log('Mock sleep save - database not set up yet');
        return { id: 'mock-id', ...log };
      }

      return data;
    } catch (err) {
      console.log('Mock sleep save - Supabase not configured');
      return { id: 'mock-id', ...log };
    }
  },

  async saveInjuryReport(report: any) {
    try {
      const { data, error } = await supabase
        .from('injury_reports')
        .insert(report);

      if (error) {
        console.log('Mock injury save - database not set up yet');
        return { id: 'mock-id', ...report };
      }

      return data;
    } catch (err) {
      console.log('Mock injury save - Supabase not configured');
      return { id: 'mock-id', ...report };
    }
  }
};

// Training Service (simplified)
export const trainingService = {
  async createTrainingPlan(plan: any) {
    try {
      const { data, error } = await supabase
        .from('training_plans')
        .insert(plan);

      if (error) {
        console.log('Mock training plan - database not set up yet');
        return { id: 'mock-id', ...plan };
      }

      return data;
    } catch (err) {
      console.log('Mock training plan - Supabase not configured');
      return { id: 'mock-id', ...plan };
    }
  }
};

// Video Service (simplified)
export const videoService = {
  async uploadVideo(file: File, metadata: any) {
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('videos')
        .upload(fileName, file);

      if (error) {
        console.log('Mock video upload - storage not set up yet');
        return { 
          id: 'mock-id', 
          video_url: URL.createObjectURL(file),
          ...metadata 
        };
      }

      return data;
    } catch (err) {
      console.log('Mock video upload - Supabase not configured');
      return { 
        id: 'mock-id', 
        video_url: URL.createObjectURL(file),
        ...metadata 
      };
    }
  }
};

// Performance Service (simplified)
export const performanceService = {
  async savePersonalRecord(record: any) {
    try {
      const { data, error } = await supabase
        .from('personal_records')
        .insert(record);

      if (error) {
        console.log('Mock PR save - database not set up yet');
        return { id: 'mock-id', ...record };
      }

      return data;
    } catch (err) {
      console.log('Mock PR save - Supabase not configured');
      return { id: 'mock-id', ...record };
    }
  }
};

// Notification Service (simplified)
export const notificationService = {
  async markAsRead(notificationId: string) {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) {
        console.log('Mock notification - database not set up yet');
        return true;
      }

      return true;
    } catch (err) {
      console.log('Mock notification - Supabase not configured');
      return true;
    }
  }
};

// Real-time Service (simplified)
export const realtimeService = {
  subscribeToNotifications(userId: string, callback: (notification: any) => void) {
    console.log('Mock real-time subscription - set up Supabase for real-time features');
    return { unsubscribe: () => {} };
  }
};
