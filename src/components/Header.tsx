import React from 'react';
import { ArrowLeft, Settings, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/contexts/UserContext';
import RoleSwitcher from './RoleSwitcher';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  showSettings?: boolean;
  onSettings?: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBack, 
  onBack, 
  showSettings, 
  onSettings,
  className 
}) => {
  const { user, isCoach } = useUser();

  return (
    <header 
      className={cn(
        "flex items-center justify-between px-4 py-4 text-white shadow-lg border-b",
        className
      )}
      style={{
        background: athleticTechTheme.gradients.primary,
        borderColor: athleticTechTheme.colors.interactive.border,
        boxShadow: athleticTechTheme.shadows.lg
      }}
    >
      <div className="flex items-center space-x-4">
        {showBack && (
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-white/20 transition-all duration-200 transform hover:scale-105"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          {user && (
            <p className="text-sm opacity-80 capitalize">
              {isCoach ? '🏃‍♂️ Coach Mode' : '🎯 Athlete Mode'} • {user.username}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <RoleSwitcher />
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-white/20 transition-all duration-200 transform hover:scale-105">
            <Bell size={20} />
          </button>
          {showSettings && (
            <button
              onClick={onSettings}
              className="p-2 rounded-full hover:bg-white/20 transition-all duration-200 transform hover:scale-105"
            >
              <Settings size={20} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;