import React from 'react';
import { Home, Dumbbell, Heart, Target, User, BarChart3, MessageSquare } from 'lucide-react';
import { trackTechTheme } from '@/lib/trackTechTheme';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Feed', icon: BarChart3, color: trackTechTheme.colors.accents.blue },
    { id: 'training', label: 'Leaderboard', icon: Target, color: trackTechTheme.colors.accents.green },
    { id: 'recovery', label: 'Messaging', icon: MessageSquare, color: trackTechTheme.colors.accents.orange },
    { id: 'goals', label: 'Messaging', icon: MessageSquare, color: trackTechTheme.colors.accents.orange },
    { id: 'profile', label: 'Profile', icon: User, color: trackTechTheme.colors.accents.pink },
  ];

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 border-t"
      style={{ 
        backgroundColor: trackTechTheme.colors.light.surface,
        borderColor: trackTechTheme.colors.light.border
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
                      color: isActive ? trackTechTheme.colors.light.surface : tab.color
                    }}
                  />
                </div>
                <span 
                  className={`text-xs font-medium transition-all ${
                    isActive ? 'font-semibold' : ''
                  }`}
                  style={{
                    color: isActive ? trackTechTheme.colors.light.text : trackTechTheme.colors.light.textSecondary
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