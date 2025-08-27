import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types/coach-athlete';

export interface UserProfile {
  id: string;
  username: string;
  age: number;
  primaryEvents: string[];
  experienceLevels: { [event: string]: 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro' };
  personalRecords: { [event: string]: { value: number; date: string; location?: string } };
  joinDate: string;
  avatar?: string;
  role: UserRole;
}

interface UserContextType {
  user: UserProfile | null;
  updateUser: (updates: Partial<UserProfile>) => void;
  updateExperienceLevel: (event: string, level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro') => void;
  updatePersonalRecord: (event: string, value: number, date: string, location?: string) => void;
  isProfileComplete: boolean;
  isAuthenticated: boolean;
  isCoach: boolean;
  isAthlete: boolean;
  switchRole: (role: UserRole) => void;
}

const defaultUser: UserProfile = {
  id: 'demo-user',
  username: 'Demo Athlete',
  age: 22,
  primaryEvents: ['100m', 'Long Jump'],
  experienceLevels: {
    '100m': 'Intermediate',
    '200m': 'Beginner',
    'Long Jump': 'Advanced',
    'High Jump': 'Beginner'
  },
  personalRecords: {
    '100m': { value: 11.2, date: '2024-08-15', location: 'City Stadium' },
    'Long Jump': { value: 6.85, date: '2024-07-20', location: 'Regional Meet' }
  },
  joinDate: '2024-01-15',
  role: 'athlete'
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Load user from localStorage or set default
    const savedUser = localStorage.getItem('trackpro-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(defaultUser);
    }
  }, []);

  useEffect(() => {
    // Save user to localStorage whenever it changes
    if (user) {
      localStorage.setItem('trackpro-user', JSON.stringify(user));
    }
  }, [user]);

  const updateUser = (updates: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const updateExperienceLevel = (event: string, level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro') => {
    if (user) {
      setUser({
        ...user,
        experienceLevels: {
          ...user.experienceLevels,
          [event]: level
        }
      });
    }
  };

  const updatePersonalRecord = (event: string, value: number, date: string, location?: string) => {
    if (user) {
      setUser({
        ...user,
        personalRecords: {
          ...user.personalRecords,
          [event]: { value, date, location }
        }
      });
    }
  };

  const isProfileComplete = user ? 
    user.username.length > 0 && 
    user.age > 0 && 
    user.primaryEvents.length > 0 : false;

  const isAuthenticated = user !== null;
  const isCoach = user?.role === 'coach';
  const isAthlete = user?.role === 'athlete';

  const switchRole = (role: UserRole) => {
    if (user) {
      setUser({
        ...user,
        role
      });
    }
  };

  return (
    <UserContext.Provider value={{
      user,
      updateUser,
      updateExperienceLevel,
      updatePersonalRecord,
      isProfileComplete,
      isAuthenticated,
      isCoach,
      isAthlete,
      switchRole
    }}>
      {children}
    </UserContext.Provider>
  );
};
