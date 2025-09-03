// Authentication Service for TrackPro AI
// Real Supabase Auth integration

import { supabase } from '@/lib/supabase';
import { profileService, relationshipService } from './database';
import type { Database } from '@/types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];

export interface AuthUser {
  id: string;
  email: string;
  profile: Profile | null;
}

export interface SignUpData {
  email: string;
  password: string;
  username: string;
  fullName: string;
  role: 'athlete' | 'coach';
  coachCode?: string;
  primaryEvents?: string[];
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced' | 'elite';
}

export interface SignInData {
  email: string;
  password: string;
}

class AuthService {
  // Sign up new user
  async signUp(data: SignUpData): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError || !authData.user) {
        return { user: null, error: authError?.message || 'Failed to create account' };
      }

      // 2. Generate coach code if user is a coach
      let coachCode = null;
      if (data.role === 'coach') {
        coachCode = this.generateCoachCode(data.username);
      }

      // 3. Create profile
      const profileData = {
        id: authData.user.id,
        username: data.username,
        full_name: data.fullName,
        role: data.role,
        experience_level: data.experienceLevel || 'beginner',
        primary_events: data.primaryEvents || null,
        coach_code: coachCode,
      };

      const profile = await profileService.upsertProfile(profileData);

      if (!profile) {
        return { user: null, error: 'Failed to create profile' };
      }

      // 4. If athlete with coach code, connect to coach
      if (data.role === 'athlete' && data.coachCode) {
        const coach = await profileService.getProfileByCoachCode(data.coachCode);
        if (coach) {
          await relationshipService.connectAthleteToCoach(authData.user.id, coach.id);
        }
      }

      return {
        user: {
          id: authData.user.id,
          email: authData.user.email!,
          profile
        },
        error: null
      };
    } catch (error) {
      console.error('Sign up error:', error);
      return { user: null, error: 'An unexpected error occurred' };
    }
  }

  // Sign in existing user
  async signIn(data: SignInData): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (authError || !authData.user) {
        return { user: null, error: authError?.message || 'Failed to sign in' };
      }

      // Get user profile
      const profile = await profileService.getCurrentProfile();

      return {
        user: {
          id: authData.user.id,
          email: authData.user.email!,
          profile
        },
        error: null
      };
    } catch (error) {
      console.error('Sign in error:', error);
      return { user: null, error: 'An unexpected error occurred' };
    }
  }

  // Sign out
  async signOut(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      return { error: error?.message || null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error: 'An unexpected error occurred' };
    }
  }

  // Get current user
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const profile = await profileService.getCurrentProfile();

      return {
        id: user.id,
        email: user.email!,
        profile
      };
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const profile = await profileService.getCurrentProfile();
        callback({
          id: session.user.id,
          email: session.user.email!,
          profile
        });
      } else {
        callback(null);
      }
    });
  }

  // Reset password
  async resetPassword(email: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      return { error: error?.message || null };
    } catch (error) {
      console.error('Reset password error:', error);
      return { error: 'An unexpected error occurred' };
    }
  }

  // Update password
  async updatePassword(newPassword: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      return { error: error?.message || null };
    } catch (error) {
      console.error('Update password error:', error);
      return { error: 'An unexpected error occurred' };
    }
  }

  // Generate coach code
  private generateCoachCode(username: string): string {
    const prefix = username.substring(0, 5).toUpperCase();
    const suffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${suffix}`;
  }

  // Validate coach code format
  validateCoachCode(code: string): boolean {
    return /^[A-Z]{3,5}\d{3}$/.test(code);
  }

  // Check if coach code exists
  async checkCoachCodeExists(code: string): Promise<boolean> {
    const coach = await profileService.getProfileByCoachCode(code);
    return coach !== null;
  }

  // Connect athlete to coach by code
  async connectToCoach(athleteId: string, coachCode: string): Promise<{ success: boolean; error: string | null }> {
    try {
      const coach = await profileService.getProfileByCoachCode(coachCode);
      if (!coach) {
        return { success: false, error: 'Coach code not found' };
      }

      const relationship = await relationshipService.connectAthleteToCoach(athleteId, coach.id);
      if (!relationship) {
        return { success: false, error: 'Failed to connect to coach' };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('Connect to coach error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  // Disconnect from coach
  async disconnectFromCoach(athleteId: string, coachId: string): Promise<{ success: boolean; error: string | null }> {
    try {
      const success = await relationshipService.disconnectAthleteFromCoach(athleteId, coachId);
      return { success, error: success ? null : 'Failed to disconnect from coach' };
    } catch (error) {
      console.error('Disconnect from coach error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  // Delete account
  async deleteAccount(): Promise<{ success: boolean; error: string | null }> {
    try {
      // Note: This requires admin privileges in Supabase
      // For now, we'll just sign out and mark the profile as inactive
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { success: false, error: 'No user found' };
      }

      // Update profile to mark as deleted
      await profileService.upsertProfile({
        id: user.id,
        username: `deleted_${user.id}`,
        full_name: 'Deleted User',
        role: 'athlete' // Default role
      });

      // Sign out
      await this.signOut();

      return { success: true, error: null };
    } catch (error) {
      console.error('Delete account error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
