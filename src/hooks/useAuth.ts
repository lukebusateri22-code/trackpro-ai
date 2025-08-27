// Authentication Hook with React Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { authService, profileService } from '@/services/api';
import type { Profile } from '@/types/database';

export interface AuthUser {
  id: string;
  email: string;
  profile?: Profile;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  // Get current user profile
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => user ? profileService.getProfile(user.id) : null,
    enabled: !!user?.id,
    select: (data) => data?.data
  });

  // Sign up mutation
  const signUpMutation = useMutation({
    mutationFn: ({ email, password, userData }: { 
      email: string; 
      password: string; 
      userData: Partial<Profile> 
    }) => authService.signUp(email, password, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    }
  });

  // Sign in mutation
  const signInMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => 
      authService.signIn(email, password),
    onSuccess: (data) => {
      if (data.data.user) {
        setUser({
          id: data.data.user.id,
          email: data.data.user.email!
        });
      }
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    }
  });

  // Sign out mutation
  const signOutMutation = useMutation({
    mutationFn: authService.signOut,
    onSuccess: () => {
      setUser(null);
      queryClient.clear();
    }
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: ({ userId, updates }: { userId: string; updates: Partial<Profile> }) =>
      profileService.updateProfile(userId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    }
  });

  // Listen to auth state changes
  useEffect(() => {
    const { data: { subscription } } = authService.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Get initial user
    authService.getCurrentUser().then(({ user }) => {
      if (user) {
        setUser({
          id: user.id,
          email: user.email!
        });
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    user: user ? { ...user, profile } : null,
    loading: loading || profileLoading,
    signUp: signUpMutation.mutate,
    signIn: signInMutation.mutate,
    signOut: signOutMutation.mutate,
    updateProfile: updateProfileMutation.mutate,
    isSigningUp: signUpMutation.isPending,
    isSigningIn: signInMutation.isPending,
    isSigningOut: signOutMutation.isPending,
    isUpdatingProfile: updateProfileMutation.isPending,
    signUpError: signUpMutation.error,
    signInError: signInMutation.error,
    signOutError: signOutMutation.error,
    updateProfileError: updateProfileMutation.error
  };
};
