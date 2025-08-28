import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { useAuth } from '@/components/auth/AuthProvider';
import { UserRole } from '@/types/coach-athlete';
import athleticTechTheme from '@/lib/athleticTechTheme';
import { Users, Target } from 'lucide-react';

const RoleSwitcher: React.FC = () => {
  const { user, switchRole, isCoach, isAthlete } = useUser();
  const { profile } = useAuth();

  if (!user) return null;
  
  // Hide role switcher for athletes - they can't switch to coach view
  if (profile?.role === 'athlete') return null;

  // Only show role switcher for coaches
  if (profile?.role !== 'coach') return null;
  
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => switchRole('coach')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
          isCoach 
            ? 'shadow-lg transform scale-105' 
            : 'hover:scale-105 opacity-60'
        }`}
        style={{
          backgroundColor: isCoach 
            ? athleticTechTheme.colors.roles.coach 
            : `${athleticTechTheme.colors.roles.coach}20`,
          color: isCoach 
            ? athleticTechTheme.colors.text.primary 
            : athleticTechTheme.colors.roles.coach
        }}
      >
        <Users size={16} />
        <span className="text-sm font-medium">Coach</span>
      </button>

      <button
        onClick={() => switchRole('athlete')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
          isAthlete 
            ? 'shadow-lg transform scale-105' 
            : 'hover:scale-105 opacity-60'
        }`}
        style={{
          backgroundColor: isAthlete 
            ? athleticTechTheme.colors.roles.athlete 
            : `${athleticTechTheme.colors.roles.athlete}20`,
          color: isAthlete 
            ? athleticTechTheme.colors.text.primary 
            : athleticTechTheme.colors.roles.athlete
        }}
      >
        <Target size={16} />
        <span className="text-sm font-medium">Athlete</span>
      </button>
    </div>
  );
};

export default RoleSwitcher;
