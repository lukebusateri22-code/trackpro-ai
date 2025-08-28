import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { profileService } from '@/services/api';
import type { Profile } from '@/types/database';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData?: Partial<Profile>) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user profile
  const loadProfile = async (userId: string) => {
    try {
      const { data, error } = await profileService.getProfile(userId);
      if (error) {
        console.warn('Profile load error:', error);
        return null;
      }
      return data;
    } catch (err) {
      console.warn('Profile load failed:', err);
      return null;
    }
  };

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.warn('Session initialization error:', error);
        }

        if (mounted && initialSession?.user) {
          setSession(initialSession);
          setUser(initialSession.user);
          
          // Load profile
          const userProfile = await loadProfile(initialSession.user.id);
          if (mounted) {
            setProfile(userProfile);
          }
        }
      } catch (err) {
        console.warn('Auth initialization failed:', err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);

          if (session?.user) {
            // Load profile for authenticated user
            const userProfile = await loadProfile(session.user.id);
            if (mounted) {
              setProfile(userProfile);
            }
          } else {
            // Clear profile for unauthenticated user
            setProfile(null);
          }

          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Sign up function
  const signUp = async (email: string, password: string, userData?: Partial<Profile>) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData || {}
        }
      });

      if (error) {
        console.error('Sign up error:', error);
        return { error };
      }

      // If user is immediately confirmed, create profile
      if (data.user && !data.user.email_confirmed_at) {
        console.log('Please check your email to confirm your account');
      }

      return { error: null };
    } catch (err) {
      console.error('Sign up failed:', err);
      return { error: err as AuthError };
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Sign in error:', error);
        return { error };
      }

      return { error: null };
    } catch (err) {
      console.error('Sign in failed:', err);
      return { error: err as AuthError };
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        return { error };
      }

      // Clear local state
      setUser(null);
      setProfile(null);
      setSession(null);

      return { error: null };
    } catch (err) {
      console.error('Sign out failed:', err);
      return { error: err as AuthError };
    }
  };

  // Update profile function
  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) {
      return { error: new Error('No authenticated user') };
    }

    try {
      const { data, error } = await profileService.updateProfile(user.id, updates);
      
      if (error) {
        console.error('Profile update error:', error);
        return { error };
      }

      // Update local state
      setProfile(data);
      return { error: null };
    } catch (err) {
      console.error('Profile update failed:', err);
      return { error: err };
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
