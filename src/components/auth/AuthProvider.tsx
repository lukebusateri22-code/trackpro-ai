import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService, type AuthUser } from '@/services/auth';
import type { Database } from '@/types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthContextType {
  user: AuthUser | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (data: {
    email: string;
    password: string;
    username: string;
    fullName: string;
    role: 'athlete' | 'coach';
    coachCode?: string;
    primaryEvents?: string[];
    experienceLevel?: 'beginner' | 'intermediate' | 'advanced' | 'elite';
  }) => Promise<{ error: string | null }>;
  signOut: () => Promise<{ error: string | null }>;
  updateProfile: (updates: Partial<Profile>) => Promise<boolean>;
  connectToCoach: (coachCode: string) => Promise<{ success: boolean; error: string | null }>;
  disconnectFromCoach: (coachId: string) => Promise<{ success: boolean; error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial user
    authService.getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = authService.onAuthStateChange((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { user: authUser, error } = await authService.signIn({ email, password });
    if (authUser) {
      setUser(authUser);
    }
    setLoading(false);
    return { error };
  };

  const signUp = async (data: {
    email: string;
    password: string;
    username: string;
    fullName: string;
    role: 'athlete' | 'coach';
    coachCode?: string;
    primaryEvents?: string[];
    experienceLevel?: 'beginner' | 'intermediate' | 'advanced' | 'elite';
  }) => {
    setLoading(true);
    const { user: authUser, error } = await authService.signUp(data);
    if (authUser) {
      setUser(authUser);
    }
    setLoading(false);
    return { error };
  };

  const signOut = async () => {
    setLoading(true);
    const { error } = await authService.signOut();
    setUser(null);
    setLoading(false);
    return { error };
  };

  const updateProfile = async (updates: Partial<Profile>): Promise<boolean> => {
    if (!user) return false;
    
    // Import profileService here to avoid circular dependency
    const { profileService } = await import('@/services/database');
    const updatedProfile = await profileService.upsertProfile({
      id: user.id,
      ...updates
    });
    
    if (updatedProfile) {
      setUser({ ...user, profile: updatedProfile });
      return true;
    }
    return false;
  };

  const connectToCoach = async (coachCode: string) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    return authService.connectToCoach(user.id, coachCode);
  };

  const disconnectFromCoach = async (coachId: string) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    return authService.disconnectFromCoach(user.id, coachId);
  };

  const value = {
    user,
    profile: user?.profile || null,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    connectToCoach,
    disconnectFromCoach,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
