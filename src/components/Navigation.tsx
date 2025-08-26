import React from 'react';
import { Home, Target, Activity, User, Heart, Flame, Zap, Trophy } from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home, color: athleticTechTheme.colors.primary.track },
    { id: 'training', label: 'Training', icon: Zap, color: athleticTechTheme.colors.events.sprints },
    { id: 'recovery', label: 'Recovery', icon: Heart, color: athleticTechTheme.colors.performance.recovery },
    { id: 'goals', label: 'Goals', icon: Target, color: athleticTechTheme.colors.events.jumps },
    { id: 'profile', label: 'Profile', icon: User, color: athleticTechTheme.colors.primary.tech },
  ];

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 border-t"
      style={{ 
        backgroundColor: athleticTechTheme.colors.surface.primary,
        borderColor: athleticTechTheme.colors.interactive.border
      }}
    >
      <div className="max-w-md mx-auto">
        {/* Active indicator bar */}
        <div className="h-1 bg-black rounded-full mx-auto mb-2 mt-2" style={{ width: '134px' }} />
        
        <div className="flex pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex-1 flex flex-col items-center py-3 px-2 transition-all duration-200"
              >
                <div 
                  className={`p-3 rounded-full mb-1 transition-all duration-200 ${
                    isActive ? 'shadow-lg transform scale-110' : 'hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: isActive ? tab.color : `${tab.color}20`
                  }}
                >
                  <Icon 
                    size={20} 
                    strokeWidth={2}
                    style={{ 
                      color: isActive ? athleticTechTheme.colors.surface.primary : tab.color
                    }}
                  />
                </div>
                <span 
                  className={`text-xs mt-1 font-medium transition-colors duration-200 ${
                    isActive ? 'opacity-100' : 'opacity-60'
                  }`}
                  style={{ 
                    color: isActive ? athleticTechTheme.colors.text.primary : athleticTechTheme.colors.text.secondary
                  }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navigation;